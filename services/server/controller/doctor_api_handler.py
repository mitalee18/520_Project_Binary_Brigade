import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json
import time
import datetime
import helper_functions as hf

class DoctorApiHandler:
    def default():
        print("default")
        return "SUCCESS"

    def add_doctor(self, data):
        print('add_doctor:: start')
        user_id = data['user_id']
        first_name = data['first_name']
        last_name = data['last_name']
        email_id = data['email_id']
        contact_no = data['contact_no']
        address = data['address']
        age = data['age']
        dob = data['dob']
        gender = data['gender']
        update_date = int(datetime.datetime.utcnow().strftime('%s'))
        qualifications = data['qualifications']
        keywords = data['keywords']
        print('add_doctor:: inserting to db')
        database.edit_instance(Doctor, user_id=user_id, first_name=first_name, last_name=last_name,
                              email_id=email_id, contact_no=contact_no,
                              address=address, age=age, dob=dob,
                              gender=gender, update_date=update_date,
                              qualifications=qualifications, keywords=keywords)
        print('add_doctor:: inserted to db')
        print('add_doctor:: end')
        return 1

    def get_doctor(self, user_id):
        print('get_doctor:: start')
        doctor = database.query_by_user_id(Doctor, user_id)
        qualifications = hf.convert_comma_seperated_string_to_list(doctor.qualifications)
        keywords = hf.convert_comma_seperated_string_to_list(doctor.keywords)

        doctor_details = {
            "user_id": doctor.user_id,
            "first_name": doctor.first_name,
            "last_name": doctor.last_name,
            "email_id": doctor.email_id,
            "contact_no": doctor.contact_no,
            "address": doctor.address,
            "age": doctor.age,
            "dob": doctor.dob,
            "gender": doctor.gender,
            "registration_date": doctor.registration_date,
            "update_date": doctor.update_date,
            "qualifications": doctor.qualifications,
            "keywords": doctor.keywords
        }
        print('get_doctor:: end')
        return doctor_details

    def delete_doctor(self, user_id):
        print('delete_doctor:: start')
        database.delete_instance(Doctor, user_id)
        print('delete_doctor:: end')
        return 1


    def signup(self):
        data = json.loads(request.data.decode())
        email_id = data["email_id"]
        registration_date = int(time.time())

        database.add_instance(Doctor, email_id=email_id, update_date=registration_date,
                              first_name = None, last_name = None, contact_no = None,
                              address = None, age = None, dob = None, gender = None,
                              qualifications= None, keywords = None, user_id = None)
        query_response = database.query(Doctor,email_id)
        return query_response

    def create_profile(self):
        print('create_profile:: start')
        data = json.loads(request.data.decode())
        self.add_doctor(data)
        print('create_profile:: end')
        return 1

    # Dummy data for testing
    # {'user_id': 611, 'user_type': 1, 'first_name': 'Raj', 'last_name': 'Kumar', 'email_id': 'rk@gmail.com',
    #  'contact_no': '1234567890', 'address': 'Bangalore', 'age': 30, 'dob': 1683611126, 'gender': 0,
    #  'registration_date': 1683611126, 'update_date': 1683611126, 'qualifications': "MBBS, MD",
    #  'keywords': "ENT, General Physician"}

    def get_profile(self, user_id):
        print('get_profile:: start')
        doctor_details = self.get_doctor(user_id)
        print('get_profile:: end')
        return doctor_details

    def get_all_doctor(self):
        print('get_all_doctor:: start')
        doctor_db_list = database.get_all(Doctor)
        doctor_list = []
        for doctor in doctor_db_list:
            doctor_list.append({'user_id': doctor.user_id,
                                'first_name': doctor.first_name,
                                'last_name': doctor.last_name,
                                'email_id': doctor.email_id,
                                'qualifications': doctor.qualifications,
                                'keywords': doctor.keywords})
        print('get_all_doctor:: end')
        return doctor_list

    def edit_profile(self):
        print('edit_profile:: start')
        data = json.loads(request.data.decode())
        # Add to patient table
        self.add_doctor(data) # Edits all doctor table field
        print('edit_profile:: end')
        return 1