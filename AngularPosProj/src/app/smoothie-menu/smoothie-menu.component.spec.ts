import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothieMenuComponent } from './smoothie-menu.component';

describe('SmoothieMenuComponent', () => {
  let component: SmoothieMenuComponent;
  let fixture: ComponentFixture<SmoothieMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmoothieMenuComponent]
    });
    fixture = TestBed.createComponent(SmoothieMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
