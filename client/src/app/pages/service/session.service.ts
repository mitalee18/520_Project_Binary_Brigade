import { Injectable } from '@angular/core';
import { apiEndPoints } from './constants/apiEndPoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { LoginResponse } from '../../model/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  sessionInfo: LoginResponse;
  constructor(private http: HttpClient) { }

  userSignup(post: any): Observable<any[]>{
    return this.http.post<any[]>(`${apiEndPoints.userApi}/signup`, post);
  }     


  login(email: string, password: string){
      const post = {
        "email_id":email,
        "password":password
      }
    return this.http.post<LoginResponse>(`${apiEndPoints.userApi}/login`, post)
            .pipe(tap(res =>this.setSession(res)));
  }

  private setSession(sessionInfo: LoginResponse) {
      let  date = new Date()
      console.log('Session is set')
      localStorage.setItem('id_token', sessionInfo.access_token);
      localStorage.setItem("expires_at", JSON.stringify(date.getTime() + (60 * 60 * 1000)));
    }     

    logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
      const currentDate = new Date();
      const timestamp: number = currentDate.getTime();
      const oldTime: number = this.getExpiration();
      if (oldTime > timestamp){
        return true
      }
      return false;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiresAt = JSON.parse(localStorage.getItem("expires_at") || '{}');
      return expiresAt;
  }    
}
