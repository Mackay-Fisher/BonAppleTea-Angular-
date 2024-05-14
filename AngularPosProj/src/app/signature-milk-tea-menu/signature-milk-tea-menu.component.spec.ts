import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureMilkTeaMenuComponent } from './signature-milk-tea-menu.component';

describe('SignatureMilkTeaMenuComponent', () => {
  let component: SignatureMilkTeaMenuComponent;
  let fixture: ComponentFixture<SignatureMilkTeaMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignatureMilkTeaMenuComponent]
    });
    fixture = TestBed.createComponent(SignatureMilkTeaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
