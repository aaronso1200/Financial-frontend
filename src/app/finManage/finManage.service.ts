import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {FINACCOUNT} from './manageAccount/finAccount.model';
import {SnackBarComponent} from '../common/snack-bar.component';
import {MatSnackBar} from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import {CommonService} from '../common/common.service';

const BACKEND_URL = environment.backendURL + '/finManage';
const postData = {};
// Provide service for entire app @Injectable
@Injectable({providedIn: 'root'})
export class FinManageService {
  private listAccountData: any [] = [];
  private listUpdated = new Subject();
  private referenceDate = new Date();
  private DateListener = new BehaviorSubject<Date>(new Date(this.referenceDate.getFullYear(),this.referenceDate.getMonth(),this.referenceDate.getDate()));

  private recordList : any[] = [];
  private recordUpdated = new Subject();
  private accountSumData = new Subject();

  constructor(private http: HttpClient, private router: Router,private commonService: CommonService ) {

  }

  getChooseDate() {
    return this.DateListener.asObservable();
  }

  getRecords() {
    return this.recordUpdated.asObservable();
  }

  getAccountSumData() {
    return this.accountSumData.asObservable();
  }

  accountOnCreate(name, description) {
     const createData = {name: name, description: description,icon: "default_account"};
    this.http.post<{accounts: any}>
    (BACKEND_URL + '/create', createData).subscribe( (responseData) => {
      const account = responseData.accounts;
      const Data: any = {id: account._id, name: account.name, description: account.description, icon:"default_account"};
      this.listAccountData.push(Data);
      this.listUpdated.next([...this.listAccountData]);
      this.commonService.opensnackbar('Create successful');

      }

    );
  }

  accountOnDelete(id) {
    const data = {id: id};
    this.http.post(BACKEND_URL + '/delete', data).subscribe( (responseData) => {
      this.listAccountData = this.listAccountData.filter(list => list.id !== id);
        this.listUpdated.next([...this.listAccountData]);
        this.commonService.opensnackbar('Delete account successful');
    });
  }

  recordOnDelete(id) {
    const data= {id:id};
    this.http.post(BACKEND_URL + '/record/delete',data).subscribe((responseData) => {

    })
  }
  accountOnUpdate(id, name, description) {
    const editData = {id: id, name: name, description: description};
    this.http.put(BACKEND_URL + '/edit', editData).subscribe( (response) => {
      const updatedlistData = [...this.listAccountData];
      const oldDataIndex = updatedlistData.findIndex(p => p.id === id);
      const oldData = this.listAccountData[oldDataIndex]
      updatedlistData[oldDataIndex] = {id: id, name: name, description: description,icon: oldData.icon};
       this.listAccountData = updatedlistData;
       this.listUpdated.next([...this.listAccountData]);
       this.commonService.opensnackbar('Update successful');
    });
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }

  getAccountLists() {
    this.http.post<{accounts: any}>(BACKEND_URL + '/list', '').pipe(
      map((data) => {
        return {
          accounts: data.accounts.map(account => {
            return {
              id: account._id,
              name: account.name,
              description: account.description,
              icon: account.icon? account.icon : "default_account"
            };
          })

        };
      })
    ).subscribe(
      (transformData) => {
         this.listAccountData = transformData.accounts;
         this.listUpdated.next([...this.listAccountData]);
         // console.log(this.listData);
        });
      }

  getAccountRecordByDate(date) {
    const data = {date:date};
    // console.log('getDateService: '+ data.date);
    this.http.post <{records:any[]}>(BACKEND_URL +'/record/listByDate',data).pipe(map((accountRecord) => {
      // console.log('Accounts record: ' + accountRecord);
      return {
       records: accountRecord.records.map((records) => {
         return {
           id: records._id,
           description: records.description,
           amount: records.amount,
           recordType: records.recordType,
           finAccount: records.finAccountId.name,
           finAccountId: records.finAccountId._id,
           icon: records.finAccountId.icon? records.finAccountId.icon : "default_account"
         }
       })
      }
    }))
      .subscribe(result => {
      this.recordList = result.records;
      this.recordUpdated.next([...this.recordList]);
      return result.records;
    });
  }


  getAccountSum() {
    this.http.post(BACKEND_URL + '/record/AllAccountsum',{}).subscribe(result => {
      // console.log(result);
     this.accountSumData.next(result);
    })
  }

  recordOnCreate(finAccountFrom,finAccountTo,recordDate,recordType,amount,description) {
    const createData = {finAccountFrom: finAccountFrom,finAccountTo:finAccountTo, recordDate: recordDate, recordType: recordType, amount:amount, description: description};
    this.http.post(BACKEND_URL + '/record/create', createData).subscribe( result => {
      // console.log(result);
      this.commonService.opensnackbar('Create record successful')
      }
    );
  }

  recordOnUpdate(recordId,finAccountId,recordDate,recordType,amount,description) {
    const createData = {id: recordId,finAccountId: finAccountId, recordDate: recordDate, recordType: recordType, amount:amount, description: description};
    this.http.post(BACKEND_URL + '/record/edit', createData).subscribe( result => {
        // console.log(result);
      this.commonService.opensnackbar('Update record successful')
      }
    );}

  changeIcon(finAccountId,icon) {
    // console.log('AccountId: '+ finAccountId + ' IconName: ' + icon);
    const createData = {finAccountId: finAccountId, icon:icon};
    this.http.post(BACKEND_URL + '/finAccount/updateIcon',createData).subscribe( result => {
      const updatedlistData = [...this.listAccountData];
      const oldDataIndex = updatedlistData.findIndex(p => p.id === finAccountId);
      const oldData = this.listAccountData[oldDataIndex];
      updatedlistData[oldDataIndex] = {id: finAccountId, name: oldData.name, description: oldData.description, icon: icon};
      this.listAccountData = updatedlistData;
      this.listUpdated.next([...this.listAccountData]);
      this.commonService.opensnackbar('Update icon successful');
      });
    }



}
