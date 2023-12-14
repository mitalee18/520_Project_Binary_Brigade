import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component'
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ProfilecreationComponent } from './pages/profilecreation/profilecreation.component';
import { DoctorProfileComponent } from './pages/doctor-profile/doctor-profile.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { DoctorProfileCreationComponent } from './pages/doctor-profile-creation/doctor-profile-creation.component';
import { DoctorTableComponent } from './pages/doctor-table/doctor-table.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'doctor-dashboard',
    component: DoctorDashboardComponent

  },
  {
    path: 'doctor-profile',
    component: DoctorProfileComponent
  },
  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent

  },
  {
    path: 'patient-profile',
    component: PatientProfileComponent
  },
  {
    path: 'doctor-profile',
    component: DoctorProfileComponent
  },
  {
    path: 'doctor-profile-creation',
    component: DoctorProfileCreationComponent
  },
  {
    path: 'doctor-table',
    component: DoctorTableComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'layout',
    component: LayoutComponent
  },
  {
    path:'layout',
    component:LayoutComponent,
  },
  {
    path: 'profilecreation',
    component: ProfilecreationComponent
  },
  {
    path:'**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }