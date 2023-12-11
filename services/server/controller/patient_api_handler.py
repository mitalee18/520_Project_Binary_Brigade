import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json
import time

class PatientApiHandler:
    def default():
        print("default")
        return "SUCCESS"

    def fetch():
        patients_db = database.get_all(Patient)
        patients = []
        for patient in patients_db:
            new_patient = {
                "user_id": patient.user_id,
                "first_name": patient.first_name,
                "last_name": patient.last_name,
                "email_id": patient.email_id,
                "contact_no": patient.contact_no,
                "address": patient.address,
                "age": patient.age,
#                 "emergency_contact": patient.emergency_contact,
                "dob": patient.dob.strftime("%Y-%m-%d"),  # Format date as string
                "gender": patient.gender,
                "registration_date": patient.registration_date,
                "update_date": patient.update_date
            }

            patients.append(new_patient)
        return patients

    def add():
        data = json.loads(request.data.decode())
        user_id = data['user_id']
        first_name = data['first_name']
        last_name = data['last_name']
        email_id = data['email_id']
        contact_no = data['contact_no']
        address = data['address']
        age = data['age']
#         emergency_contact = data['emergency_contact']
        dob = data['dob']
        gender = data['gender']
        registration_date = data['registration_date']
        update_date = data['update_date']

        database.add_instance(Patient, user_id=user_id, first_name=first_name, last_name=last_name,
                              email_id=email_id, contact_no=contact_no,
#                               emergency_contact=emergency_contact,
                              address=address, age=age, dob=dob,
                              gender=gender, registration_date=registration_date, update_date=update_date)
        return 1
    
    def signup():
        data = json.loads(request.data.decode())
        email_id = data["email_id"]
        registration_date = int(time.time())

        database.add_instance(Patient, email_id=email_id, registration_date=registration_date, update_date=registration_date, first_name = None, last_name = None, contact_no = None, address = None, age = None, dob = None, gender = None)
        query_response = database.query(Patient,email_id)
        print(query_response)
        return query_response
