import { Injectable } from '@angular/core';
import { apiEndPoints } from './constants/apiEndPoints';
import { HttpClient } from '@angular/common/http';
import { GetAllDoctor } from 'src/app/model/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getAllDoctors(){
    return this.http.get<GetAllDoctor[]>(`${apiEndPoints.doctorApi}/get-all-doctor`);
  }

  getAvailableAppointments(user_id: number){
    const params = { user_id: user_id};
    return this.http.get<number[]>(`${apiEndPoints.doctorApi}/get-available-time`, {params: params});
  }

  bookAppointment(patient_id: number, doctor_id: number, datetime: number){
    const postData = {
      "patient_id" : patient_id,
      "doctor_id" : doctor_id,
      "datetime": datetime
    }
    return this.http.post<number[]>(`${apiEndPoints.doctorApi}/get-available-time`, postData);
  }
}
