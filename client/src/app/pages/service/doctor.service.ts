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
}
