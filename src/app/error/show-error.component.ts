import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-showerror',
  templateUrl: './show-error.component.html',
  styleUrls: ['../common/common.css']
})

export class ShowErrorComponent implements OnInit {
  title ='';
  message ='';
  constructor(
    private dialogRef: MatDialogRef< ShowErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }
}
