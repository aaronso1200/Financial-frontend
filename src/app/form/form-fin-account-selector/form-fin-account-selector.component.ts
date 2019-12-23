import { Component, OnInit,Input } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FinManageService} from "../../finManage/finManage.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'form-fin-account-selector',
  templateUrl: './form-fin-account-selector.component.html',
  styleUrls: ['./form-fin-account-selector.component.css']
})

export class FormFinAccountSelectorComponent implements OnInit {
  @Input() parentForm:FormGroup;
  @Input() formControlName : String;
  accountList: any[] =[];
  private unsubscribe: Subject<boolean> = new Subject();

  constructor(private finManageService: FinManageService ) {
    this.finManageService.getAccountLists();
    this.finManageService.getListUpdateListener().pipe(takeUntil(this.unsubscribe)).subscribe(
        (result: []) => {
          this.accountList = result;
        });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
