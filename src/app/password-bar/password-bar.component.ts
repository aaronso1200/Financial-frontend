import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-password-bar',
  templateUrl: './password-bar.component.html',
  styleUrls: ['./password-bar.component.css']
})

export class PasswordBarComponent implements OnInit {
  @Input() password : string;
  constructor() { }

  ngOnInit() {
    console.log(this.password);
  }

}
