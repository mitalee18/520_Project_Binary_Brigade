import requests
from flask import Blueprint, jsonify, request

BASE = "http://127.0.0.1:8000/"

# data = {
#     "name": "John",
#     "email": "jonjh@example1.com",
#     "active": 1,
#     "user_type":0
# }

data = {
  "email_id": "string",
  "password": "password2",
  "user_type": 0,
  "first_name": "patient2",
  "last_name": "string",
  "user_id": 2,
  "address": "string",
  "contact_no": "1234",
  "dob": "string",
  "gender": 0,
  "qualifications": "string",
  "keywords": 0,
  "last_login_date": 0
}

# Send a POST request with the JSON data

# response = requests.post(BASE + "user/add", json=data)
# print(response.json())
response = requests.post(BASE + "api/user/create-profile", json=data)
# print(request.args.get('user_type'))

