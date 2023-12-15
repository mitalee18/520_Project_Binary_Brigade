import { Component, ViewEncapsulation } from '@angular/core';
import {  Router } from '@angular/router';
import { SessionService } from '../service/session.service';
import { OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Login } from '../../model/login';
import { FormGroup } from '@angular/forms';
import { Signup } from '../../model/signup';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';



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
    private sessionService: SessionService,
    private dialog: MatDialog,
 
  ){}


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

  private showErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage }
    });
  }

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
                console.error('API error:', error);
                this.showErrorDialog('Failed to sign up. ' + (error.error.message || 'Please try again later.'));
              }
          );
  }

  }
  get f() { return this.loginForm.controls; }

  onLogin(userLogin: NgForm){
    const val = userLogin.value;
    console.log(val);
    if (val.email && val.password) {
        this.sessionService.login(val.email, val.password)
            .subscribe( 
             response => {
                if(val.user_type === 0){
                  this.router.navigateByUrl('/patient-dashboard');
                }
                else if(val.user_type === 1){
                  this.router.navigateByUrl('/doctor-dashboard');
                }
                localStorage.setItem('user_type', String(val.user_type));
                localStorage.setItem('email_id', val.email);
                localStorage.setItem('user_id', String(response.user_id));
             },
             error => {
              console.error('API error:', error);
              this.showErrorDialog('Failed to sign up. ' + (error.error.message || 'Please try again later.'));
             }
            );
    }
  }
}
