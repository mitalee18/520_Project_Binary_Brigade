import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { UtilityService } from '../service/utility.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css'],
})
export class DoctorAppointmentComponent implements OnInit {
  doctorId: number;
  selectedDate: Date;
  availableTimeSlots: number[];
  availableTimeSlotsFormatted: string[];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private utilityService: UtilityService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selectedDate = new Date(); 
    this.route.params.subscribe((params) => {
      this.doctorId = +params['user_id'];
      this.fetchAvailableAppointments();
    });
  }

  fetchAvailableAppointments(): void {
    this.doctorService
      .getAvailableAppointments(this.doctorId)
      .subscribe((timeSlots) => {
        this.availableTimeSlots = timeSlots;
      });
  }

  filterTimeSlots(targetDate: Date, epochTimes: number[]): number[] {
    console.log(targetDate);
    const targetDateWithoutTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  
    return epochTimes.filter(epochTime => {
      const timeSlotDate = new Date(epochTime * 1000); // Convert epoch time to milliseconds
      const timeSlotDateWithoutTime = new Date(timeSlotDate.getFullYear(), timeSlotDate.getMonth(), timeSlotDate.getDate());
      return timeSlotDateWithoutTime.getTime() === targetDateWithoutTime.getTime();
    });
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    console.log("Selected Date",this.selectedDate);
    this.fetchAvailableAppointments();
    this.availableTimeSlotsFormatted = this.filterTimeSlots(date, this.availableTimeSlots).map((epoch) => 
          this.utilityService.epochToTime(epoch)
    );
  }

  openDialog(): void {
    const userId = localStorage.getItem('user_id'); // Retrieve user_id from session storage
    const doctorId = this.route.snapshot.paramMap.get('doctor_id'); // Retrieve doctor_id from the URL

    this.dialog.open(ConfirmDialogComponent, {
      data: { message: "Do you want to confirm ?" }
    });
  }
}