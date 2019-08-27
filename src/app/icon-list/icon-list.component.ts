import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['../common/common.css']
})
export class IconListComponent implements OnInit {
  iconList = [];
  finAccountId ='';
  isLoading = false;

  constructor( private dialogRef: MatDialogRef<  IconListComponent >, @Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient) {
    this.isLoading=true;
    this.finAccountId = data.finAccountId;
    this.http.get('./assets/icon/icon.json').subscribe((result:any)=> {
      this.iconList=result;
      console.log(this.iconList);
      this.isLoading=false;
    })
  }

  ngOnInit() {
  }
 chooseIcon(iconname) {
  // console.log(this.finAccountId);
    this.dialogRef.close({finAccountId:this.finAccountId,icon: iconname});
 }
}
