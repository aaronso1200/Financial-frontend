import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankStatementViewPdfComponent } from './manage-bank-statement-view-pdf.component';

describe('ManageBankStatementViewPdfComponent', () => {
  let component: ManageBankStatementViewPdfComponent;
  let fixture: ComponentFixture<ManageBankStatementViewPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBankStatementViewPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBankStatementViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
