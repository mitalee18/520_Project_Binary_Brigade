import os, sys
sys.path.append(os.path.dirname(__file__))

from flask import request, current_app
import database_handler as database
from model.models import User, LoginDetails
import json

def default():
    return "SUCCESS"

def fetch():
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
    return all_users


def add():
    data = json.loads(request.data.decode())
    print(data['name'])
    name = data['name']
    email = data['email']
    active = data['active']
    database.add_instance(User, name=name, email=email, active=active)
    return 1