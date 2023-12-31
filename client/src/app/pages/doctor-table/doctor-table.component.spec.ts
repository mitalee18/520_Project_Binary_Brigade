import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTableComponent } from './doctor-table.component';

describe('DoctorTableComponent', () => {
  let component: DoctorTableComponent;
  let fixture: ComponentFixture<DoctorTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorTableComponent]
    });
    fixture = TestBed.createComponent(DoctorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
