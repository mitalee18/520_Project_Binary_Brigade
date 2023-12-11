import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json
import time
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import (create_access_token)

class UserApiHandler:
    def default():
        print("default")
        return "SUCCESS"

    def fetch():
        users = database.get_all(User)
        all_users = []
        for user in users:
            new_cat = {
                "name": user.name,
                "email": user.email,
                "active": user.active,
            }

            all_users.append(new_cat)
        return all_users

    def add(user_id):
        data = json.loads(request.data.decode())
        email_id = data['email_id']
        password = pbkdf2_sha256.hash(data['password'])
        current_time = int(time.time())
        database.add_instance(LoginDetails, user_id = user_id, password=password, email_id=email_id, last_login_date=current_time)
        query_response = database.query(LoginDetails, email_id)
        response = {
            "email": query_response.email_id,
            "user_id": query_response.user_id
        }
        return response

    def login():
        data = json.loads(request.data.decode())
        email_id = data['email_id']
        password = data['password']

        if email_id and password:
            query_response = database.query(LoginDetails, email_id)
            password_db = query_response.password
            if pbkdf2_sha256.verify(password, password_db):
                access_token = create_access_token(identity=query_response.email_id)
                return {"access_token": access_token, "message": "success", "status": 200}
            return {"message": "Invalid Password", "status": 400}
        return {"message": "Invalid email id or password", "status": 400}





# class patientApiHandler:
#     def default():
#         print("default")
#         return "SUCCESS"
    
#     def fetch():
#         patients = database.get_all(Patient)
#         all_patients = []
#         for user in patients:
#             patient = {
#                 "user_id": user.user_id,
#                 "email_id": user.email_id,
#                 "password": user.password,
#                 "last_login_date": user.last_login_date
#             }

#             all_patients.append(patient)
#         return all_patients
    
    