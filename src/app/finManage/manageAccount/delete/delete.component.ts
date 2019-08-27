import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FinManageService} from '../../finManage.service';
import {FINACCOUNT} from '../finAccount.model';


@Component({
  selector: 'app-finDelete',
  templateUrl: './delete.component.html',
  styleUrls: ['../../../common/common.css']
})
export class FinManageDeleteComponent implements OnDestroy, OnInit {

  isLoading = true;
  constructor(private finManage: FinManageService,
    private dialogRef: MatDialogRef<FinManageDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FINACCOUNT
  ) {
  }

  ngOnInit() {
  }
  ngOnDestroy() {

  }
  delete(id) {
    this.finManage.accountOnDelete(id);
    this.dialogRef.close();
  }
}
