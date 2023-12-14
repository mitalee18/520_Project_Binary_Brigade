import { Component, OnInit } from '@angular/core';
import { DoctorCreateRequest } from 'src/app/model/doctor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile-creation',
  templateUrl: './doctor-profile-creation.component.html',
  styleUrls: ['./doctor-profile-creation.component.css']
})
export class DoctorProfileCreationComponent implements OnInit{
  doctorDataForm: FormGroup;
  doctorData: DoctorCreateRequest;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private route: Router){
  }


  ngOnInit(): void {
    this.doctorDataForm = this.formBuilder.group({
      user_id : [localStorage.getItem('user_id')],
      first_name: [''],
      last_name: [''],
      age: [''],
      address: [''],
      contact_no: [''],
      dob: [''],
      qualifications: [''],
      keywords : [''],
      gender: [''],
      email_id: [localStorage.getItem('email_id')],
      user_type:[1]

    })
  }

  dateStringToEpoch(dateString: string): number {
    console.log(dateString);
      if (dateString.length !== 0) {
        // Return the epoch time in milliseconds
        return  Math.floor(new Date(dateString).getTime() / 1000);
      }
      const currentEpochTimeInSeconds = Math.floor(new Date().getTime() / 1000);
      return currentEpochTimeInSeconds;
  }

  calculateAge(dateString: string): number {
    const birthdate = new Date(dateString);
    console.log(birthdate)

    // Calculate the current date
    const currentDate = new Date();

    // Calculate the age in milliseconds
    const ageInMilliseconds = currentDate.getTime() - birthdate.getTime();

    // Convert the age to years
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // Round down to the nearest whole year
    const roundedAge = Math.floor(ageInYears);

    return roundedAge
  }

  getGender(gender: string): number{
    if(gender === "Female"){
      return 1;
    }
    return 0;
  }

  onSubmitbtnClick(){
    this.doctorData = this.doctorDataForm.value;
    this.doctorData.dob = this.dateStringToEpoch(this.doctorDataForm.value.dob);
    this.doctorData.age = this.calculateAge(this.doctorDataForm.value.dob);
    this.doctorData.gender = this.getGender(this.doctorDataForm.value.gender)
    this.profileService.createDoctorProfile(this.doctorData)
    .subscribe( 
      response => {
             console.log("User is created in Doctor");
             this.route.navigateByUrl('/')
            
         },
      error =>{
        console.log(error);
      }
      
     );
  }
  

}
