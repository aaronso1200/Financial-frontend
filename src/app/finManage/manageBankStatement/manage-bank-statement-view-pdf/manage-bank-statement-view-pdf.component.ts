import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import * as FileSaver from "file-saver";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {FinManageService} from "../../finManage.service";
import {takeUntil} from "rxjs/operators";
import {LoadingSpinnerComponent} from "../../../common/loading-spinner-component";

const BACKEND_URL = environment.backendURL + '/finManage';

@Component({
  selector: 'app-manage-bank-statement-view-pdf',
  templateUrl: './manage-bank-statement-view-pdf.component.html',
  styleUrls: ['../../list.css']
})

export class ManageBankStatementViewPdfComponent implements OnInit {

  form: FormGroup;
  private pdfSrc:Uint8Array;
  private unsubscribe: Subject<boolean> = new Subject();
  accountList: any[] =[];
   months;
   years;
   currentDate = new Date();
  private file: Blob;
  private fileName: string;
  private fileNotfound: boolean = true;
  isLoading: boolean = true;
  isAllowDownload: boolean = false;
  file_id: string;

  constructor(private http: HttpClient,private finManageService: FinManageService  ) {
    this.months = Array(12).fill(1).map((x,i)=>x+i);
    this.years =  Array(50).fill(2000).map((x,i)=>x+i);
  }

  ngOnInit() {
    // this.finManageService.getAccountLists();

    this.isAllowDownload = false;
    this.form = new FormGroup({
      'year': new FormControl(null, {
        validators: [Validators.required]
      }),
      'month': new FormControl(null, {
        validators: [Validators.required]
      }),
      'finAccountId': new FormControl(null, {
        validators: [Validators.required],
      })
    });
    this.form.patchValue({year: this.currentDate.getFullYear(),month: this.currentDate.getMonth()+1});
    this.form.get('year').updateValueAndValidity();
    this.form.get('month').updateValueAndValidity();

    this.form.valueChanges.subscribe(()=>{this.formOnChange()});
    this.isLoading=false;
  };




  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  markAllAsTouched() {
    for(let i in this.form.controls)
      this.form.controls[i].markAsTouched();
  }
  formOnChange() {
    let data = {year: this.form.get('year').value,month: this.form.get('month').value,finAccountId: this.form.get('finAccountId').value};
    // this.form.patchValue(data);

    // Force form to show validation
    this.markAllAsTouched();
    this.isAllowDownload = false;
     // console.log(this.form);
    if(!this.form.invalid) {
      this.fileNotfound = false;
      this.isLoading= true;
      this.finManageService.getBankStatement(this.form.get('year').value,this.form.get('month').value,this.form.get('finAccountId').value)
          .subscribe((result: {file:any,fileName:string,file_id:string})=> {
        this.isLoading = false;
        if (!result.file) {
          this.fileNotfound = true;
          return ;
        }
        this.isAllowDownload = true;
        this.file_id = result.file_id;
        const ab =new ArrayBuffer(result.file.data.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < result.file.data.length; i++) {
          view[i] = result.file.data[i];
        }
        // console.log(ab);
        this.pdfSrc = new Uint8Array(ab);
        // console.log(result);
        this.file = new Blob([ab], { type:"application/pdf" });
        this.fileName = result.fileName;
        // console.log(this.file);
        // this.downloadButtonDisabled = false;
        this.isLoading=false;
      })
    }
    }

  downloadFile() {
    if (!this.file) {
      alert("No files to download!");
      return false
    }
    FileSaver.saveAs(this.file,this.fileName);
    alert('File downloading!');
  }

  deleteBankStatement() {
    this.isLoading = true;
    this.finManageService.deleteBankStatement(this.file_id).then(()=> {
      this.file_id = '';
      this.isLoading = false;
      this.pdfSrc = new Uint8Array();
      this.formOnChange();
    })
  }
}
