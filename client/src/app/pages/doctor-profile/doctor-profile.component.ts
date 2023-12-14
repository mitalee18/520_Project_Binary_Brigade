import { Component, OnInit } from '@angular/core';
import { FAKE_DOCTOR_DATA } from 'src/app/mocks/doctorMock';
import { DoctorGetProfile } from 'src/app/model/doctor';
import { ProfileService } from '../service/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit{
  doctorDataForm: FormGroup;
  doctorData: DoctorGetProfile;

  constructor(private profileService: ProfileService,
    private formBuilder: FormBuilder){}

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

    const userString = localStorage.getItem("user_id") ?? "600";
    this.profileService.getDoctorProfile(parseInt(userString))
    .subscribe((response) => {
      this.doctorData = response
      this.setFormData();
  });
  }

  setFormData(){
      console.log(this.doctorData);
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



  onSubmitbtnClick():void{

  }
}
