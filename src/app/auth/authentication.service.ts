import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel} from './login-model';
import {JwtResponseModel} from './jwt-response-model';
import {SignupModel} from './signup-model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private loginUrl = 'http://localhost:8080/auth/signin';
  private signupUrl = 'http://localhost:8080/auth/signup';

  constructor(private http: HttpClient) { }

  attemptAuth(loginInfo: LoginModel): Observable<JwtResponseModel> {
    console.log(loginInfo.username, loginInfo.password);
    return this.http.post<JwtResponseModel>(this.loginUrl, loginInfo, httpOptions);
  }

  signUp(signupInfo: SignupModel): Observable<string> {
    return this.http.post<string>(this.signupUrl, signupInfo, httpOptions);
  }
}
