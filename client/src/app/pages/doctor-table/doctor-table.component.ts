import { Component } from '@angular/core';
import { GetAllDoctor } from 'src/app/model/doctor';
import { DoctorService } from '../service/doctor.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';


/**
 * Angular component for displaying a table of doctors.
 * Manages the retrieval and rendering of doctor information in a table.
 */

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  styleUrls: ['./doctor-table.component.css']
})
export class DoctorTableComponent {
  doctors!: GetAllDoctor[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  /**
   * Constructor for DoctorTableComponent.
   * @param doctorService - Service for fetching doctor information.
   * @param router - Angular Router service for navigation.
   */

  constructor(private doctorService: DoctorService,
    private router: Router) {}

  /**
   * Lifecycle hook called after the component is initialized.
   * Retrieves the list of all doctors when the component is initialized.
   */

  ngOnInit() {
      this.doctorService.getAllDoctors()
      .subscribe((doctors) => {
          this.doctors = doctors;
          this.loading = false;
          console.log(this.doctors)
      });
  }

  /**
   * Clears the data of the specified PrimeNG table.
   * @param table - Reference to the PrimeNG Table component to be cleared.
   */

  clear(table: Table) {
      table.clear();
  }

  /**
   * Navigates to the doctor's appointment page for the specified doctor.
   * @param doctorId - ID of the doctor for whom appointments are to be displayed.
   */
  openDoctorAppointments(doctorId: number): void{
    this.router.navigate(['/doctor-appointment', doctorId]);
  }
}
