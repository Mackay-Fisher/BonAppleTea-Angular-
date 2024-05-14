import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPopupComponent } from './manager-popup.component';

describe('ManagerPopupComponent', () => {
  let component: ManagerPopupComponent;
  let fixture: ComponentFixture<ManagerPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerPopupComponent]
    });
    fixture = TestBed.createComponent(ManagerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
