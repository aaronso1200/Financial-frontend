import { Component, OnInit, Inject, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {NgForm} from '@angular/forms';
import {FinManageService} from '../../finManage.service';
import { MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-finEdit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../../common/common.css']
})


export class FinManageEditComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('createForm') form: NgForm;
  mode = '';
  isLoading = true;
  constructor(
    private dialogRef: MatDialogRef<FinManageEditComponent>,
    private finService: FinManageService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.mode = data.mode;
  }

  ngOnInit() {
    setTimeout(() => {
     this.form.controls['name'].setValue(this.data.name);
     this.form.controls['description'].setValue(this.data.description);
    });

  }

  ngAfterViewInit() {
    // this.form.form.controls.setValue('abc');
    // .form.form.setValue({name: '123'})
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return false;
    }

    if (this.mode === 'create') {
      this.finService.accountOnCreate(form.value.name, form.value.description);

    }

    if (this.mode === 'edit') {
      this.finService.accountOnUpdate(this.data.id, form.value.name, form.value.description);
    }
    this.dialogRef.close();
  }


  ngOnDestroy() {

  }
}
