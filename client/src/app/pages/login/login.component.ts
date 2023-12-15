import { Component, ViewEncapsulation } from '@angular/core';
import {  Router } from '@angular/router';
import { SessionService } from '../service/session.service';
import { OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Login } from '../../model/login';
import { FormGroup } from '@angular/forms';
import { Signup } from '../../model/signup';

/**
 * Angular component for handling user authentication (login and signup).
 * Manages the user login and signup forms, user input validation, and navigation based on user type.
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginValues: Login;
  signupValues: Signup;
  loginForm: FormGroup;
  userFrom:FormGroup;
  user_type: string;
  userTypeOptions: string[] = ["Paitent", "Doctor"]

  /**
   * Constructor for LoginComponent.
   * @param router - Angular Router service for navigation.
   * @param formBuilder - Angular FormBuilder service for working with forms.
   * @param sessionService - Service for managing user sessions.
   */

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ){}

  /**
   * Lifecycle hook called after the component is initialized.
   * Initializes the login and user registration forms.
   */

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      userType:['']
    });
    this.userFrom = this.formBuilder.group({
      email: [''],
      password: [''],
      confirmPassword: [''],
      userType:['']
    });

  }
  /**
   * Event handler for user signup.
   * Calls the userSignup method of the SessionService to create a new user account.
   * Navigates to the appropriate profile creation page based on the user type.
   * @param userForm - NgForm object representing the user registration form.
   */

  onSignUp(userForm: NgForm){
    this.signupValues = userForm.value;
    if (this.signupValues.password === this.signupValues.confirm_password) {
      this.sessionService.userSignup( this.signupValues.email, this.signupValues.password, this.signupValues.user_type)
          .subscribe(
           response => {
                  console.log("User is signedup in");
                  console.log(response)
                  if(this.signupValues.user_type == 0){
                    this.router.navigateByUrl('/profilecreation');
                  }
                  else{
                    this.router.navigateByUrl('/doctor-profile-creation');
                  }

                  localStorage.setItem('user_id', String(response.user_id));
                  localStorage.setItem('user_type', String(this.signupValues.user_type));
                  localStorage.setItem('email_id', response.email);

              },
              error =>{
                console.log(error);
              }
          );
  }

  }

    /**
     * Getter for form controls in the login form.
     */

  get f() { return this.loginForm.controls; }

  /**
   * Event handler for user login.
   * Calls the login method of the SessionService to authenticate the user.
   * Navigates to the appropriate dashboard based on the user type.
   * @param userLogin - NgForm object representing the login form.
   */

  onLogin(userLogin: NgForm){
    const val = userLogin.value;
    console.log(val);
    if (val.email && val.password) {
        this.sessionService.login(val.email, val.password)
            .subscribe(
             (response) => {
                if(val.user_type === 0){
                  this.router.navigateByUrl('/patient-dashboard');
                }
                else if(val.user_type === 1){
                  this.router.navigateByUrl('/doctor-dashboard');
                }
                localStorage.setItem('user_type', String(val.user_type));
                localStorage.setItem('email_id', val.email);
                localStorage.setItem('user_id', String(response.user_id));
             }
            );
    }
  }
}
