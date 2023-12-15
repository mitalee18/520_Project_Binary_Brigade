import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { UtilityService } from '../service/utility.service';

/**
 * Component for handling doctor appointments.
 * Displays available time slots for a specific doctor on a chosen date.
 */
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

/**
 * Constructor for DoctorAppointmentComponent.
 * @param route - The activated route, which provides access to the route parameters.
 * @param doctorService - Service for fetching doctor-related information.
 * @param utilityService - Service for utility functions.
 */

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private utilityService: UtilityService
  ) {}

/**
 * Lifecycle hook called after the component is initialized.
 * Initializes the selected date and fetches available appointments.
 */

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.route.params.subscribe((params) => {
      this.doctorId = +params['user_id'];
      this.fetchAvailableAppointments();
    });
  }

/**
 * Fetches available appointments for the current doctor and updates the availableTimeSlots array.
 */

  fetchAvailableAppointments(): void {
    this.doctorService
      .getAvailableAppointments(this.doctorId)
      .subscribe((timeSlots) => {
        this.availableTimeSlots = timeSlots;
      });
  }

  /**
   * Filters the available time slots based on the selected date.
   * @param targetDate - The date for which time slots are to be filtered.
   * @param epochTimes - Array of time slots in epoch format.
   * @returns Array of time slots for the specified date.
   */

  filterTimeSlots(targetDate: Date, epochTimes: number[]): number[] {
    console.log(targetDate);
    const targetDateWithoutTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

    return epochTimes.filter(epochTime => {
      const timeSlotDate = new Date(epochTime * 1000); // Convert epoch time to milliseconds
      const timeSlotDateWithoutTime = new Date(timeSlotDate.getFullYear(), timeSlotDate.getMonth(), timeSlotDate.getDate());
      return timeSlotDateWithoutTime.getTime() === targetDateWithoutTime.getTime();
    });
  }

  /**
   * Event handler for date selection.
   * Updates the selected date, fetches available appointments, and formats available time slots.
   * @param date - The selected date.
   */

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    console.log("Selected Date",this.selectedDate);
    this.fetchAvailableAppointments();
    this.availableTimeSlotsFormatted = this.filterTimeSlots(date, this.availableTimeSlots).map((epoch) =>
          this.utilityService.epochToTime(epoch)
    );
  }

  /**
   * Event handler for time slot selection.
   * Retrieves user and doctor IDs from session storage and URL parameters.
   * @param timeSlot - The selected time slot.
   */

  onTimeSlotSelected(timeSlot: string): void {
    const userId = localStorage.getItem('user_id'); // Retrieve user_id from session storage
    const doctorId = this.route.snapshot.paramMap.get('doctor_id'); // Retrieve doctor_id from the URL
  }
}
