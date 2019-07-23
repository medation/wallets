import {Injectable} from "@angular/core";
import {tap} from 'rxjs/operators/tap';
import {ReplaySubject, Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
  
const SERVER_URL_TOKEN = "http://192.168.43.80:8062/projet";
const SERVER_URL_AUTH = "http://192.168.43.80:8062/authentication";

@Injectable()
export class TokenizeService {

  private tokenCards = 'token_cards';

  authUser = new ReplaySubject<any>(1);

  constructor(private readonly httpClient: HttpClient,
    private readonly storage: Storage,
    private readonly jwtHelper: JwtHelperService) {
  }

  getToken(values: any) : Observable<string>{
    console.log("Call")
    return this.httpClient.get(`${SERVER_URL_TOKEN}/checkDevice`, {responseType: 'text'});
  }

  checkLogin(){
    this.storage.get(this.tokenCards).then(jwt => {
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.httpClient.get(`${SERVER_URL_AUTH}/authenticate`)
          .subscribe(() => {
            this.authUser.next(jwt);
            console.log("Authenticate : "+ jwt)
          },
            (err) => {
              this.storage.remove(this.tokenCards).then(() => this.authUser.next(null));
              console.log("Remove authentication")
            }
          );
      }
      else {
        this.storage.remove(this.tokenCards).then(() => this.authUser.next(null));
        console.log("No token")
      }
    });
  }

  handleJwtResponse(jwt: string) {
    console.log(jwt);
    return this.storage.set(this.tokenCards, jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }
}