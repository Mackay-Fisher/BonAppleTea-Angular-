import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAddPopupComponent } from './quick-add-popup.component';

describe('QuickAddPopupComponent', () => {
  let component: QuickAddPopupComponent;
  let fixture: ComponentFixture<QuickAddPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickAddPopupComponent]
    });
    fixture = TestBed.createComponent(QuickAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
