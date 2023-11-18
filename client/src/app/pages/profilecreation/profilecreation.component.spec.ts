import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecreationComponent } from './profilecreation.component';

describe('ProfilecreationComponent', () => {
  let component: ProfilecreationComponent;
  let fixture: ComponentFixture<ProfilecreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilecreationComponent]
    });
    fixture = TestBed.createComponent(ProfilecreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
