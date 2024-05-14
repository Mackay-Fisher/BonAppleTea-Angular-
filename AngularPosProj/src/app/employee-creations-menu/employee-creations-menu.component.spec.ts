import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreationsMenuComponent } from './employee-creations-menu.component';

describe('EmployeeCreationsMenuComponent', () => {
  let component: EmployeeCreationsMenuComponent;
  let fixture: ComponentFixture<EmployeeCreationsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCreationsMenuComponent]
    });
    fixture = TestBed.createComponent(EmployeeCreationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
