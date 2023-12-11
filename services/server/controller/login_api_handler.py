import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request
import database_handler as database
from model.models import *
import json


class LoginApiHandler:
    def default():
        print("default")
        return "SUCCESS"
    
    def fetch():
        login_db = database.get_all(LoginDetails)
        login_details = []
        for login in login_db:
            new_login = {
                "user_id": login.user_id,
                "email_id": login.email_id,
                "password": login.password,
                "last_login_date": login.last_login_date
            }

            login_details.append(new_login)
        return login_details
    
    def add():
        data = json.loads(request.data.decode())
        user_id = data['user_id']
        email_id = data['email_id']
        password = data['password']
        last_login_date = data['last_login_date']
        database.add_instance(LoginDetails, user_id=user_id, email_id=email_id, password=password, last_login_date=last_login_date)
        return 1

