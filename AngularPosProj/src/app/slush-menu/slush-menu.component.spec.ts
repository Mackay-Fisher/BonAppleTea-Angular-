import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlushMenuComponent } from './slush-menu.component';

describe('SlushMenuComponent', () => {
  let component: SlushMenuComponent;
  let fixture: ComponentFixture<SlushMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlushMenuComponent]
    });
    fixture = TestBed.createComponent(SlushMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
