import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request, current_app
import database_handler as database
from model.models import *
import json

def default():
    return "SUCCESS"

def fetch_login():
    users = database.get_all(LoginDetails)
    all_users = []
    for user in users:
        new_cat = {
            "user_id": user.user_id,
            "email_id": user.email_id,
            "password": user.password,
            "last_login_date": user.last_login_date
        }

        all_users.append(new_cat)
    print("inside api_handler.py fetch_login")
    return all_users


def add_login():
    data = json.loads(request.data.decode())
    print("data: ", data)
    user_id = data['user_id']
    email = data['email_id']
    password = data['password']
    last_login_date = data['last_login_date']
    database.add_instance(LoginDetails, user_id=user_id, email=email, password=password, last_login_date=last_login_date)
    print("inside api_handler.py add_login")
    
    return 1


def fetch_emergency_contact():
    emergency_contacts = database.get_all(EmergencyContact)
    all_emergency_contact = []
    for emergency_contact in emergency_contacts:
        new_cat = {
            "name": emergency_contact.name,
            "contact_no": emergency_contact.contact_no,
            "email": emergency_contact.email
        }

        all_emergency_contact.append(new_cat)
    print("inside api_handler.py fetch_emergency_contact")
    return all_emergency_contact


def add_emergency_contact():
    data = json.loads(request.data.decode())

    name = data['name']
    contact_no = data['contact_no']
    email = data['email']
    database.add_instance(EmergencyContact, name=name,contact_no=contact_no, email=email)
    print("inside api_handler.py add_emergency_contact")
    return 1

def fetch_patient():
    patients = database.get_all(Patient)
    all_patient = []
    for patient in patients:
        new_cat = {
            "user_id": patient.user_id,
            "first_name": patient.first_name,
            "last_name": patient.last_name,
            "email_id": patient.email_id,
            "contact_no": patient.contact_no,
            "address": patient.address,
            "age": patient.age,
            "dob": patient.dob,
            "emergency_contact": patient.emergency_contact,
            "gender": patient.gender,
            "registration_date": patient.registration_date,
            "update_date": patient.update_date
        }

        all_patient.append(new_cat)
    print("inside api_handler.py fetch_patient")
    return all_patient

def add_patient():
    data = json.loads(request.data.decode())

    user_id = data['user_id']
    first_name = data['first_name']
    last_name = data['last_name']
    email_id = data['email_id']
    contact_no = data['contact_no']
    address = data['address']
    age = data['age']
    dob = data['dob']
    emergency_contact = data['emergency_contact']
    gender = data['gender']
    registration_date = data['registration_date']
    update_date = data['update_date']
    database.add_instance(EmergencyContact, user_id=user_id,first_name=first_name, last_name=last_name, email_id=email_id
    , contact_no=contact_no, address=address, age=age, dob=dob, emergency_contact=emergency_contact, gender=gender, registration_date=registration_date
    , update_date=update_date
    )
    print("inside api_handler.py add_patient")
    return 1




# def fetch_patient(Patient):
#     users = database.get_all(Patient)
#     all_users = []
#     for user in users:
#         new_cat = {
#             "user_id": user.user_id,
#             "email_id": user.email_id,
#             "password": user.password,
#             "last_login_date": user.last_login_date
#         }

#         all_users.append(new_cat)
#     return all_users


