import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorHandler} from '@angular/core';
import {CoreModule} from './core.module';
import { CookieService } from 'ngx-cookie-service';


import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import {PostListComponent} from './post/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './auth/login/login.componenet';
import {LogOutComponent} from './auth/logout/logout.component';
import { SignUpComponent } from './auth/signup/signup.componenet';
import {VerificatoinComponent} from './auth/verification/verification.component';
import {ProfileComponent} from './profile/profile-information/profile.component';
import {ShowErrorComponent} from './error/show-error.component';

// import {FinManageComponent} from './finManage/finManage.component';
// import {FinManageListComponent} from './finManage/manageAccount/list/list.component';
// import {FinManageEditComponent} from './finManage/manageAccount/edit/edit.component';
// import {FinManageDeleteComponent} from './finManage/manageAccount/delete/delete.component';
// import {FinManageRecordListComponent } from './finManage/manage-Record/manage-record-list/manage-record-list.component';
// import { ManageRecordEditComponent } from './finManage/manage-Record/manage-record-edit/manage-record-edit.component';


import {DynamicComponentHostDirective} from './finManage/dynamic-component-host.directive';
import {HttpErrorsHandler} from './httpErrorsHandler';

import {SnackBarComponent} from './common/snack-bar.component';


import {DomSanitizer} from '@angular/platform-browser';
import { IconListComponent } from './icon-list/icon-list.component';
import { ManageRecordShowRecordItemComponent } from './finManage/manage-Record/manage-record-show-record-item/manage-record-show-record-item.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { PasswordBarComponent } from './password-bar/password-bar.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    LogOutComponent,
    SignUpComponent,
    VerificatoinComponent,
    ProfileComponent,
    DynamicComponentHostDirective,
    ShowErrorComponent,
    SnackBarComponent,
    IconListComponent,
    ManageRecordShowRecordItemComponent,
    ChangePasswordComponent,
    PasswordBarComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    CoreModule.forRoot()
  ],
  entryComponents: [LogOutComponent, ShowErrorComponent, SnackBarComponent,IconListComponent, ChangePasswordComponent,],
  providers: [
    {provide: ErrorHandler, useClass: HttpErrorsHandler}, CookieService],

  // Option 2 to provide service for entire app, add services here and import them in the heading.
  bootstrap: [AppComponent]
})
export class AppModule {


}
