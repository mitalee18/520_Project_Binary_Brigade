import { Injectable } from '@angular/core';
import { apiEndPoints } from './constants/apiEndPoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { LoginResponse } from '../../model/loginResponse';
import { Signup, SignupResponse} from 'src/app/model/signup';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  sessionInfo: LoginResponse;
  constructor(private http: HttpClient) { }

  userSignup(email: string, password: string, user_type: number){
    console.log(user_type)
    const post = {
      "email_id":email,
      "password":password,
      "user_type":user_type
    }
    return this.http.post<SignupResponse>(`${apiEndPoints.userApi}/signup`, post);
  }     

  /**
   * 
   * @param email user's email
   * @param password user's password
   * @returns returns response 
   */
  login(email: string, password: string){
      const post = {
        "email_id":email,
        "password":password
      }
    return this.http.post<LoginResponse>(`${apiEndPoints.userApi}/login`, post)
            .pipe(tap(res =>this.setSession(res)));
  }

  /**
   * 
   * @param sessionInfo for setting JWT token
   */
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

  /**
   * 
   * @returns True if the token has not expired else logs user out and returns False
   */
  public isLoggedIn() {
      const currentDate = new Date();
      const timestamp: number = currentDate.getTime();
      const oldTime: number = this.getExpiration();
      if (oldTime > timestamp){
        return true
      }
      this.logout();
      return false;
  }
  /**
   * 
   * @returns checks if users is logged in
   */

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  /**
   * @returns returns token's expiry time
   */

  getExpiration() {
      const expiresAt = JSON.parse(localStorage.getItem("expires_at") || '{}');
      return expiresAt;
  }    
}
