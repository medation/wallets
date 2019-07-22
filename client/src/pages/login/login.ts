import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import { AuthenticationService } from '../../services/authentication.service';
import {finalize} from 'rxjs/operators/finalize';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private authenticationService: AuthenticationService,
              private toastCtrl: ToastController) {
  }

  login(value: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'En cours ...'
    });

    loading.present();

    this.authenticationService
      .login(value)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        () => {
          this.navCtrl.pop();
        },
        err => this.handleError(err));
  }

  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Connexion refusé';
    }
    else {
      message = `Erreur inattendu : ${error.statusText}`;
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
