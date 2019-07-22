import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { AuthenticationService } from '../../services/authentication.service';
import { TransferPage } from '../transfer/transfer';

@Component({
  selector: 'page-dash',
  templateUrl: 'dash.html',
})

export class DashPage {
  
  public services: any;
  public card: any;

  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              private authenticationService: AuthenticationService) {
    this.card = navParams.get('card');
    this.services = [
      {
        id: '1',
        logo: "assets/icon/payment/transfer-money-128.png",
        label: "Recevoir"
      },
      {
        id: '2',
        logo: "assets/icon/payment/transfer-scan-128.png",
        label: "Envoyer"
      }
    ];
  }

  goTo(service:any){
    if(service.id == 1){
      this.navCtrl.push(TransferPage, { service : service });
    }
    if(service.id == 2){
      this.navCtrl.push(PaymentPage, { service : service });
    }
  }

  logout(){
    this.authenticationService.logout();
  }

  goback(){
    this.navCtrl.pop();
  }

}
