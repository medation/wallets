import {Injectable} from "@angular/core";
import {tap} from 'rxjs/operators/tap';
import {ReplaySubject, Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
  
const SERVER_URL = "http://95.179.168.146:80/api";

@Injectable()
export class AuthenticationService {

  private tokenWallet = 'token_wallet';

  authUser = new ReplaySubject<any>(1);

  constructor(private readonly httpClient: HttpClient,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelperService) {
  }

  checkLogin(){
    this.storage.get(this.tokenWallet).then(jwt => {
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.httpClient.get(`${SERVER_URL}/authenticate`)
          .subscribe(() => this.authUser.next(jwt),
            (err) => this.storage.remove(this.tokenWallet).then(() => this.authUser.next(null)));
      }
      else {
        this.storage.remove(this.tokenWallet).then(() => this.authUser.next(null));
      }
    });
  }

  login(values: any): Observable<any> {
    return this.httpClient.post(`${SERVER_URL}/login`, values, {responseType: 'text'})
      .pipe(tap(jwt => this.handleJwtResponse(jwt)));
  }

  logout() {
    this.storage.remove(this.tokenWallet).then(() => this.authUser.next(null));
  }

  signup(values: any): Observable<any> {
    return this.httpClient.post(`${SERVER_URL}/registre`, values, {responseType: 'text'})
      .pipe(tap(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt);
        }
        return jwt;
      }));
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set(this.tokenWallet, jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }

}
