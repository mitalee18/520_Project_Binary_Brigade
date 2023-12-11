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
    
    def fetch():
        admin_db = database.get_all(Admin)
        admin_details = []
        for admin in admin_db:
            new_admin = {
                "user_id": admin.user_id,
                "first_name": admin.first_name,
                "last_name": admin.last_name,
                "email_id": admin.email_id,
                "contact_no": admin.contact_no,
                "address": admin.address
            }

            admin_details.append(new_admin)
        return admin_details
    
    def add():
        data = json.loads(request.data.decode())
        user_id = data['user_id']
        first_name = data['first_name']
        last_name = data['last_name']
        email_id = data['email_id']
        contact_no = data['contact_no']
        address = data['address']
        database.add_instance(Admin, user_id=user_id, first_name=first_name, last_name=last_name, 
                              email_id=email_id, contact_no=contact_no, address=address)
        return 1

    def signup():
        data = json.loads(request.data.decode())
        email_id = data["email_id"]

        database.add_instance(Admin, email_id=email_id, first_name = None, last_name = None, contact_no = None, address = None)
        query_response = database.query(Admin,email_id)
        print(query_response)
        return query_response


