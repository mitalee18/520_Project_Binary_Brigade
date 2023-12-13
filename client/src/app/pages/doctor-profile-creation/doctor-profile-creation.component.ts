import { Component, OnInit } from '@angular/core';
import { DoctorCreateRequest } from 'src/app/model/doctor';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor-profile-creation',
  templateUrl: './doctor-profile-creation.component.html',
  styleUrls: ['./doctor-profile-creation.component.css']
})
export class DoctorProfileCreationComponent implements OnInit{
  doctorDataForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder){
  }


  ngOnInit(): void {
    this.doctorDataForm = this.formBuilder.group({
      user_id : [''],
      first_name: [''],
      last_name: [''],
      age: [''],
      address: [''],
      contact: [''],
      dob: [''],
      qualifications: [''],
      keywords : [''],
      gender: [''],
      email_id: [''],

    })
  }

  onSubmitbtnClick(){
    
  }
  

}
