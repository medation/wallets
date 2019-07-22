import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { PaymentService } from '../../services/payment.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})

export class PaymentPage {
  
  public service: any;
  public transaction: any;
  public loaded: boolean = false;
  encodeText: string = '';
  scannedData: any = {};
  encodedData: any = {};
  options: BarcodeScannerOptions;
  data={ };

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private qrScanner: QRScanner, 
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private barcodeScanner: BarcodeScanner,
              private paymentService: PaymentService,
              private inAppBrowser: InAppBrowser) {
    this.service = navParams.get('service');
  }

  scan(){
    console.log("Scan !")
    this.options = {
      prompt: "Veuillez-scanner le code :)"
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      // Success! Barcode data is here
      console.log(barcodeData);
      this.data = barcodeData;
      this.transaction = JSON.parse(barcodeData.text);
      this.loaded = true;
     }, (err) => {
         // An error occurred
         console.log(err);
     });
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Confimation',
      message: 'Confirmez-vous le paiement de '
                    +this.transaction.amount+' '+this.transaction.currency
                    +' pour '+this.transaction.institution,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            console.log('Agree clicked');
            this.paymentService.makePayment(this.transaction).pipe()
                      .subscribe(
                        () => { 
                          this.showAlert();
                        },
                        err => this.handleError(err));
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert() {
    let toast = this.toastCtrl.create({
      message: '',
      cssClass: 'doneToast',
      duration: 3000
    });
    toast.present();
    this.navCtrl.pop();
  }

  test(){
    let text = ' { "reference" : "4F8E7R1D6695D", "institution" : "Carrefour", "amount" : 9.99 , "currency" : "MAD", "detail" : "Chocolat Milka"  } ';
    this.transaction = JSON.parse(text);
    this.loaded = true;
  }

  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Authentification requise';
      this.navCtrl.push(LoginPage);
    }
    else {
      message = `Erreur : ${error.statusText}`;
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }
}
