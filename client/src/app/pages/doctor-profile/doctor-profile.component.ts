import { Component, OnInit } from '@angular/core';
import { FAKE_DOCTOR_DATA } from 'src/app/mocks/doctorMock';
import { DoctorGetProfile, DoctorCreateRequest } from 'src/app/model/doctor';
import { ProfileService } from '../service/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit{
  doctorDataForm: FormGroup;
  doctorData: DoctorGetProfile;
  doctorProfilePost: DoctorCreateRequest;
  userString: string;

  constructor(private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog){}

  ngOnInit(): void {
    this.userString = localStorage.getItem("user_id") ?? "600";
    this.doctorDataForm = this.formBuilder.group({
      user_id: [this.userString],
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

    this.profileService.getDoctorProfile(parseInt(this.userString))
    .subscribe((response) => {
      this.doctorData = response
      this.setFormData();
  });
  }

  setFormData(){
      this.doctorDataForm = this.formBuilder.group({
        first_name: [this.doctorData.first_name],
        last_name: [this.doctorData.last_name],
        address: [this.doctorData.address],
        dob: [this.calculateDate(this.doctorData.dob ?? 1000000)],
        age: [this.doctorData.age],
        email_id: [this.doctorData.email_id],
        gender: [this.doctorData.gender === 1 ? 'Female' : 'Male'],
        registration_date:[this.doctorData.registration_date],
        contact_no: [this.doctorData.contact_no],
        qualifications: [this.doctorData.qualifications],
        keywords: [this.doctorData.keywords]
    })
  

  }


  calculateDate(epochTime: number): string{
    const date = new Date(epochTime * 1000); // Convert to milliseconds
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
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
    this.profileService.createDoctorProfile(FAKE_DOCTOR_DATA)  
    .subscribe( 
      response => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: "Doctor is updated" }
        });
        this.profileService.getDoctorProfile(parseInt(this.userString))
        .subscribe((response) => {
          this.doctorData = response
          this.setFormData();
      });
            
         },
      error =>{
        console.log(error);
      }
      
     );
  }
  

}

