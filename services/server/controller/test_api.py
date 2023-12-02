import requests

BASE = "http://127.0.0.1:8000/"

data = {
    "user_id": 54,
    "email_id": "jonjh@example1.com",
    "password": "167wt32ue#k",
    "last_login_date": 1699518409
}

# Send a POST request with the JSON data

response = requests.post(BASE + "add_login", json=data)
print(response.json())