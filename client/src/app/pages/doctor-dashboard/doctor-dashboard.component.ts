import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointmentInfo';
import { CurrentPatients } from 'src/app/model/currentPatients';
import { FAKE_APPOINTMENT_DATA } from 'src/app/mocks/appointmentMock';
import {FAKE_CURRENT_PATIENTS_DATA} from 'src/app/mocks/currentPatientMock';

/**
 * Angular component for displaying the doctor's dashboard.
 * Manages the display of appointment information and current patients.
 */
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit{
  appointmentInfo!: Appointment[];
  currentPatients!: CurrentPatients[];

  /**
   * Lifecycle hook called after the component is initialized.
   * Initializes appointmentInfo and currentPatients with mock data.
   */

  ngOnInit(): void {
    // this.productService.getProductsSmall().then((cars) => (this.products = cars));
    this.appointmentInfo = FAKE_APPOINTMENT_DATA;
    this.currentPatients = FAKE_CURRENT_PATIENTS_DATA;
  }


}
