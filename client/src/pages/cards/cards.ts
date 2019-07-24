import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashPage } from '../dash/dash';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { Storage } from "@ionic/storage";
import { TokenizeService } from '../../services/tokenize.service';
import {finalize} from 'rxjs/operators/finalize';
import { CardPage } from '../card/card';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})

export class CardsPage {

  public cards: any;
  public show: boolean = false;

  constructor(public navCtrl: NavController, 
              private inAppBrowser: InAppBrowser,
              private storage: Storage,
              private tokenizeService: TokenizeService) {
    
  }

  ionViewWillEnter() {
    this.storage.get("cards").then(
      (cards) => {
        let data = JSON.parse(cards);
        if(data)
          this.cards = data;
      }
    );
  }

  showCards(){
    this.show = true;
  }

  hideCards(){
    this.show = false;
  }
  
  redirect(card:any){
    this.navCtrl.push(DashPage, {card : card});
  }

  /*
  redirect(card:any) {

    this.tokenizeService.checkLogin();
    let logged : boolean;
    this.tokenizeService.authUser.subscribe(jwt => {
      if (jwt) {
        logged = true;
        console.log("LOGGED OK")
      } else {
        logged = false;
        console.log("LOGGED KO")
      }
    });

    if(logged) {
      this.navCtrl.push(DashPage, {card : card});
    } else {
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
                      console.log("check token");
                      let checked : boolean;
                      this.tokenizeService.checkLogin();
                      this.tokenizeService.authUser.subscribe(jwt => {
                        if (jwt) {
                          checked = true;
                          console.log("CHECKED OK");
                        }
                      })
                      if(checked){
                        this.navCtrl.push(DashPage, {card : card});
                      }
                    }
                  );
                },
                (err) => console.log("Erreur"))
        },err=>console.log(err)
      );
    }
    console.log("show browser");
  }
  */

  addCard(){
    this.navCtrl.push(CardPage);
  }
}
