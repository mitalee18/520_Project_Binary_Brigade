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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import {MatButtonModule} from '@angular/material/button';
import { OrderListModule } from 'primeng/orderlist';
import { DoctorProfileComponent } from './pages/doctor-profile/doctor-profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InputTextModule } from 'primeng/inputtext';
import {MatRadioModule} from '@angular/material/radio';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { DoctorProfileCreationComponent } from './pages/doctor-profile-creation/doctor-profile-creation.component';
import { DoctorTableComponent } from './pages/doctor-table/doctor-table.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DoctorAppointmentComponent } from './pages/doctor-appointment/doctor-appointment.component';
import {ImageModule} from 'primeng/image';


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
    PatientProfileComponent,
    DoctorProfileCreationComponent,
    DoctorTableComponent,
    DoctorAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    CardModule,
    DividerModule,
    ConfirmDialogModule,
    MatButtonModule,
    NavBarComponent,
    OrderListModule,
    MatFormFieldModule,
    MatRadioModule,
    TableModule,
    MultiSelectModule,
    ImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

