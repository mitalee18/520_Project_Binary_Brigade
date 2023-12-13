import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json
import time
import datetime
import helper_functions as hf

class PatientApiHandler:
    def default(self):
        print("default")
        return "SUCCESS"


    def add_patient(self, data):
        print('add_patient:: start')
        user_id = data['user_id']
        first_name = data['first_name']
        last_name = data['last_name']
        email_id = data['email_id']
        contact_no = data['contact_no']
        address = data['address']
        age = data['age']
        emergency_contact = data['emergency_contact']
        dob = data['dob']
        health_insurance = data['health_insurance']
        gender = data['gender']
        update_date = int(datetime.datetime.utcnow().strftime('%s'))
        print('add_patient:: inserting to db')
        database.edit_instance(Patient, user_id = user_id, first_name=first_name, last_name=last_name,
                              email_id=email_id, contact_no=contact_no,
                              emergency_contact=emergency_contact,
                              address=address, age=age, dob=dob, health_insurance=health_insurance,
                              gender=gender, update_date=update_date)
        print('add_patient:: inserted to db')
        print('add_patient:: end')
        return 1

    def get_patient(self, user_id):
        print('get_patient:: start')
        patient = database.query_by_user_id(Patient, user_id)
        emergency_contact = hf.convert_dict_to_list_of_json(patient.emergency_contact)
        patient_details = {
            "user_id": patient.user_id,
            "first_name": patient.first_name,
            "last_name": patient.last_name,
            "email_id": patient.email_id,
            "contact_no": patient.contact_no,
            "address": patient.address,
            "age": patient.age,
            "emergency_contact": emergency_contact,
            "dob": patient.dob,
            "gender": 'Male' if patient.gender==0 else 'Female',
            "registration_date": patient.registration_date,
            "update_date": patient.update_date,
            "health_insurance": patient.health_insurance
        }
        print('get_patient:: end')
        return patient_details

    def delete_patient(self, user_id):
        print('delete_patient:: start')
        database.delete_instance_by_user_id(Patient, user_id)
        print('delete_patient:: end')
        return 1
    def get_patient_user_id(self, email_id):
        print('get_patient_user_id:: start')
        patient = database.query(Patient, email_id)
        print('get_patient_user_id:: end')
        return patient.user_id

    def add_patient_medical_history(self, data):
        print('add_patient_medical_history:: start')
        user_id = data['user_id']
        allergies = data['allergies']
        medical_conditions = data['medical_conditions']
        prescribed_medication = data['prescribed_medication']
        surgical_history = data['surgical_history']
        family_medical_history = data['family_medical_history']
        update_date = int(datetime.datetime.utcnow().strftime('%s'))
        print('add_patient_medical_history:: inserting to db')
        database.add_instance(PatientMedicalHistory, user_id=user_id, allergies=allergies, medical_conditions=medical_conditions,
                              prescribed_medication=prescribed_medication, surgical_history=surgical_history,
                              family_medical_history=family_medical_history, update_date=update_date)
        print('add_patient_medical_history:: inserted to db')
        print('add_patient_medical_history:: end')
        return 1
    # Dummy payload for testing
    # patient_medical_payload = {'user_id': '30030', 'allergies': 'peanuts,sesame',
    #                            'medical_conditions': 'hypertension, arithiritis',
    #                            'prescribed_medication': "[{'acetaminophen': '500mg'}]",
    #                            'surgical_history': "[{'1604188800': ['Dr. Smith', 'Appendix Removal']}]",
    #                            'family_medical_history': 'Has a case of diabetes'}

    def get_patient_medical_history(self, user_id):
        print('get_patient_medical_history:: start')
        patient_medical_history = database.query_by_user_id(PatientMedicalHistory, user_id)
        allergies = hf.convert_comma_seperated_string_to_list(patient_medical_history.allergies)
        medical_conditions = hf.convert_comma_seperated_string_to_list(patient_medical_history.medical_conditions)
        prescribed_medication = hf.convert_string_of_list_of_json_to_list_of_json(patient_medical_history.prescribed_medication)
        surgical_history = hf.convert_string_of_list_of_json_to_list_of_json(patient_medical_history.surgical_history)
        patient_medical_history_details = {
            "user_id": patient_medical_history.user_id,
            "allergies": patient_medical_history.allergies,
            "medical_conditions": patient_medical_history.medical_conditions,
            "prescribed_medication": prescribed_medication,
            "surgical_history": surgical_history,
            "family_medical_history": patient_medical_history.family_medical_history,
            "update_date": patient_medical_history.update_date
        }
        print('get_patient_medical_history:: end')
        return patient_medical_history_details

    def delete_patient_medical_history(self, user_id):
        print('delete_patient_medical_history:: start')
        try:
            database.delete_instance_by_user_id(PatientMedicalHistory, user_id)
        except Exception as e:
            raise e
        print('delete_patient_medical_history:: end')
        return 1

    def add_patient_document(self, data):
        print('add_patient_document:: start')
        try:
            # get the documents from the payload
            print(data['documents'], type(data['documents']))
            documents = hf.convert_string_of_list_of_json_to_list_of_json(data['documents'])
            print(documents)
            for document in documents:
                print(document)
                user_id = document['user_id']
                file_link = document['file_link']
                file_name = document['file_name']
                description = document['description']
                update_date = int(datetime.datetime.utcnow().strftime('%s'))
                print('add_patient_document:: inserting to db')
                database.add_instance(PatientDocument, user_id=user_id, file_link=file_link,
                                      file_name=file_name, description=description, update_date=update_date)
                print('add_patient_document:: inserted to db')
            print('add_patient_document:: end')
        except Exception as e:
            raise e
        return 1
    # Dummy payload for testing
    # patient_document_payload = {"documents" : "[{'file_id': '30030', 'file_link': 'http://dummyimage.com/image1.pdf','file_name': 'image1.pdf','description': 'A pdf file for testing', 'user_id': 30030}]"}

    def get_patient_document(self, user_id):
        print('get_patient_document:: start')
        patient_document = database.query_multiple_by_user_id(PatientDocument, user_id)
        patient_document_details = []
        for document in patient_document:
            patient_document_details.append({
                "user_id": document.user_id,
                "file_link": document.file_link,
                "file_id": document.file_id,
                "file_name": document.file_name,
                "description": document.description,
                "update_date": document.update_date
            })
        print('get_patient_document:: end')
        return patient_document_details

    def delete_patient_document(self, user_id):
        print('delete_patient_document:: start')
        database.delete_instance_by_user_id(PatientDocument, user_id)
        print('delete_patient_document:: end')
        return 1
    
    def signup(self):
        data = json.loads(request.data.decode())
        email_id = data["email_id"]
        update_date = int(time.time())

        database.add_instance(Patient, email_id=email_id, update_date=update_date, first_name=None, last_name=None,
                              contact_no=None, address=None, age=None, dob=None, gender=None, user_id=None,
                              emergency_contact='{}', health_insurance=None)

        query_response = database.query(Patient, email_id)
        print(query_response)
        return query_response

    def create_profile(self):
        print('create_profile:: start')
        data = json.loads(request.data.decode())
        # Add to patient table
        self.add_patient(data)
        try:
            # Add to patient medical history table
            self.add_patient_medical_history(data)
            if data['documents'] is not None:
                try:
                    # Add to patient document table
                    self.add_patient_document(data)
                except Exception as e:
                    # rollback patient medical history table
                    self.delete_patient_medical_history(data['user_id'])
                    raise e
        except Exception as e:
            # rollback patient table
            self.delete_patient(data['user_id'])
            raise e
        print('create_profile:: end')
        return 1

    # Dummy payload for testing
    # {'user_id': '30030', 'first_name': 'Sahima', 'last_name': 'Srivastava', 'email_id': 'temp@gmail.com',
    #  'contact_no': '999999', 'address': 'djkb vf..jgnf', 'age': 18,
    #  'emergency_contact': {'name': 'Mitalee', 'contact_no': '9999', 'email_id': 'temp@yahoo.com'}, 'dob': 1644531028,
    #  'health_insurance': 87456321, 'gender': 0, 'user_type': 0, 'allergies': 'peanuts,sesame',
    #  'medical_conditions': 'hypertension, arithiritis', 'prescribed_medication': "[{'medicine_name': 'acetaminophen', 'medicine_dosage': '500mg'}]",
    #  'surgical_history': "[{'surgery_date': 1604188800, 'doctor_name': 'Dr. Smith', 'surgery_name': 'Appendix Removal'}]",
    #  'family_medical_history': 'Has a case of diabetes', 'file_link': 'http://dummyimage.com/image1.pdf',
    #  'file_name': 'image1.pdf', 'description': 'A pdf file for testing'}

    def get_profile(self, user_id):
        print('get_profile:: start')
        patient_details = self.get_patient(user_id)
        print(type(patient_details['emergency_contact']))
        patient_medical_history_details = self.get_patient_medical_history(user_id)
        print(type(patient_medical_history_details['prescribed_medication']))
        patient_document_details = self.get_patient_document(user_id)
        print('get_profile:: end')
        return patient_details | patient_medical_history_details | {'documents': patient_document_details}

