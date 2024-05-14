import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkTeaMenuComponent } from './milk-tea-menu.component';

describe('MilkTeaMenuComponent', () => {
  let component: MilkTeaMenuComponent;
  let fixture: ComponentFixture<MilkTeaMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MilkTeaMenuComponent]
    });
    fixture = TestBed.createComponent(MilkTeaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
