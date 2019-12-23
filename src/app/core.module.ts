import { NgModule, ModuleWithProviders,Optional,SkipSelf } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from './auth/auth-interceptor';

import {AngularMaterialModule} from './angular-material.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';
import {LoadingSpinnerComponent} from "./common/loading-spinner-component";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,

  ],
  exports: [
    CommonModule,
    AngularMaterialModule,

  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
         {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1000, panelClass:['custom-snackbar-class']}},
      ]
    };
  }

}
