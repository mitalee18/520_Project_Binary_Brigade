import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ProfilecreationComponent } from './pages/profilecreation/profilecreation.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { CardModule } from 'primeng/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { OrderListModule } from 'primeng/orderlist';
import { DoctorProfileComponent } from './pages/doctor-profile/doctor-profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InputTextModule } from 'primeng/inputtext';
import {MatRadioModule} from '@angular/material/radio';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    PagenotfoundComponent,
    ProfilecreationComponent,
    DoctorDashboardComponent,
    DoctorProfileComponent,
    PatientDashboardComponent,
    PatientProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    MatToolbarModule,
    MatButtonModule,
    NavBarComponent,
    OrderListModule,
    MatFormFieldModule,
    InputTextModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
