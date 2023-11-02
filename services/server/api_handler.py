from flask import request, current_app
import database_handler as database
from models import User
import json

def default():
    return "SUCCESS"

def fetch():
    users = database.get_all(User)
    all_users = []
    for user in users:
        new_cat = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "active": user.active
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