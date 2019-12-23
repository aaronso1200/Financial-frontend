import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import {FinManageListComponent} from './finManage/manageAccount/list/list.component';
import {FinManageRoutingModule} from './finManage-routing.module';
import {AngularMaterialModule} from './angular-material.module';
import {FinManageEditComponent} from './finManage/manageAccount/edit/edit.component';
import {FinManageDeleteComponent} from './finManage/manageAccount/delete/delete.component';
import {FinManageRecordListComponent} from './finManage/manage-Record/manage-record-list/manage-record-list.component';
import {ManageRecordEditComponent} from './finManage/manage-Record/manage-record-edit/manage-record-edit.component';
import {ManageRecordDeleteComponent} from './finManage/manage-Record/manage-record-delete/manage-record-delete.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { FinChartMainComponent } from './finManage/chart-main/chart-main.component';
import {FinManageRecordByAccountComponent} from './finManage/manage-Record/record-by-Account/record-by-account.component';
import {ManageBankStatementAddComponent} from "./finManage/manageBankStatement/manage-BankStatement-Add/manage-BankStatement-add.component";
import {PdfViewerModule} from "ng2-pdf-viewer";
import { ManageBankStatementViewPdfComponent } from './finManage/manageBankStatement/manage-bank-statement-view-pdf/manage-bank-statement-view-pdf.component';
import {ShareModule} from "./share.module";
import { FormFinAccountSelectorComponent } from './form/form-fin-account-selector/form-fin-account-selector.component';

@NgModule({
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        FinManageRoutingModule,
        PdfViewerModule,
        ShareModule,
    ],
    declarations:[
      FinManageListComponent,
      FinManageEditComponent,
      FinManageDeleteComponent,
      FinManageRecordListComponent,
      ManageRecordEditComponent,
      ManageRecordDeleteComponent,
      FinChartMainComponent,
      FinManageRecordByAccountComponent,
      ManageBankStatementAddComponent,
      ManageBankStatementViewPdfComponent,
      FormFinAccountSelectorComponent
    ],
  entryComponents:[ FinManageEditComponent, FinManageDeleteComponent, ManageRecordEditComponent,ManageRecordDeleteComponent]

})

export class FinManageModule {}
