import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {loginNameValidator} from '../../form-Validators/sync.validator';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CommonService} from '../../common/common.service';
import {PasswordBarComponent} from '../../password-bar/password-bar.component';
import {passwordValidator,samePasswordValidator} from '../../form-Validators/sync.validator';

const BACKEND_URL = environment.backendURL;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  passwordScore: number;
  scorecolor: string;
  passwordStrength = '';

  constructor(private http: HttpClient, private commonService: CommonService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'old_password' : new FormControl(null, {validators: [Validators.required]}),
      'new_password': new FormControl(null, {validators: [Validators.required]}),
      'new_password_confirm': new FormControl(null, {validators: [Validators.required]}),
    })
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

changePassword() {
    let value = this.form.value;
    if (value.new_password !== value.new_password_confirm) {
      return false
    }
    let data = {oldPassword:value.old_password, newPassword: value.new_password};
  console.log(data);
  this.http.put(BACKEND_URL + '/user/changePassword',data).subscribe( (result) => {
    this.commonService.opensnackbar('Update password successful');
  })
}

}
