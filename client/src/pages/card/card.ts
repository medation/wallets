import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { CardModel } from "../../model/card";
import { CardIO } from '@ionic-native/card-io';

@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})

export class CardPage {

  cards: any;
  card: CardModel = new CardModel();
  types: any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private storage: Storage,
              private cardIO: CardIO){
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

  scanCard(){
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
}