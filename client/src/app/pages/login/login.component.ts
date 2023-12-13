import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { SessionService } from '../service/session.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Login } from '../../model/login';
import { FormGroup } from '@angular/forms';
import { Signup } from '../../model/signup';



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
  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ){}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    this.userFrom = this.formBuilder.group({
      email: [''],
      password: [''],
      confirmPassword: [''],
      userType:['']
    });

  }

  onSignUp(userForm: NgForm){
    this.signupValues = userForm.value;
    console.log(this.signupValues);
    if (this.signupValues.password === this.signupValues.confirm_password) {
      this.sessionService.userSignup( this.signupValues.email, this.signupValues.password, this.signupValues.user_type)
          .subscribe( 
           (response) => {
                  console.log("User is logged in");
                  console.log(response)
                  if(this.signupValues.user_type == 0){
                    localStorage.setItem('user_type', String(this.signupValues.user_type));
                    localStorage.setItem('email', response.email);
                    this.router.navigateByUrl('/profilecreation');
                  }
                 
              }
          );
  }

  }
  get f() { return this.loginForm.controls; }

  onLogin(userLogin: NgForm){
    const val = userLogin.value;
    if (val.email && val.password) {
        this.sessionService.login(val.email, val.password)
            .subscribe( 
             () => {
                    console.log("User is logged in");
                    this.router.navigateByUrl('/');
                }
            );
    }
  }
}
