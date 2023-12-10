import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json


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

