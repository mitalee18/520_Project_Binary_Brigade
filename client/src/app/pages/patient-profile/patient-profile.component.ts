import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { FAKE_PATIENT_DATA } from 'src/app/mocks/patientMock';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  patientData: Patient;


  ngOnInit(): void {
    this.patientData = FAKE_PATIENT_DATA;
  }


  onSubmit(data:any):void{
    console.log("form data",data);

  }

}
