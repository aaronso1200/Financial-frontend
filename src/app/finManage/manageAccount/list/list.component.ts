import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FinManageEditComponent} from '../edit/edit.component';
import {FinManageDeleteComponent} from '../delete/delete.component';
import {FinManageService} from '../../finManage.service';
import {Subscription} from 'rxjs';
import {FINACCOUNT} from '../finAccount.model';
import {IconListComponent} from '../../../icon-list/icon-list.component';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class FinManageListComponent implements OnInit,OnDestroy {
  dataList: any = [];
  private listSubscribe: Subscription;
  private unsubscribe: Subject<boolean> = new Subject();

  ngOnInit() {
  this.finManage.getAccountLists();
  this.listSubscribe =
    this.finManage.getListUpdateListener().pipe(takeUntil(this.unsubscribe)).subscribe(
    (result: []) => {
     this.dataList = result ;
     // console.log(this.dataList);
    }
  );
  }
  constructor( private dialog: MatDialog, private finManage: FinManageService) {
  }


 edit(value) {
   const result: any = this.dataList.find((data: FINACCOUNT) => {
     return data.id === value;
   });
   const dialogRef = this.dialog.open(FinManageEditComponent, {
     hasBackdrop: true,
     panelClass: 'my-panel',
     data: {mode: 'edit', id: value, name: result.name , description: result.description},
     autoFocus: false,
   });
 }

 delete(value) {
   const result: any = this.dataList.find((data: FINACCOUNT) => {
     return data.id === value;
   });
     const dialogRef = this.dialog.open(FinManageDeleteComponent, {
       hasBackdrop: true,
       panelClass: 'my-panel',
       data: {id: value, name: result.name, description: result.description},
       autoFocus: false,
     });
 }

  iconSelect(finAccountId) {
    const diaLogRef = this.dialog.open(IconListComponent, {
      width: '600px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {finAccountId: finAccountId},
      autoFocus: false,
    }).afterClosed().subscribe(data =>{
      if (data) {
      this.finManage.changeIcon(data.finAccountId,data.icon);
      }
    })
  }

  create() {
    const dialogRef = this.dialog.open(FinManageEditComponent, {
      width: '300px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {mode: 'create'},
      autoFocus: false,
    });
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  // edit(value) {
  //   const dialogRef = this.dialog.open('', {
  //     hasBackdrop: true,
  //     panelClass: 'my-panel',
  //     data: {id: value},
  //     autoFocus: false,
  //   });
  // }
  }

