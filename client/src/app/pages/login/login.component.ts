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
  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ){}


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',],
      password: ['']
    });

  }

  // onSignUp(userForm: NgForm){
  //   this.signupValues = userForm.value;
  //   console.log(this.signupValues);
  //   for (const key in this.signupValues)
  //   {
  //     const indexedItem = this.signupValues[key];
  //     console.log(indexedItem);
  //   }

  // }
  get f() { return this.loginForm.controls; }

  onLogin(userLogin: NgForm){
    const val = userLogin.value;
    console.log(userLogin.value);
    console.log(val.email);
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
