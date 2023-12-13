import { Injectable } from '@angular/core';
import { apiEndPoints } from './constants/apiEndPoints';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // createDoctor: Doctor;
  // getDoctor: Doctor;
  createPatient:Patient;
  getPatient: Patient;
  constructor(private http: HttpClient) { }

  createPatientProfile(){
    return this.http.post<Patient>(`${apiEndPoints.patientApi}/createPatientProfile`, this.createPatient);
  }


  // createDoctorProfile(){
  //   return this.http.post<Doctor>(`${apiEndPoints.doctorApi}/createDoctorProfile`, this.createDoctor);
  // }

  getPatientProfile(user_id: number){
    const params = { user: user_id , user_type: 0};
    return this.http.get<Patient>(`${apiEndPoints.userApi}/get-profile`, {params: params});
  }

  // getDoctorProfile(){
  //   return this.http.get<Patient>(`${apiEndPoints.doctorApi}/getDoctorProfile`);
  // }

}
