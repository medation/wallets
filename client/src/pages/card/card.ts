import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { CardModel } from "../../model/card";
import { CardIO } from '@ionic-native/card-io';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Tag, TagUtil } from '../../model/tag';

@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})

export class CardPage {

  cards: any;
  card: CardModel = new CardModel();
  types: any;
  dataReceived:boolean;
  showAnimation:boolean = false;
  tag:Tag;

  constructor(private navCtrl: NavController, 
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private navParams: NavParams,
              private storage: Storage,
              private cardIO: CardIO,
              private nfc: NFC, 
              private ndef: Ndef,
              private zone: NgZone){
    this.tag = new Tag();
    this.types = ["visa","mastercard","american"];    
    /* For test */
    this.card.bank = 'DEF';
    this.card.a = '0000';
    this.card.b = '1111';
    this.card.c = '2222';
    this.card.d = '3333';
    this.card.state= 'ON';        
  }

  validate(){
    var allCards = [];
    this.storage.get("cards").then(
      (cards) => {
        let data = JSON.parse(cards);
        if(data)
          allCards = data;
        console.log(cards);
        allCards.push(this.card);
        this.storage.set("cards", JSON.stringify(allCards));
        this.navCtrl.pop();
      }
    );
  }

  info = {
    cardType: '',
    cardNumber: '',
    redactedCardNumber: '',
    expiryMonth: null,
    expiryYear: null,
    cvv: '',
    postalCode: ''
  };

  cadreCard(){
    let number: any;
    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if(res){
            let options = {
              requireExpiry: false,
              requireCVV: false,
              requirePostalCode: false,
              requireCardholderName: false,
              suppressManual: true,
              useCardIOLogo: true
            };
            this.cardIO.scan(options).then(
              (data) => {
                const { cardType, cardNumber, redactedCardNumber,
                  expiryMonth, expiryYear, cvv, postalCode } = data;

                  this.info = {
                    cardType,
                    cardNumber,
                    redactedCardNumber,
                    expiryMonth,
                    expiryYear,
                    cvv,
                    postalCode
                  };
              },
              (err) => alert(JSON.stringify(number))
            );
          }
        }
      );
  }

  scanCard(){
    this.nfc.enabled().then(
      () => {
        this.addNfcListeners();
      },
      (err) => console.log(err)
    )
  }

  addNfcListeners():void {
    this.nfc.addTagDiscoveredListener((tagEvent:Event) => this.tagListenerSuccess(tagEvent));
    this.nfc.addNdefListener((tagEvent:Event) => this.tagListenerSuccess(tagEvent));
  }

  tagListenerSuccess(tagEvent:Event) {
      console.log(tagEvent);
      this.zone.run(()=> {
          this.tag = TagUtil.readTagFromJson(tagEvent);
          this.dataReceived = true;
          const alert = this.alertCtrl.create({
              title: 'Tag saved',
                subTitle: 'Tag \'' + this.tag.id + '\' received!',
                buttons: ['Ok']
            }
          );
        alert.present();
          this.vibrate(2000);
      });
  }

  vibrate(time:number):void {
      if(navigator.vibrate) {
          navigator.vibrate(time);
      }
  }

  scanNewTag():void {
      this.dataReceived = false;
      this.showAnimation = false;
  }
}