import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FinManageService} from '../../finManage.service';

@Component({
  selector: 'app-finRecordDelete',
  templateUrl: './manage-record-delete.component.html',
  styleUrls: ['../../../common/common.css']
})
export class ManageRecordDeleteComponent implements OnDestroy, OnInit {
  isLoading = true;
  record:any;
  constructor(private finManage: FinManageService,
              private dialogRef: MatDialogRef<FinManageService>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.record = this.data.record;
  }

  ngOnInit() {
    console.log(this.record);
  }
  ngOnDestroy() {

  }
  delete(id) {
    this.finManage.recordOnDelete(id);
    this.dialogRef.close({date:this.data.date});
  }
}
