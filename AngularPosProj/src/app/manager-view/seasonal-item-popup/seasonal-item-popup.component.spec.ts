import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalItemPopupComponent } from './seasonal-item-popup.component';

describe('SeasonalItemPopupComponent', () => {
  let component: SeasonalItemPopupComponent;
  let fixture: ComponentFixture<SeasonalItemPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonalItemPopupComponent]
    });
    fixture = TestBed.createComponent(SeasonalItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
