import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecordEditComponent } from './manage-record-edit.component';

describe('ManageRecordEditComponent', () => {
  let component: ManageRecordEditComponent;
  let fixture: ComponentFixture<ManageRecordEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRecordEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
