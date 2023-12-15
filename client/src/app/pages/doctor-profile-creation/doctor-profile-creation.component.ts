import { Component, OnInit } from '@angular/core';
import { DoctorCreateRequest } from 'src/app/model/doctor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { Router } from '@angular/router';

/**
 * Angular component for creating a doctor's profile.
 * Manages the form for inputting and submitting doctor profile information.
 */

@Component({
  selector: 'app-doctor-profile-creation',
  templateUrl: './doctor-profile-creation.component.html',
  styleUrls: ['./doctor-profile-creation.component.css']
})
export class DoctorProfileCreationComponent implements OnInit{
  doctorDataForm: FormGroup;
  doctorData: DoctorCreateRequest;

  /**
   * Constructor for DoctorProfileCreationComponent.
   * @param formBuilder - Angular FormBuilder service for working with forms.
   * @param profileService - Service for creating doctor profiles.
   * @param route - Angular Router service for navigation.
   */

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private route: Router){
  }

  /**
   * Lifecycle hook called after the component is initialized.
   * Initializes the doctorDataForm with default values.
   */

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

  /**
   * Converts a date string to epoch time.
   * @param dateString - String representation of a date.
   * @returns Epoch time in seconds.
   */

  dateStringToEpoch(dateString: string): number {
    console.log(dateString);
      if (dateString.length !== 0) {
        // Return the epoch time in milliseconds
        return  Math.floor(new Date(dateString).getTime() / 1000);
      }
      const currentEpochTimeInSeconds = Math.floor(new Date().getTime() / 1000);
      return currentEpochTimeInSeconds;
  }

  /**
   * Calculates the age based on the provided date of birth.
   * @param dateString - String representation of a date of birth.
   * @returns Age in years.
   */

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

    /**
     * Gets the numerical representation of the gender.
     * @param gender - String representation of gender ('Male' or 'Female').
     * @returns 1 for 'Female', 0 for 'Male'.
     */

  getGender(gender: string): number{
    if(gender === "Female"){
      return 1;
    }
    return 0;
  }

  /**
   * Event handler for the form submission button click.
   * Captures form data, converts and processes it, and creates a doctor profile.
   */

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
