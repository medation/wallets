import {Injectable} from "@angular/core";
import {tap} from 'rxjs/operators/tap';
import {ReplaySubject, Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
  
const SERVER_URL_PAYMENT = "http://192.168.1.39:8062/payment";

@Injectable()
export class PaymentService {

  constructor(private readonly httpClient: HttpClient){
    
  };

  makePayment(values: any): Observable<any> {
    return this.httpClient.post(`${SERVER_URL_PAYMENT}/makePayment`, {responseType: 'text'})
      .pipe(tap(status => console.log(status)));
  }

}