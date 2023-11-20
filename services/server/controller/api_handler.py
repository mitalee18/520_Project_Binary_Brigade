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
    # print(data['name'])
    name = data['user_id']
    email = data['email_id']
    password = data['password']
    last_login_date = data['last_login_date']
    database.add_instance(LoginDetails, name=name, email=email, password=password, last_login_date=last_login_date)
    print("inside api_handler.py add_login")
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