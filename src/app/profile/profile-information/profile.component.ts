import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Observable, timer } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
const BACKEND_URL = environment.backendURL;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
profileSub : Subscription;
   profile: any;
   isLoading : boolean;
  constructor(private http: HttpClient,
    private Cookies: CookieService,
    private authService: AuthService,
  ) {
    this.profileSub = this.authService.getProfileListener().subscribe( (profile:any)=> {
      this.profile = profile
    });
  }
  ngOnInit() {
    this.isLoading = false;
  }

  editProfile(){
  }

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }
}
