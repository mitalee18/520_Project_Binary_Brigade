import { Injectable } from '@angular/core';
import { apiEndPoints } from './constants/apiEndPoints';
import { HttpClient } from '@angular/common/http';
import { Patient, CreatePatientRequest } from 'src/app/model/patient';
import { DoctorCreateRequest, DoctorGetProfile } from 'src/app/model/doctor';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  createDoctor: DoctorCreateRequest;
  getDoctor: DoctorGetProfile;
  createPatient:Patient;
  getPatient: Patient;
  constructor(private http: HttpClient) { }

  createPatientProfile(postRequestData: CreatePatientRequest){
    return this.http.post<CreatePatientRequest>(`${apiEndPoints.userApi}/create-profile`, postRequestData);
  }


  createDoctorProfile(postRequestData: DoctorCreateRequest){
    console.log(postRequestData)
    return this.http.post<DoctorGetProfile>(`${apiEndPoints.userApi}/create-profile`, postRequestData);
  }

  getPatientProfile(user_id: number){
    const params = { user_id: user_id , user_type: 0};
    return this.http.get<Patient>(`${apiEndPoints.userApi}/get-profile`, {params: params});
  }

  getDoctorProfile(user_id: number){
    const params = { user_id: user_id , user_type: 1};
    return this.http.get<DoctorGetProfile>(`${apiEndPoints.userApi}/get-profile`,{params: params});
  }

}
