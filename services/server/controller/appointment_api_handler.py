import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json
from datetime import datetime, timedelta


class AppointmentApiHandler:
    def default():
        print("default")
        return "SUCCESS"

    def fetch():
        appointment_db = database.get_all(Appointments)
        appointment_details = []
        for appointment in appointment_db:
            new_appointment = {
                "appointment_id": appointment.appointment_id,
                "patient_id": appointment.patient_id,
                "doctor_id": appointment.doctor_id,
                "datetime": appointment.datetime
            }

            appointment_details.append(new_appointment)
        return appointment_details
    
    def add():
        data = json.loads(request.data.decode())
        appointment_id = data['appointment_id']
        patient_id = data['patient_id']
        doctor_id = data['doctor_id']
        datetime = data['datetime']
        database.add_instance(Appointments, appointment_id=appointment_id, patient_id=patient_id, doctor_id=doctor_id, datetime=datetime)
        return 1

    def get_booked_time(self, doctor_id):
        print('get_booked_time:: start')
        doctor_appointments = database.query_multiple_by_id(Appointments, 'doctor_id', doctor_id)
        booked_time = []
        for appointment in doctor_appointments:
            booked_time.append(appointment.datetime)
        print(len(booked_time))
        print('get_booked_time:: end')
        return booked_time

    def get_available_time(self, user_id):
        print('get_available_time:: start')
        doctor_id = user_id
        # Get all booked time slots
        booked_time = self.get_booked_time(doctor_id)
        # Get all available time slots
        start_time = datetime(2023, 11, 1, 8, 0, 0)
        end_time = datetime(2023, 11, 17, 17, 0, 0)
        interval = timedelta(hours=1)
        current_time = start_time
        available_time = []
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
        return available_time

