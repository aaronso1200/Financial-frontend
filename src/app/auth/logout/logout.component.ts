import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, timer, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogOutComponent implements OnDestroy, OnInit {
  counter: Observable<number>;
  private $timer: Subscription;
  count: number;
  isLoading = true;
  autologout = false;
  profile: any;
  profileSub : Subscription;
  constructor(
    public authService: AuthService,
    private dialogRef: MatDialogRef<LogOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.count = 60;
    this.counter = timer(0, 1000).pipe(
      take(this.count),
      map(() => this.count--)
    );
    this.profileSub = this.authService.getProfileListener().subscribe( (profile:any)=> {
      this.profile = profile
    });
  }

  ngOnInit() {
    this.isLoading = false;
    this.autologout = this.data.autologout;
    if (this.autologout) {
    this.$timer = this.counter.subscribe(() => {
      // console.log(this.count);
      if (this.count === 0) {
        this.authService.logout();
        this.dialogRef.close();
      }
    });
    }
  }

  logOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
    if (this.autologout) {
    this.$timer.unsubscribe();
  }
}
}
