import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule,
  MatIconModule, MatPaginatorModule, MatDialogModule, MatSidenavModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material';


@NgModule({
 imports: [ MatInputModule,
   MatCardModule,
   MatButtonModule,
   MatToolbarModule,
   MatExpansionModule,
   MatIconModule,
   MatSlideToggleModule,
   MatProgressSpinnerModule,
   MatPaginatorModule,
   MatDialogModule,
   MatTooltipModule,
   MatSidenavModule,
   MatDividerModule,
   MatListModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatSnackBarModule,
   MatSelectModule,
   MatTabsModule,
   MatGridListModule
 ],
  providers: [ MatDatepickerModule,],
  exports: [MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTabsModule,
    MatGridListModule
  ]
})

export class AngularMaterialModule {}
