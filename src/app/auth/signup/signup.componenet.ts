import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {passwordValidator, samePasswordValidator, emailValidator, loginNameValidator} from '../../form-Validators/sync.validator';
import {TooltipPosition} from '@angular/material/tooltip';
import { Subscription, Observable, timer } from 'rxjs';
import {AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent implements OnInit, OnDestroy {
  isLoading = true;
  form: FormGroup;
  passwordStrength = '';
  passwordScore: number;
  position: TooltipPosition = 'below';
  scorecolor: string;
  private timeout;
  password = 'abc';
  private authListener: Subscription;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authListener = this.authService.getAuthTokenListener().subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['']);
        }
      }
    );

    this.isLoading = false;
    this.form = new FormGroup({
      'loginName': new FormControl(null, {validators: [Validators.required, loginNameValidator],
         asyncValidators: [this.validateUsername.bind(this)]}),
      'password': new FormControl(null, {validators: [Validators.required]}),
      'confirmPassword': new FormControl(null, {validators: [Validators.required]}),
      'email': new FormControl(null, {validators: [Validators.required, emailValidator]}),
      'displayName': new FormControl(null, {validators: [Validators.required],
        asyncValidators: [this.validateDisplayname.bind(this)]}),
  });
}
  onSignUp() {
    if (this.form.invalid) {
      return;
    }
    this.authService.createUser(this.form.value.loginName, this.form.value.password, this.form.value.displayName, this.form.value.email);
  }

  ratePassword(password: string) {
    this.passwordScore = 0;
    if (!password) {
        return;
    }

    const letters = {};
    for (let i = 0; i < password.length; i++) {
        letters[password[i]] = (letters[password[i]] || 0) + 1;
        this.passwordScore += 5.0 / letters[password[i]];
    }

    const variations = {
        digits: /\d/.test(password),
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password),
    };

    let variationCount = 0;
    for (const check of Object.keys(variations)) {
        variationCount += (variations[check]) ? 1 : 0;
    }
    this.passwordScore += (variationCount - 1) * 10;
    return this.passwordScore;
}

checkPasswordStrength(password: string) {
  const score = this.ratePassword(password);
  // console.log(this.passwordScore);
  if (score > 80) {
      this.scorecolor = 'strong';
      return this.passwordStrength = 'strong';
  }
  if (score > 40) {
      this.scorecolor = 'good';
      return this.passwordStrength = 'good';
  }
  if (score <= 40) {
    this.scorecolor = 'weak';
      return this.passwordStrength = 'weak';
  }
}

validateUsername(control: AbstractControl) {
  clearTimeout(this.timeout);
  return new Promise((resolve, reject) => {
    this.timeout = setTimeout(() => {
      this.authService.checkUserNameTaken(control.value)
      .subscribe(result => {
          if (result === 'true') {
            return resolve({nameExists: true});
          }
          resolve(null);
        })
      ; } , 1500);
  });
}


validateDisplayname(control: AbstractControl) {
  clearTimeout(this.timeout);
  return new Promise((resolve, reject) => {
    this.timeout = setTimeout(() => {
      this.authService.checkDisplayNameTaken(control.value)
      .subscribe(result => {
          if (result === 'true') {
            return resolve({nameExists: true});
          }
          resolve(null);
        })
      ; } , 1500);
  });
}

showerror() {
// resolve for test
}
// https://alligator.io/angular/async-validators/

ngOnDestroy() {
this.authListener.unsubscribe();
}

}
