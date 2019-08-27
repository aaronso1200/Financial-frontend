import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FinManageListComponent} from './finManage/manageAccount/list/list.component';
import {AuthGuard} from './auth/auth.guard';
import {VerificationGuard} from './auth/verification/verification.guard';
import {FinManageRecordListComponent} from './finManage/manage-Record/manage-record-list/manage-record-list.component';
import {FinChartMainComponent} from './finManage/chart-main/chart-main.component';
import {FinManageRecordByAccountComponent} from './finManage/manage-Record/record-by-Account/record-by-account.component';

const routes: Routes = [
  { path: 'manageAccount', component: FinManageListComponent},
  { path: 'manageRecord', component: FinManageRecordListComponent},
  { path: 'information', component: FinChartMainComponent},
  { path: 'recordByAccount', component: FinManageRecordByAccountComponent},
];


@NgModule ( {
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FinManageRoutingModule{}
