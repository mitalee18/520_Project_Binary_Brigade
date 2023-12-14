import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json
from datetime import datetime, timedelta


class AppointmentApiHandler:
    def add_appointment(self):
        data = json.loads(request.data.decode())
        patient_id = data['patient_id']
        doctor_id = data['doctor_id']
        datetime = data['datetime']
        database.add_instance(Appointments, patient_id=patient_id, doctor_id=doctor_id, datetime=datetime)
        return 1

    def if_doctor_exists(self, doctor_id):
        result = database.query_multiple_by_user_id(Doctor, doctor_id)
        if len(result) > 0:
            return 1
        else:
            return 0

    def if_patient_exists(self, patient_id):
        result = database.query_multiple_by_user_id(Patient, patient_id)
        if len(result) > 0:
            return 1
        else:
            return 0

    def get_doctor_booked_time(self, doctor_id):
        print('get_doctor_booked_time:: start')
        doctor_appointments = database.query_multiple_by_id(Appointments, 'doctor_id', doctor_id)
        booked_time = []
        for appointment in doctor_appointments:
            booked_time.append({'appointment_id': appointment.appointment_id, 'datetime': appointment.datetime})
        print(len(booked_time))
        print('get_doctor_booked_time:: end')
        return booked_time

    def get_patient_booked_time(self, patient_id):
        print('get_patient_booked_time:: start')
        patient_appointments = database.query_multiple_by_id(Appointments, 'patient_id', patient_id)
        booked_time = []
        for appointment in patient_appointments:
            booked_time.append({'appointment_id': appointment.appointment_id, 'datetime': appointment.datetime})
        print(len(booked_time))
        print('get_patient_booked_time:: end')
        return booked_time

    def get_available_time(self, user_id):
        print('get_available_time:: start')
        doctor_id = user_id
        doctor_found_flag = self.if_doctor_exists(doctor_id)
        # Get all available time slots
        start_time = datetime(2023, 11, 1, 8, 0, 0)
        end_time = datetime(2023, 11, 17, 17, 0, 0)
        interval = timedelta(hours=1)
        current_time = start_time
        available_time = []
        if doctor_found_flag == 1:
            # Get all booked time slots
            booked_time_json = self.get_doctor_booked_time(doctor_id)
            booked_time = [ele['datetime'] for ele in booked_time_json]
            # Iterate over all time slots and add to available_time if not booked
            while current_time < end_time:
                current_epoch_time = int(current_time.timestamp())
                if current_epoch_time not in booked_time:
                    available_time.append(current_epoch_time)
                else:
                    print('hit hit hit')
                current_time += interval
            print(len(available_time))
        print('get_available_time:: end')
        return {'available_time': available_time,
                'doctor_found_flag': doctor_found_flag}

    def book_appointment(self):
        print('book_appointment:: start')
        ret_val = 1
        data = json.loads(request.data.decode())
        patient_id = data['patient_id']
        doctor_id = data['doctor_id']
        datetime = data['datetime']
        patient_found_flag = self.if_patient_exists(patient_id)
        doctor_found_flag = self.if_doctor_exists(doctor_id)
        if patient_found_flag == 1 and doctor_found_flag == 1:
            # Get all bookings for the doctor
            doctor_bookings_json = self.get_doctor_booked_time(doctor_id)
            doctor_bookings = [ele['datetime'] for ele in doctor_bookings_json]
            # Get all bookings for the patient
            patient_bookings_json = self.get_patient_booked_time(patient_id)
            patient_bookings = [ele['datetime'] for ele in patient_bookings_json]
            # Check if the doctor is available
            if datetime not in doctor_bookings:
                # Check if the patient is available
                if datetime not in patient_bookings:
                    # Book appointment
                    self.add_appointment()
                else:
                    ret_val = 0
            else:
                ret_val = 0
        print('book_appointment:: end')
        return {'ret_val': ret_val,
                'patient_found_flag': patient_found_flag,
                'doctor_found_flag': doctor_found_flag}

    def get_patient_schedule(self, user_id):
        print('get_patient_schedule:: start')
        patient_id = user_id
        patient_found_flag = self.if_patient_exists(patient_id)
        patient_schedule = self.get_patient_booked_time(patient_id)
        print('get_patient_schedule:: end')
        return {'patient_schedule': patient_schedule,
                'patient_found_flag': patient_found_flag}
