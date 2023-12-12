import { Injectable } from '@angular/core';
import { apiEndPoints } from './constants/apiEndPoints';
import { HttpClient } from '@angular/common/http';
import { Doctor } from 'src/app/model/doctor';
import { Patient } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  createDoctor: Doctor;
  getDoctor: Doctor;
  createPatient:Patient;
  getPatient: Patient;
  constructor(private http: HttpClient) { }

  createPatientProfile(){
    return this.http.post<Patient>(`${apiEndPoints.patientApi}/createPatientProfile`, this.createPatient);
  }

  createDoctorProfile(){
    return this.http.post<Doctor>(`${apiEndPoints.doctorApi}/createDoctorProfile`, this.createDoctor);
  }

  getPatientProfile(){
    return this.http.get<Patient>(`${apiEndPoints.patientApi}/getPatientProfile`);
  }

  getDoctorProfile(){
    return this.http.get<Patient>(`${apiEndPoints.doctorApi}/getDoctorProfile`);
  }
}
