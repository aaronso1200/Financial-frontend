import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {SnackBarComponent} from './snack-bar.component';
import {MatSnackBar} from '@angular/material';

const BACKEND_URL = environment.backendURL;

@Injectable({providedIn: 'root'})

export class CommonService  {
  constructor(private http: HttpClient, private router: Router, private location: Location, private Cookies: CookieService, private snackBar: MatSnackBar ) {
  }

  opensnackbar(message){
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {message: message}
    })
  }
}
