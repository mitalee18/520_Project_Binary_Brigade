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

      // this.representatives = [
      //     { name: 'Amy Elsner', image: 'amyelsner.png' },
      //     { name: 'Anna Fali', image: 'annafali.png' },
      //     { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      //     { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      //     { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      //     { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      //     { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      //     { name: 'Onyama Limba', image: 'onyamalimba.png' },
      //     { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      //     { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
      // ];

      // this.statuses = [
      //     { label: 'Unqualified', value: 'unqualified' },
      //     { label: 'Qualified', value: 'qualified' },
      //     { label: 'New', value: 'new' },
      //     { label: 'Negotiation', value: 'negotiation' },
      //     { label: 'Renewal', value: 'renewal' },
      //     { label: 'Proposal', value: 'proposal' }
      // ];
  }

  clear(table: Table) {
      table.clear();
  }

  // getSeverity(status: string) {
  //     switch (status.toLowerCase()) {
  //         case 'unqualified':
  //             return 'danger';

  //         case 'qualified':
  //             return 'success';

  //         case 'new':
  //             return 'info';

  //         case 'negotiation':
  //             return 'warning';

  //         case 'renewal':
  //             return null;
  //     }
  //   }

  openDoctorAppointments(doctorId: number): void{
    this.router.navigate(['/doctor-appointments', doctorId]);
  }
}
