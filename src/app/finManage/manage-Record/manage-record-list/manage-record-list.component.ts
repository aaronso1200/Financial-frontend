import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FinManageService} from '../../finManage.service';
import {ManageRecordEditComponent} from '../manage-record-edit/manage-record-edit.component';
import {MatDialog} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ManageRecordShowRecordItemComponent} from '../manage-record-show-record-item/manage-record-show-record-item.component';
import {FINACCOUNT} from '../../manageAccount/finAccount.model';
import {ManageRecordDeleteComponent} from '../manage-record-delete/manage-record-delete.component';

@Component({
  selector: 'app-manage-record-list',
  templateUrl: './manage-record-list.component.html',
  styleUrls: ['./../../list.css']
})
export class FinManageRecordListComponent implements OnInit, OnDestroy {
  recordsList: any[] = [];
  date : any;
  isLoading =false;

  private unsubscribe: Subject<boolean> = new Subject();

  constructor( private dialog: MatDialog,private finManageService: FinManageService) {
  }

  ngOnInit() {
    this.isLoading=true;
    this.finManageService.getChooseDate().pipe(takeUntil(this.unsubscribe)).subscribe(changeDate => {
     this.date = changeDate;
    });
    this.finManageService.getAccountRecordByDate(this.date);
    this.finManageService.getRecords().pipe(takeUntil(this.unsubscribe)).subscribe( (getrecords: any[]) => {

      this.recordsList = getrecords;
      this.isLoading=false;
      console.log(this.recordsList);
      // console.log(this.recordsList);
    })
  }

  InputDate(event: MatDatepickerInputEvent<Date>){
    // console.log("Day" + event.value.getDate());
    this.date = new Date(event.value);
    console.log('event value ' + event.value);
    // console.log(this.date.toISOString());
     this.finManageService.getAccountRecordByDate((this.date));
  }

  changeDate(value) {
    this.date = new Date(this.date.getTime()+value*86400000);
    this.finManageService.getAccountRecordByDate((this.date));
  }

  create() {
    const dialogRef = this.dialog.open(ManageRecordEditComponent, {
      minWidth: '450px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {mode: 'create', date :this.date},
      autoFocus: false,
    }).afterClosed().subscribe( result => {
      if (result) {
        this.finManageService.getAccountRecordByDate(result.date);
        this.date=result.date;
      }
    });
  }

  recordEdit(id){
    const result: any = this.recordsList.find((data) => {
      return data.id === id;
    });
    const dialogRef = this.dialog.open(ManageRecordEditComponent, {
      minWidth: '450px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {mode: 'edit',id:id, record: result, date:this.date},
      autoFocus: false,
    }).afterClosed().subscribe( result => {
      if (result) {
        this.finManageService.getAccountRecordByDate(result.date);
        this.date=result.date;
      }
    });
  }

  recordDelete(id) {
    const result: any = this.recordsList.find((data) => {
      return data.id === id;
    });
    const dialogRef = this.dialog.open(ManageRecordDeleteComponent, {
      minWidth: '450px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {record: result, date:this.date},
      autoFocus: false,
    }).afterClosed().subscribe( result => {
      if (result) {
        this.finManageService.getAccountRecordByDate(result.date);
        this.date=result.date;
      }
    });
  }

  info(id){
    const record = this.recordsList.find((data) => {
      return data.id = id
    });

    this.dialog.open(ManageRecordShowRecordItemComponent, {
      minWidth: '450px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: record,
      autoFocus: false,
    })
  }

  showalert(){
    console.log('abc');
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  //  Unsubscribe all the subscription with take until
  }
}
