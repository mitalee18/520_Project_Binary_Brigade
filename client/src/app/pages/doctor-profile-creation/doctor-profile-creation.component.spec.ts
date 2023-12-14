import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfileCreationComponent } from './doctor-profile-creation.component';

describe('DoctorProfileCreationComponent', () => {
  let component: DoctorProfileCreationComponent;
  let fixture: ComponentFixture<DoctorProfileCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorProfileCreationComponent]
    });
    fixture = TestBed.createComponent(DoctorProfileCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
