import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {WalletsPage} from '../pages/wallets/wallets';
import {CardsPage} from '../pages/cards/cards';
import {DashPage} from '../pages/dash/dash';
import {PaymentPage} from '../pages/payment/payment';
import {TransferPage} from '../pages/transfer/transfer';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {CustomFormsModule} from 'ng2-validation';
import {Storage, IonicStorageModule} from "@ionic/storage";
import {AuthenticationService} from "../services/authentication.service";
import {PaymentService} from "../services/payment.service";
import {TokenizeService} from "../services/tokenize.service";
import {HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import { from } from 'rxjs/observable/from';
import { QRScanner,QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TextMaskModule } from 'angular2-text-mask';
import { TouchID } from '@ionic-native/touch-id';

export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => storage.get('token_cards'),
    whitelistedDomains: ['192.168.43.80:8062']
  }
}

@NgModule({
  declarations: [
    MyApp,
    WalletsPage,
    CardsPage,
    LoginPage,
    SignupPage,
    DashPage,
    PaymentPage,
    TransferPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__store',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    CustomFormsModule,
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WalletsPage,
    CardsPage,
    DashPage,
    LoginPage,
    SignupPage,
    PaymentPage,
    TransferPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    BarcodeScanner,
    InAppBrowser,
    TouchID,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationService,
    PaymentService,
    TokenizeService
  ]
})
export class AppModule {
}
