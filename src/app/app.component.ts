import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './auth/auth.service';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material';
import {LogOutComponent} from './auth/logout/logout.component';
import {ProfileComponent} from './profile/profile-information/profile.component';
import {MatSidenav} from '@angular/material';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import{LoadingSpinnerComponent} from "./common/loading-spinner-component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userAuthenticated = false;
  displayName = '';
  private authListener: Subscription;
  private autoLogoutListener: Subscription;
  profile:any;
  isAuth = false;
  menuText = 'Main Page';
  private profileSub: Subscription;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public authService: AuthService, private dialog: MatDialog,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private http: HttpClient,
              private router:Router) {
    this.http.get('./assets/icon/icon.json').subscribe((result:any)=> {
      for (let i =0; i<result.length;i++) {
        iconRegistry.addSvgIcon(result[i].name, sanitizer.bypassSecurityTrustResourceUrl('assets/icon/'+result[i].name+'.svg'));
      }
    });

    // this.iconList.forEach( (icon) =>
    //   {
    //     iconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl('assets/icon/'+icon.name+'.svg'));
    //   }
    // );
    this.authService.AutoLogin();
    this.profileSub = this.authService.getProfileListener().subscribe( (profile:any)=> {
      this.profile = profile
    });

  }
  closedAndLog() {
    console.log('form app');
    this.sidenav.close();
  }
  ngOnInit() {
    this.authListener = this.authService.getAuthTokenListener().subscribe(
      isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
      }
    );
    this.autoLogoutListener = this.authService.getAutoLogoutListener().subscribe(
      autologout => {
        if (autologout) {
          this.autoLogout();
        }
      }
    );
  }

  onLogOut() {
    this.authService.logout();
  }

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {userName: this.displayName},
      autoFocus: false,
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {userName: this.displayName},
      autoFocus: false,
    });
  }

  logout() {
    const dialogRef = this.dialog.open(LogOutComponent, {
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {userName: this.displayName},
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => {
      document.getElementById('logout').blur();
      // console.log('manual logout subscribtion')
    });
  }

  autoLogout() {
    const dialogRef = this.dialog.open(LogOutComponent, {
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {autologout: true, userName: this.displayName},
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.authService.autoLogout();
      // console.log('Auto logout subscribtion')
    });
  }
}


