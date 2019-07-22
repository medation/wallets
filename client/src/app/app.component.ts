import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CardsPage} from '../pages/cards/cards';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.rootPage = CardsPage; 
  }

}
