import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordBarComponent } from './password-bar.component';

describe('PasswordBarComponent', () => {
  let component: PasswordBarComponent;
  let fixture: ComponentFixture<PasswordBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
