import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html',
})
export class NfcPage {

  constructor(private navCtrl: NavController, 
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private nfc: NFC, private ndef: Ndef) {

  }

  ionViewWillEnter() {
    this.nfc.enabled().then(
      () => {
        this.nfc.addNdefListener(() => {
          console.log('successfully attached ndef listener');
        }, (err) => {
          console.log('error attaching ndef listener', err);
        }).subscribe((event) => {
          console.log('received ndef message. the tag contains: ', event.tag);
          console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
          alert(event.tag);
          let message = this.ndef.textRecord('Message for other device');
          this.nfc.share([message]).then(
            (res)=> alert(res)
          ).catch(
            (err)=> alert(err));
        });
      },
      (err) => console.log(err)
    )
  }
  
}