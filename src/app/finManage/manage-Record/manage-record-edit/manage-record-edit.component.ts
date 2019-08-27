import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FinManageService} from '../../finManage.service';
import {NgForm} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SnackBarComponent} from '../../../common/snack-bar.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-manage-record-edit',
  templateUrl: './manage-record-edit.component.html',
  styleUrls: ['../../../common/common.css']
})
export class ManageRecordEditComponent implements OnInit,OnDestroy {
  @ViewChild('createForm') form: NgForm;
 mode= '';
 date: Date;
 accountList: any;
 filteredAccountList: any;
 isMobile = false;
 dateInvalid :boolean;
 recordType :any;
 accountSelectFrom: any;

 private unsubscribe: Subject<boolean> = new Subject();
 private accountSelect;
private recordId;

  constructor(    private dialogRef: MatDialogRef< ManageRecordEditComponent>,
                  private finManage: FinManageService,
                  private snackBar: MatSnackBar,
                  @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log(data);
    this.mode = data.mode;
      this.date = data.date;
    this.recordId = data.id;
  }

  ngOnInit() {
    this.finManage.getAccountLists();
    this.finManage.getListUpdateListener().pipe(takeUntil(this.unsubscribe)).subscribe(
      (result: []) => {
        this.accountList = result ;
        // console.log(this.accountList);
        this.accountSelect = this.accountList[0].id;
      });

    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
    setTimeout(() => {
      const record = this.data.record;
      this.form.controls['recordType'].setValue(record.recordType);
      this.form.controls['accountSelectFrom'].setValue(record.finAccountId);
      this.form.controls['amount'].setValue(record.amount);
      this.form.controls['description'].setValue(record.description);
    });
    // console.log(this.form.controls)
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  onSave(form: NgForm) {
    if (this.date == null) {
      this.dateInvalid = true;
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: {message:'Date Invalid'},
        duration: 3000

      });
      return false;
    }
    this.dateInvalid = false;

    if (form.invalid) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: {message:'Form Invalid'},
        duration: 1000
      });
      return false;
    }

    // console.log('create date' + this.date);
    // return false;
    const values = form.value;
    if (this.mode === 'create') {
      this.finManage.recordOnCreate(values.accountSelectFrom,values.accountTo,this.date,values.recordType,values.amount,values.description);
    }

    if (this.mode === 'edit') {
      this.finManage.recordOnUpdate(this.recordId,values.accountSelectFrom,this.date,values.recordType,values.amount,values.description)
    }

     this.dialogRef.close({date:this.date});
  }

  selectAccount(event){
    console.log(event.value);
    this.filteredAccountList=this.accountList.filter(list => {
      return list.id !== event.value;
    });
// console.log(this.filteredAccountList);
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
