import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { CommandService } from '../../services/command.service';
import { TransactionModel } from '../../model/transaction';

@Component({
  selector: 'page-pannier',
  templateUrl: 'pannier.html',
})
export class PannierPage {
  
  public transactions: any;
  public total: any;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private commandService: CommandService) {
    
  }

  ionViewWillEnter() {
    console.log(this.commandService.transactions);
    this.transactions = this.commandService.transactions;
    /*
      for(var transaction in this.transactions){
        this.total += transaction.amount;
      }
    */
  }

}