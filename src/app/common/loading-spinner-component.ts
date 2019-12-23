import {Component, Inject, OnDestroy, Input,OnInit} from '@angular/core';


@Component({
  selector: 'loading-spinner',
  template:`
    <div  class="spinner" *ngIf = 'isLoading' ><mat-spinner  class="spinner" ></mat-spinner>
      <h1></h1>
    </div>
  ` ,
  styles: [`
 
  `],
})

export class LoadingSpinnerComponent implements OnDestroy, OnInit{
  @Input('isLoading')
  isLoading:boolean;
  constructor(){
  }

  ngOnInit(){
  }
  ngOnDestroy(){}
}
