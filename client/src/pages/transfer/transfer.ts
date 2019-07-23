import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { PaymentService } from '../../services/payment.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})

export class TransferPage {
  
  code = '';
  generatedQr = false;
  service: any;
  transaction: any = {};
  loaded: boolean = false;
  amount: any;
  currency: string;
  detail: string;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private paymentService: PaymentService,
              private barcodeScanner: BarcodeScanner) {
    this.service = navParams.get('service');
  }

  validate(){
    this.transaction.institution = "MR . AA";
    this.transaction.amount = this.amount;
    this.transaction.currency = this.currency;
    this.transaction.detail = this.detail;
    this.generate();
  }

  generate() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, JSON.stringify(this.transaction))
      .then(
        encodedData => {
          console.log(encodedData);
          this.code = encodedData;
          this.generatedQr = true;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }

}