import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {AuthService} from './../auth.service';
import { NgForm } from '@angular/forms';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {CommonService} from '../../common/common.service';

const BACKEND_URL = environment.backendURL;

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: []
})

export class VerificatoinComponent implements OnDestroy {

 profile :any;
 private profileSub : Subscription;
 verifyFailed: boolean = false;
constructor(public authService: AuthService,public commonService: CommonService, private router: Router, private http: HttpClient,private snackBar: MatSnackBar) {
     this.profileSub = this.authService.getProfileListener().subscribe( (profile:any)=> {
    this.profile = profile
     });

  }

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }

  async onVerify(form: NgForm,event:Event) {
    // console.log(form.value.code);
    event.preventDefault();
    this.http.get<{ verify: string }>(BACKEND_URL + '/email/verify' + '?verifyCode=' + form.value.code).subscribe(
      (result:any) => {
        if (result.message == 'Wrong code') {
          this.verifyFailed = true
        } else {
          this.router.navigate(['/']);
        }

      })
  }
  sendCodetoEmail() {
    const userId = this.authService.getUserId();
    this.http.post(BACKEND_URL + '/email/sendVerificationCode', userId).subscribe( (result:any) => {
     this.commonService.opensnackbar('Verification code was sent to your email');
      }
    );
  }
}
