import { Component } from '@angular/core';
import { GetAllDoctor } from 'src/app/model/doctor';
import { DoctorService } from '../service/doctor.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

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

  constructor(private doctorService: DoctorService,
    private router: Router) {}

  ngOnInit() {
      this.doctorService.getAllDoctors()
      .subscribe((doctors) => {
          this.doctors = doctors;
          this.loading = false;
          console.log(this.doctors)
      });
  }

  clear(table: Table) {
      table.clear();
  }


  openDoctorAppointments(doctorId: number): void{
    this.router.navigate(['/doctor-appointment', doctorId]);
  }
}
