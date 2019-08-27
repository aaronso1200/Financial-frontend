import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {AUTHDATA} from './auth.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import {Location} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import { map} from 'rxjs/operators';
import { environment} from '../../environments/environment';
import {promise} from 'selenium-webdriver';
import {CommonService} from '../common/common.service';


const BACKEND_URL = environment.backendURL;

@Injectable({providedIn: 'root'})

export class AuthService  {
  private token: string;
  // The subscriber get the latest status of the subject while using BehaviorSubject.
  private tokenTimer: any;
  private authTokenListener = new BehaviorSubject<boolean>(false);
  private autoLogoutListener = new BehaviorSubject<boolean> (false);
  private displayNameListener = new BehaviorSubject<string>('');
  private verifyListener = new BehaviorSubject<boolean>(false);
  private profileListener = new BehaviorSubject<{displayName:string,verified:string,email:string,loginName:string ; userId: string}>({displayName:'',verified:'',email:'',loginName:'',userId: ''});

  private autoLogoutTime: number;
  private expiresInDuration: number;
  private userId = new BehaviorSubject<string> ('');
  public profile: {displayName:string,verified:string,email:string,loginName:string, userId: string};


  constructor(private http: HttpClient, private router: Router, private location: Location, private Cookies: CookieService, private commonService: CommonService) {
  }



  getToken() {
    if (this.token) {
      return this.token;
    } else {
      const token = this.Cookies.get('AuthToken');
      if (token) {
        return token;
      }
      return;
    }
  }

  getDisplayNameListener() {
    return this.displayNameListener.asObservable();
  }
  getAuthTokenListener() {
    return this.authTokenListener.asObservable();
  }

  getUserId() {
    return this.userId.asObservable();
  }

  autoLogout() {
    if (this.token) {
    this.tokenTimer = setTimeout(() => {
      this.autoLogoutListener.next(true);
      this.autoLogoutListener.next(false);
      this.saveAuthData(this.token, new Date(Date.now() + this.expiresInDuration));
    } , this.autoLogoutTime - 60000);
  }
}

getProfileListener() {
    return this.profileListener.asObservable();
}

  getAutoLogoutListener() {
    return this.autoLogoutListener.asObservable();
  }

  getVerifyListener() {
    return this.verifyListener.asObservable();
  }

  getIsAuth() {
    return this.authTokenListener;
  }

  getProfileFromServer(){
    this.http.post<{displayName: string; verified: string; email: string; loginName: string; userId: string}>(BACKEND_URL + '/user/profile', '').subscribe(
      result => {
        this.displayNameListener.next(result.displayName);
        this.profile = {displayName: result.displayName,email: result.email, loginName:result.loginName, verified: result.verified, userId : result.userId}
        this.profileListener.next(this.profile);
      }
    );
  }

  createUser(loginName: string, password: string, displayName: string, email: string) {
    const registerData = {loginName: loginName, password: password, displayName: displayName, email: email};
    this.http.post<{message: string, result: string}>(BACKEND_URL + '/user/signup', registerData)
    .subscribe(() => {
      this.router.navigate(['login', {newUser: 'true'}]);
      });
  }

  login(loginName: string, password: string) {
    const authdata: AUTHDATA = {loginName: loginName, password: password};
    this.http.post<{token: string, expiresIn: number, displayName: string, verified: string, email: string, loginName: string}>
    (BACKEND_URL + '/user/login', authdata)
     .subscribe(response => {
      const token = response.token;
      this.token = token;
      // console.log(token);
      if (token) {
        this.expiresInDuration = response.expiresIn * 1000; // expires Duration milisecond to second
        this.autoLogoutTime = this.expiresInDuration;
        this.autoLogout();
        // this.Cookies.set('displayName', response.displayName,0,'/');
        this.Cookies.set('verified', response.verified.toString(),0,'/','',environment.cookiesSecure);
        const expirationDate = new Date(Date.now() + this.expiresInDuration);
        this.saveAuthData(token, expirationDate );
        this.authTokenListener.next(true);
        this.getProfileFromServer();
        // this.displayNameListener.next(response.displayName);
        // console.log('login' + response.verified);
        if (response.verified.toString() === 'true') {
          this.verifyListener.next(true);
        }
        this.location.back();
        }
      },
      err => {
       this.router.navigate(['login', {error: '1'}]);
      });
  }

  lastPage() {
    this.location.back();
  }

  logout() {
    this.http.post(BACKEND_URL + '/user/logout', this.userId).subscribe(
      () => {
        this.token = null;
        this.userId.next('');
        this.authTokenListener.next(false);
        this.verifyListener.next(false);
        clearTimeout(this.tokenTimer);
        this.Cookies.deleteAll('/');
        this.router.navigate(['/']);
      }
    );
  }

  public  AutoLogin() {
    const token = this.Cookies.get('AuthToken');
    if (!token) {
      return;
    }
        this.getProfileFromServer();
        this.token = token;
        const verified = this.Cookies.get('verified');
        this.authTokenListener.next(true);
        if (verified === 'true') {
          this.verifyListener.next(true);
        } else {
          this.verifyListener.next(false);
        }
        // const displayName = this.Cookies.get('displayName');
        // if (!displayName) {
        //   return;
        // }
        // this.displayNameListener.next(displayName);
      }
    ;


  private saveAuthData(token: string, expirationDate: Date) {
      this.Cookies.set('AuthToken', token, expirationDate,'/','',environment.cookiesSecure);
  }

checkUserNameTaken(username: string) {
  // console.log(username);
  return this.http.get<{found: string}> (BACKEND_URL + '/find/user' + '?username=' + username)
  .pipe(map(result => {
    return result.found;
  }
    ));
    }

checkDisplayNameTaken(displayname: string) {
      // console.log(displayname);
      return this.http.get<{found: string}> (BACKEND_URL + '/find/displayName' + '?displayname=' + displayname)
      .pipe(map(result => {
        return result.found;
      }));
    }

verifyCode(code: string) {
  this.http.get<{verify: string}> (BACKEND_URL + '/email/verify' + '?verifyCode=' + code).subscribe(
    (result) => {

      return result}
  );
}


}



