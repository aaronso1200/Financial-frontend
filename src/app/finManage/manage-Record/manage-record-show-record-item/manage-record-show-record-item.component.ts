import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FinManageService} from '../../finManage.service';

@Component({
  selector: 'app-manage-record-show-record-item',
  templateUrl: './manage-record-show-record-item.component.html',
  styleUrls: ['../../../common/common.css']
})
export class ManageRecordShowRecordItemComponent implements OnInit {
record :any;
  constructor(      private dialogRef: MatDialogRef<ManageRecordShowRecordItemComponent>,
                    private finService: FinManageService,
                    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.record = data;
  }

  ngOnInit() {
  }

}
