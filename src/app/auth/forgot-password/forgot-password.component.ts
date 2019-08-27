import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {emailValidator} from '../../form-Validators/sync.validator';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
const BACKEND_URL = environment.backendURL;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(private http: HttpClient, private router: Router) { }
  data:any;

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, {validators: [Validators.required, emailValidator]}),
    })

  }

  forgotpassword() {
    if (this.form.invalid) {
      return;
    }
    this.data = this.form.value;
    this.http.post(BACKEND_URL + '/user/forgotpassword',this.data).subscribe((result) => {

    });
  }

}
