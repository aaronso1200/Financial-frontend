import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.componenet';
import {SignUpComponent} from './auth/signup/signup.componenet';
import { AuthGuard } from './auth/auth.guard';
import { VerificatoinComponent } from './auth/verification/verification.component';
import {ProfileComponent} from './profile/profile-information/profile.component';
import {VerificationGuard} from './auth/verification/verification.guard';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';

// import {FinManageListComponent} from './finManage/manageAccount/list/list.component';
// import {FinManageRecordListComponent} from './finManage/manage-Record/manage-record-list/manage-record-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'post-create', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'post-edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'verification', component: VerificatoinComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  //
  { path: 'finManage', loadChildren: './finManage.module#FinManageModule',canActivate: [AuthGuard,VerificationGuard]},

  { path: '**', redirectTo: ''},
];
// TODO Add profile component for user to configure data

@NgModule ( {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, VerificationGuard]
})
export class AppRoutingModule {}
