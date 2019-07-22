import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashPage } from '../dash/dash';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import {Storage} from "@ionic/storage";
import { AuthenticationService } from '../../services/authentication.service';
import { LoginPage } from '../login/login';
import { BrowserTab } from '@ionic-native/browser-tab';
import { TokenizeService } from '../../services/tokenize.service';
import {finalize} from 'rxjs/operators/finalize';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})

export class CardsPage {

  public cards: any;
  public show: boolean = false;

  constructor(public navCtrl: NavController, 
              private inAppBrowser: InAppBrowser,
              private readonly storage: Storage,
              private tokenizeService: TokenizeService) {
    this.cards = [
      {
        state: 'ON',
        logo: "assets/img/visa.png",
        a: 1234,
        b: 5522,
        c: 8432,
        d: 2264,
        bank: 'Bank of America'
      },
      {
        state: 'OFF',
        logo: "assets/img/american.png",
        a: 1234,
        b: 5321,
        c: 8283,
        d: 9271,
        bank: 'JPMorgan'
      },
      {
        state: 'ON',
        logo: "assets/img/mastercard.png",
        a: 8685,
        b: 2445,
        c: 9143,
        d: 7846,
        bank: 'CityBank'
      }
    ];
  }

  showCards(){
    this.show = true;
  }

  hideCards(){
    this.show = false;
  }

  
  redirect(card:any) {

    this.tokenizeService.checkLogin();
    let logged : boolean;
    this.tokenizeService.authUser.subscribe(jwt => {
      if (jwt) {
        logged = true;
        console.log("LOGGED OK")
      }
      else {
        logged = false;
        console.log("LOGGED KO")
      }
    });

    if(logged){
      this.navCtrl.push(DashPage, {card : card});
      console.log("LOGGED OK")
    } else {
      logged = false;
        console.log("LOGGED KO");
        const browser = this.inAppBrowser.create("http://192.168.43.80:8000",'_blank', 'location=yes');
        browser.show();
        console.log("executing script");

        browser.on("exit").subscribe((event) => {
              let value : any;
              console.log("Back")
              this.tokenizeService.getToken(value)
                .subscribe(
                  (jwt : string) => {
                    this.tokenizeService.handleJwtResponse(jwt).then(
                      () => {
                        this.tokenizeService.checkLogin();
                        this.navCtrl.push(DashPage, {card : card});
                      }
                    );
                  },
                  (err) => console.log("Erreur"))
          },err=>console.log(err)
        );
    }

    console.log("show browser");
  }
  
}
