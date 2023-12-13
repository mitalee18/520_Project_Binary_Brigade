from flask_sqlalchemy import SQLAlchemy
import json
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password



class LoginDetails(db.Model):
    __tablename__ = "login_details"

    user_id = db.Column(db.Integer, primary_key=True)  #foreign key ???
    email_id = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    last_login_date = db.Column(db.Integer, nullable=False)

    def __init__(self, user_id, email_id, password, last_login_date):
        self.user_id = user_id
        self.email_id = email_id
        self.password = password
        self.last_login_date = last_login_date



class Patient(db.Model):
    __tablename__ = "patient"

    user_id = db.Column(db.Integer, db.Sequence('patient_seq_reg_id', start=30000, increment=1),primary_key=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    email_id = db.Column(db.String(128), unique=True, nullable=False)
    contact_no = db.Column(db.String(12), unique=True)
    address = db.Column(db.String(250))
    age = db.Column(db.Integer)  #can remove
    dob = db.Column(db.Integer)
    emergency_contact = db.Column(JSON, nullable=False)
    gender = db.Column(db.Integer) # Encode into int while inserting into db
    health_insurance = db.Column(db.Integer)
    registration_date = db.Column(db.Integer)
    update_date = db.Column(db.Integer)

    def __init__(self, user_id, first_name, last_name, email_id, contact_no, address, age, dob,
                 emergency_contact, gender, health_insurance, update_date):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.email_id = email_id
        self.contact_no = contact_no
        self.address = address
        self.age = age
        self.dob = dob
        self.emergency_contact = emergency_contact
        self.gender = gender
        self.health_insurance = health_insurance
        self.update_date = update_date

class PatientMedicalHistory(db.Model):
    __tablename__ = "patient_medical_history"

    allergies = db.Column(db.String)
    medical_conditions = db.Column(db.String)
    prescribed_medication =  db.Column(db.String)
    surgical_history = db.Column(db.String)
    family_medical_history = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('patient.user_id'), primary_key=True,nullable=False)
    update_date = db.Column(db.Integer, nullable=False)

    def __init__(self, allergies, medical_conditions, prescribed_medication,
                 surgical_history, family_medical_history, user_id, update_date):
        self.allergies = allergies
        self.medical_conditions = medical_conditions
        self.prescribed_medication = prescribed_medication
        self.surgical_history = surgical_history
        self.family_medical_history = family_medical_history
        self.user_id = user_id
        self.update_date = update_date

class PatientDocument(db.Model):
    __tablename__ = "patient_document"

    user_id = db.Column(db.Integer, db.ForeignKey('patient.user_id'), nullable=False)
    file_link = db.Column(db.String(255))
    file_id = db.Column(db.Integer, db.Sequence('file_seq_reg_id', start=21, increment=1), primary_key=True)
    file_name = db.Column(db.String(255))
    description = db.Column(db.String(255))
    update_date = db.Column(db.Integer, nullable=False)

    def __init__(self, user_id, file_link, file_name, description, update_date):
        self.user_id = user_id
        self.file_link = file_link
        self.file_name = file_name
        self.description = description
        self.update_date = update_date


class Doctor(db.Model):
    __tablename__ = "doctor"

    user_id = db.Column(db.Integer, db.Sequence('doctor_seq_reg_id', start=600, increment=1),primary_key=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    email_id = db.Column(db.String(128), unique=True, nullable=False)
    contact_no = db.Column(db.String(12))
    qualifications = db.Column(db.String(128)) # cane be list
    address = db.Column(db.String(250))
    registration_date = db.Column(db.Integer)
    update_date = db.Column(db.Integer, nullable=False)
    age = db.Column(db.Integer)  #can remove 
    dob = db.Column(db.Integer)
    gender = db.Column(db.Integer) # Encode into int while inserting into db
    keywords = db.Column(db.String(250))

    def __init__(self, user_id, first_name,  last_name, email_id, contact_no, qualifications, address,
                 age, dob, gender, update_date, keywords):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.email_id = email_id
        self.address = address
        self.qualifications = qualifications
        self.age = age
        self.dob = dob
        self.update_date = update_date
        self.contact_no = contact_no
        self.gender = gender
        self.keywords = keywords




class Admin(db.Model):
    __tablename__ = "admin"

    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    email_id = db.Column(db.String(128), unique=True, nullable=False)
    contact_no = db.Column(db.String(15))
    address = db.Column(db.String(250))
    registration_date = db.Column(db.Integer)

    def __init__(self, first_name,  last_name, email_id, contact_no, address, registration_date):
        self.first_name = first_name
        self.last_name = last_name
        self.email_id = email_id
        self.address = address
        self.contact_no = contact_no
        self.registration_date = registration_date
        

class Appointments(db.Model):
    __tablename__ = "appointments"

    appointment_id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.user_id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.user_id'), nullable=False)
    datetime = db.Column(db.Integer, nullable=False)

    def __init__(self, appointment_id, patient_id,  doctor_id, datetime):
        self.appointment_id = appointment_id
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.datetime = datetime

