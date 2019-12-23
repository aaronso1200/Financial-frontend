import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import {LoadingSpinnerComponent} from "./common/loading-spinner-component";
import {AngularMaterialModule} from "./angular-material.module";

@NgModule({
    imports: [
        CommonModule,
        AngularMaterialModule
    ],
    exports: [
        LoadingSpinnerComponent,
        CommonModule,
        AngularMaterialModule
    ],
    declarations:[
     LoadingSpinnerComponent
    ],
  entryComponents:[]

})

export class ShareModule {}
