import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {catchError} from 'rxjs/internal/operators';
import {throwError} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ShowErrorComponent} from '../error/show-error.component';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor( private authService: AuthService, private dialogRef: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authToken;
    authToken = this.authService.getToken();
    console.log(authToken);
    const authRequest = req.clone({
      // The set method add header to the request if the header is not existed, overwrite if the header exist.
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      // withCredentials: true
    });
    return next.handle(authRequest).pipe(catchError(err => {
      if (err.error.logout) {
        this.authService.logout();
        this.dialogRef.closeAll();
        this.dialogRef.open(ShowErrorComponent, {
          width: '400px',
          hasBackdrop: true,
          panelClass: 'my-panel',
          data: {title: 'error', message: 'You have been logout because you login the website somewhere else.'},
          autoFocus: false,
        });
      }
      return  throwError(`Connection Error`);
    }));
  }
}
