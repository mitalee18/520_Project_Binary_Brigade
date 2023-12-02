import requests

BASE = "http://127.0.0.1:8000/"

data = {
    "name": "John",
    "email": "jonjh@example1.com",
    "active": 1
}

# Send a POST request with the JSON data

response = requests.post(BASE + "user/add", json=data)
print(response.json())