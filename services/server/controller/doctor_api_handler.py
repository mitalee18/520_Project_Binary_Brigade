import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json

class DoctorApiHandler:
    def default():
        print("default")
        return "SUCCESS"

    def fetch():
        doctor_db = database.get_all(Doctor)
        doctors = []
        for doctor in doctor_db:
            new_doctor = {
                "user_id": doctor.user_id,
                "first_name": doctor.first_name,
                "last_name": doctor.last_name,
                "email_id": doctor.email_id,
                "contact_no": doctor.contact_no,
                "address": doctor.address,
                "age": doctor.age,
                "dob": doctor.dob.strftime("%Y-%m-%d"),  # Format date as string
                "gender": doctor.gender,
                "registration_date": doctor.registration_date,
                "update_date": doctor.update_date,
                "qualifications": doctor.qualifications
            }

            doctors.append(new_doctor)
        return doctors

    def add():
        data = json.loads(request.data.decode())
        user_id = data['user_id']
        first_name = data['first_name']
        last_name = data['last_name']
        email_id = data['email_id']
        contact_no = data['contact_no']
        address = data['address']
        age = data['age']
        dob = data['dob']
        gender = data['gender']
        registration_date = data['registration_date']
        update_date = data['update_date']
        qualifications = data['qualifications']

        print("inside add method doctor", print(user_id, contact_no))

        database.add_instance(Doctor, user_id=user_id, first_name=first_name, last_name=last_name,
                              email_id=email_id, contact_no=contact_no,
                              address=address, age=age, dob=dob,
                              gender=gender, registration_date=registration_date, update_date=update_date, qualifications=qualifications)
        return 1
