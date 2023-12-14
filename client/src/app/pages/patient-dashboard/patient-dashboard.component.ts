import { Component, OnInit } from '@angular/core';
import { GetPatientSchedule } from 'src/app/model/patient';
import { PatientSchedule } from 'src/app/model/patient';
import { FAKE_PATIENT_APPOINTMENT_DATA } from 'src/app/mocks/patientMock';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  schedule!: GetPatientSchedule[];
  scheduleData: PatientSchedule[] = [];

  constructor() {
    // Initialize the schedule with FAKE_PATIENT_APPOINTMENT_DATA
    this.schedule = FAKE_PATIENT_APPOINTMENT_DATA;
    // Call the update function immediately to format the dates
    this.updateDateTime();
    // Set an interval to update regularly
    setInterval(() => this.updateDateTime(), 60000); // Update every minute
  }

  ngOnInit(): void {
    // Recommended to do initial data loading here
    this.updateDateTime();
  }

  private formatDateTime(timestamp: number): string {
      const date = new Date(timestamp * 1000); // Convert UNIX timestamp to JavaScript Date object
      // Format the date and time in 'mm/dd/yyyy hh:mm AM/PM' format
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  }

  private updateDateTime(): void {
    // Map over this.schedule to create this.scheduleData with formatted dates
    this.scheduleData = this.schedule.map(appointment => ({
      appointment_id: appointment.appointment_id,
      datetime: this.formatDateTime(appointment.datetime),
      doctor_name: appointment.doctor_name
    }));
    // No need to check if it's an array since we're now sure it's initialized properly
  }

  cancelAppointment(appointment_id: number): void{
  }
}
