import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FinManageService} from "../../finManage.service";
const BACKEND_URL = environment.backendURL + '/finManage';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import { mimeType } from './pdf.validator';

@Component({
  selector: 'app-manage-record-bypdf',
  templateUrl: './manage-BankStatement-add.component.html',
  styleUrls: ['../../list.css']
})
export class ManageBankStatementAddComponent implements OnInit,OnDestroy {
  form: FormGroup;
  pdfSrc = "";
  private unsubscribe: Subject<boolean> = new Subject();
  accountList: any[] =[];
  private months;
 private years;
private currentDate = new Date();

  constructor(private http: HttpClient,private finManageService: FinManageService  ) {
    this.months = Array(12).fill(1).map((x,i)=>x+i);
    this.years =  Array(50).fill(2000).map((x,i)=>x+i);
    console.log('year' + this.years);
  }

  ngOnInit() {
    this.finManageService.getAccountLists();
    this.finManageService.getListUpdateListener().pipe(takeUntil(this.unsubscribe)).subscribe(
        (result: []) => {
          console.log('called');
          console.log(result);
          this.accountList = result;
        });
    this.form = new FormGroup({
      'bank_statement': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      'year': new FormControl(null, {
        validators: [Validators.required]
      }),
      'month': new FormControl(null, {
        validators: [Validators.required]
      }),
      'account': new FormControl(null, {
        validators: [Validators.required]
      })
    })
    this.form.patchValue({year: this.currentDate.getFullYear(),month: this.currentDate.getMonth()+1});
    this.form.get('year').updateValueAndValidity();
    this.form.get('month').updateValueAndValidity();
  };




  OnStatementPick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({bank_statement: file}); // file is an object, reactive form not limited to store text
    this.form.get('bank_statement').updateValueAndValidity();
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer(file);
    }
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  onSave() {
   if (this.form.invalid) {
      if (this.form.get('bank_statement').hasError('invalidfile')) {
       alert("Please upload File and make sure it is a pdf");
     }
     return false
   }
    this.finManageService.uploadBankStatement(this.form.value.bank_statement,this.form.value.account,this.form.value.year,this.form.value.month);
  }
}