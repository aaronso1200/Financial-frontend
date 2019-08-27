import { Component, OnInit,OnDestroy } from '@angular/core';
import {AuthService} from './../auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  isLoading = true;
  message = '';
  private authListener: Subscription;
  constructor(public authService: AuthService,private router: Router, private route: ActivatedRoute, private cookiesService :CookieService) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.authListener = this.authService.getAuthTokenListener().subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['']);
        }
      }
    );

    const unAuth = this.route.snapshot.paramMap.get('unAuth');
    const newUser = this.route.snapshot.paramMap.get('newUser');
    this.route.params.subscribe(params => {
      if (params.error) {
        this.message = ' Password or user name doesn\'t exist.';
      }
    });

    if (unAuth) {
      this.message = 'Unauthorized access, please login to perform the action.';
    }
    if (newUser) {
      this.message = ' Create user successful! Please login to continue';
    }
  }

   onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.loginName, form.value.password);
  }
  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }
}

// TODO Add forget password page
