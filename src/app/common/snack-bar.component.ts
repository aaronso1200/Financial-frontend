import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA,MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'snack-bar-component',
  template:`
    <span class="text">
 {{message}}
</span>
  ` ,
  styles: [`
    .text {
      color: white;
    }
  `],
})
export class SnackBarComponent implements OnDestroy, OnInit{
  message = '';
  constructor( private snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public data: any,){
    this.message = data.message;
  }

  ngOnInit(){
  }
  ngOnDestroy(){}
}
