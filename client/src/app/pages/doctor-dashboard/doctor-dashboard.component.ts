import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointmentInfo';
import { CurrentPatients } from 'src/app/model/currentPatients';
import { FAKE_APPOINTMENT_DATA } from 'src/app/mocks/appointmentMock';
import {FAKE_CURRENT_PATIENTS_DATA} from 'src/app/mocks/currentPatientMock';
import { ProfileService } from '../service/profile.service';
import { DoctorGetProfile } from 'src/app/model/doctor';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit{
  appointmentInfo!: Appointment[];
  currentPatients!: CurrentPatients[];
  doctorData: DoctorGetProfile;
  userString: string;

  constructor(private profileService:ProfileService){}

  ngOnInit(): void {
    this.userString = localStorage.getItem("user_id") ?? "600";
    this.appointmentInfo = FAKE_APPOINTMENT_DATA;
    this.currentPatients = FAKE_CURRENT_PATIENTS_DATA;

    this.profileService.getDoctorProfile(parseInt(this.userString))
    .subscribe((response) => {
      this.doctorData = response
  });


  }

  
}
