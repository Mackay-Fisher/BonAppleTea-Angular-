import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupButtonComponent } from './signup-button.component';

describe('SignupButtonComponent', () => {
  let component: SignupButtonComponent;
  let fixture: ComponentFixture<SignupButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupButtonComponent]
    });
    fixture = TestBed.createComponent(SignupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
