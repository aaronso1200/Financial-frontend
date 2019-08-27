import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FinManageService} from '../../finManage.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ManageRecordEditComponent} from '../manage-record-edit/manage-record-edit.component';
import {ManageRecordDeleteComponent} from '../manage-record-delete/manage-record-delete.component';
import {MatDialog, PageEvent} from '@angular/material';

const BACKEND_URL = environment.backendURL + '/finManage/record';

@Component({
  selector: 'app-record-by-account',
  templateUrl: './record-by-account.component.html',
  styleUrls: ['../../list.css']
})

export class FinManageRecordByAccountComponent implements OnInit, OnDestroy {
  recordsList: any[] = [];
  date : any;
  isLoading =false;
  accountList: any[] =[];
  data :any;
  totalRecords = 0;
  postsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private unsubscribe: Subject<boolean> = new Subject();
  constructor(private dialog: MatDialog,private finManageService: FinManageService,private http: HttpClient) {

  }

  ngOnInit() {
    this.isLoading=true;
    this.finManageService.getAccountLists();
    this.finManageService.getListUpdateListener().pipe(takeUntil(this.unsubscribe)).subscribe(
      (result: []) => {
        this.accountList = result ;
        this.isLoading=false;
      });
  }

  recordEdit(id){
    const result: any = this.recordsList.find((data) => {
      return data.id === id;
    });
    this.dialog.open(ManageRecordEditComponent, {
      minWidth: '450px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {mode: 'edit',id:id, record: result, date:result.recordDate},
      autoFocus: false,
    }).afterClosed().subscribe( result => {
      if (result) {
        this.getRecordFromServer(this.data);
      }
    });
  }

  recordDelete(id) {
    const result: any = this.recordsList.find((data) => {
      return data.id === id;
    });
    this.dialog.open(ManageRecordDeleteComponent, {
      minWidth: '450px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {record: result, date:this.date},
      autoFocus: false,
    }).afterClosed().subscribe( result => {
      if (result) {
        this.getRecordFromServer(this.data);
      }
    });
  }

  submitFilter(event){
    this.isLoading=true;
    // console.log(event.value);
    this.data = {account: event.value, pageSize: this.postsPerPage,page: this.currentPage};
    // console.log(data);
    this.getRecordFromServer(this.data);
  }

 getRecordFromServer(data) {
    this.http.post(BACKEND_URL + '/getRecordByAccount', data).subscribe((result:any)=> {
      this.isLoading = false;
      console.log(result);
      this.recordsList = result.result;
      this.totalRecords = result.counts.counts;
      for (let i=0; i<this.recordsList.length;i++) {
        let date = new Date(this.recordsList[i].recordDate);
        this.recordsList[i].displayDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
      }
    })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.data = {account: this.data.account, pageSize:this.postsPerPage, page: this.currentPage};
    this.getRecordFromServer(this.data);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


}
