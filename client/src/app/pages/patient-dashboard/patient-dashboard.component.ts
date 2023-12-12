import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointmentInfo';
import { CurrentPatients } from 'src/app/model/currentPatients';
import { FAKE_APPOINTMENT_DATA } from 'src/app/mocks/appointmentMock';
import { FAKE_CURRENT_PATIENTS_DATA} from 'src/app/mocks/currentPatientMock';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit{
  appointmentInfo!: Appointment[];
  currentPatients!: CurrentPatients[];

  ngOnInit(): void {
    // this.productService.getProductsSmall().then((cars) => (this.products = cars));
    this.appointmentInfo = FAKE_APPOINTMENT_DATA;
    this.currentPatients = FAKE_CURRENT_PATIENTS_DATA;
  }

}
