import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json
import time


class AdminApiHandler:
    def default():
        print("default")
        return "SUCCESS"


    def add_admin(self, data):
        print('add_admin:: start')
        user_id = data['user_id']
        first_name = data['first_name']
        last_name = data['last_name']
        email_id = data['email_id']
        contact_no = data['contact_no']
        address = data['address']
        print('add_admin:: inserting to db')
        database.add_instance(Admin, user_id=user_id, first_name=first_name, last_name=last_name,
                              email_id=email_id, contact_no=contact_no,
                              address=address)
        print('add_admin:: inserted to db')
        print('add_admin:: end')
        return 1

    def get_admin(self, user_id):
        print('get_admin:: start')
        admin = database.query_by_user_id(Admin, user_id)
        admin_details = {
            "user_id": admin.user_id,
            "first_name": admin.first_name,
            "last_name": admin.last_name,
            "email_id": admin.email_id,
            "contact_no": admin.contact_no,
            "address": admin.address,
            "registration_date": admin.registration_date
        }
        print('get_admin:: end')
        return admin_details


    def signup(self):
        data = json.loads(request.data.decode())
        email_id = data["email_id"]

        database.add_instance(Admin, email_id=email_id, first_name = None, last_name = None, contact_no = None, address = None)
        query_response = database.query(Admin,email_id)
        print(query_response)
        return query_response

    def create_profile(self):
        print("create_profile:: start")
        data = json.loads(request.data.decode())
        self.add_admin(data)
        print("create_profile:: end")
        return 1

    # Dummy payload for testing
    # {'user_id': 6,
    #  'user_type': 2,
    #  'first_name': 'Sachin',
    #  'last_name': 'Tendulkar',
    #  'email_id': 'st@yahoo.com',
    #  'contact_no': '1234567890',
    #  'address': '948 Mumbai'}

    def get_profile(self, user_id):
        print("get_profile:: start")
        admin_details = self.get_admin(user_id)
        print("get_profile:: end")
        return admin_details


