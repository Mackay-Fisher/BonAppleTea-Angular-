import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestockReportPopupComponent } from './restock-report-popup.component';

describe('RestockReportPopupComponent', () => {
  let component: RestockReportPopupComponent;
  let fixture: ComponentFixture<RestockReportPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestockReportPopupComponent]
    });
    fixture = TestBed.createComponent(RestockReportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
