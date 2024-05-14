import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewComponent } from './manager-view.component';

describe('ManagerViewComponent', () => {
  let component: ManagerViewComponent;
  let fixture: ComponentFixture<ManagerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerViewComponent]
    });
    fixture = TestBed.createComponent(ManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
