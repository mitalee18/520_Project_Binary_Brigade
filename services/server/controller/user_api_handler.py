import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json

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


    def add():
        data = json.loads(request.data.decode())
        name = data['name']
        email = data['email']
        active = data['active']
        database.add_instance(User, name=name, email=email, active=active)
        return 1





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