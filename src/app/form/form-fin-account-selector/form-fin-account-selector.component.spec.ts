import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFinAccountSelectorComponent } from './form-fin-account-selector.component';

describe('FormFinAccountSelectorComponent', () => {
  let component: FormFinAccountSelectorComponent;
  let fixture: ComponentFixture<FormFinAccountSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFinAccountSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFinAccountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
