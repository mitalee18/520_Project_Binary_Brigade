import { Component, OnInit } from '@angular/core';
import { FAKE_DOCTOR_DATA } from 'src/app/mocks/doctorMock';
import { Doctor } from 'src/app/model/doctor';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit{

  doctorData: Doctor;


  ngOnInit(): void {
    this.doctorData = FAKE_DOCTOR_DATA;
  }


  onSubmit(data:any):void{
    console.log("form data",data);

  }
}
