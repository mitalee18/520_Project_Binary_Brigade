import copy
import time
import random
from threading import Thread
import json
import requests
# from src.part1.client import request_loop

# =================== GLOBAL DEFINITIONS ===================
create_profile_base_url = 'http://localhost:8000/api/user/create-profile'
signup_base_url = 'http://localhost:8000/api/user/signup'
first_names = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'Daniel', 'Sophia', 'Christopher', 'Ava',
               'Matthew', 'Emma', 'David', 'Isabella', 'Andrew', 'Mia', 'Ethan', 'Amelia', 'James', 'Grace']
last_names = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
              'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez',
              'Robinson']


class Test:
    def __init__(self, n_threads, amp_time, shuffle_requests=True):
        self.n_threads = abs(n_threads or 1) # no of client threads
        self.amp_time = abs(amp_time + 0.000001) # time distribution across threads
        self.shuffle_requests = shuffle_requests
        pass

    # Create and start client threads
    def run(self):
        print("LOAD TEST RUNNING")
        print(f"Running {self.n_threads} threads in {self.amp_time} seconds")
        print(f"Request list length = 100")
        start = time.time()
        thread_list = []
        for i in range(self.n_threads):
            time.sleep(self.amp_time/self.n_threads)
            t = Thread(target=self.run_client, args=[i])
            thread_list.append(t)
            t.start()
        for t in thread_list:
            t.join()
        end = time.time()
        total_time = end - start
        request_count = self.n_threads * 100
        average_time_per_request = total_time/request_count
        print(f"Time taken = {total_time} seconds")
        print(f"Number of client threads = {self.n_threads}")
        print(f"Number of requests sent = {request_count}")
        print(f"Average processing time = {average_time_per_request}")
        print("DONE")

    # Makes two post calls: signup and create profile
    def run_client(self, thread_id):
        for _ in range(100):  # Execute 100 times
            start_time = time.time()
            send_signup_then_create_profile()
            end_time = time.time()
            with open(f'part1_output_{thread_id}.txt', 'a') as f:
                f.write(f'{end_time-start_time}\n')

def generate_random_contact_no():
    # Generate a random 10-digit contact number
    return ''.join(random.choices('0123456789', k=10))

def generate_random_address():
    # Generate a random address
    street_number = random.randint(100, 999)
    street_name = random.choice(['Main', 'Oak', 'Maple', 'Cedar', 'Elm'])
    city = random.choice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'])
    return f'{street_number} {street_name} Street, {city}'

def generate_random_email(first_name):
    # Generate a random email address using the first name
    username = ''.join(random.choices(first_name.lower(), k=8))
    domain = random.choice(['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'])
    return f'{username}_{first_name.lower()}@{domain}'

def generate_random_age():
    return random.randint(18, 100)

def generate_random_allergies():
    allergies = ['pollen', 'nuts', 'shellfish', 'dairy', 'soy', 'eggs', 'wheat']
    return ','.join(random.sample(allergies, random.randint(1, 3)))

def generate_random_dob(age):
    return int(1577816800)

def generate_random_documents(user_id):
    descriptions = ['X-ray result', 'Blood test result', 'MRI result']
    file_names = ['xray.png', 'bloodtest.pdf', 'mri.jpg']
    documents = [{
        'description': random.choice(descriptions),
        'file_link': f'http://dummyimage.com/{random.choice(file_names)}',
        'file_name': random.choice(file_names),
        'update_date': int(time.time()),
        'user_id': user_id
    }]
    return json.dumps(documents)

def generate_random_emergency_contact():
    names = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer']
    return {
        'contact_no': generate_random_contact_no(),
        'email_id': generate_random_email(random.choice(names)),
        'name': random.choice(names)
    }

def generate_random_family_medical_history():
    conditions = ['diabetes', 'hypertension', 'asthma', 'heart disease']
    return random.choice(conditions)

def generate_random_gender():
    return random.randint(0, 1)  # Assuming 0 for male, 1 for female

def generate_random_health_insurance():
    return random.randint(10000000, 99999999)

def generate_random_medical_conditions():
    conditions = ['hypertension', 'diabetes', 'asthma', 'arthritis']
    return ','.join(random.sample(conditions, random.randint(1, 2)))

def generate_random_prescribed_medication():
    medications = [
        {'medicine_name': 'acetaminophen', 'medicine_dosage': '500mg'},
        {'medicine_name': 'ibuprofen', 'medicine_dosage': '200mg'}
    ]
    return json.dumps(random.sample(medications, 1))

def generate_random_registration_date():
    return int(time.time())

def generate_random_surgical_history():
    surgeries = [
        {'doctor_name': 'Dr. Smith', 'surgery_date': 1604188800, 'surgery_name': 'Appendix Removal'},
        {'doctor_name': 'Dr. Doe', 'surgery_date': 1583020800, 'surgery_name': 'Gallbladder Removal'}
    ]
    return json.dumps(random.sample(surgeries, 1))

def generate_random_update_date():
    return int(time.time())

def generate_random_user_id():
    return random.randint(30000, 40000)

def generate_random_user_type():
    # return random.randint(0, 1)  # Assuming 0 for patient, 1 for doctor
    return 0

def generate_random_payload_create_profile(user_id, user_type, first_name, last_name, email_id):
    age = generate_random_age()
    return {
        "address": generate_random_address(),
        "age": age,
        "allergies": generate_random_allergies(),
        "contact_no": generate_random_contact_no(),
        "dob": generate_random_dob(age),
        "documents": generate_random_documents(user_id),
        "email_id": email_id,
        "emergency_contact": generate_random_emergency_contact(),
        "family_medical_history": generate_random_family_medical_history(),
        "first_name": first_name,
        "gender": generate_random_gender(),
        "health_insurance": generate_random_health_insurance(),
        "last_name": last_name,
        "medical_conditions": generate_random_medical_conditions(),
        "prescribed_medication": generate_random_prescribed_medication(),
        "registration_date": generate_random_registration_date(),
        "surgical_history": generate_random_surgical_history(),
        "update_date": generate_random_update_date(),
        "user_id": user_id,
        "user_type": user_type  # Use the user_type from the POST request
    }

def generate_random_payload_signup():
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    email_id = generate_random_email(first_name)
    user_type = generate_random_user_type()
    return {
        "payload" : {
            "email_id": email_id,
            "password": 'abc',
            "user_type": user_type
            },
        "first_name": first_name,
        "last_name": last_name
    }

def send_signup_then_create_profile():
    # Generate random payload for signup
    signup_payload = generate_random_payload_signup()
    # print('signup -> payload created')
    signup_response = requests.post(signup_base_url, json=signup_payload['payload'])
    if signup_response.status_code == 200:
        user_id = signup_response.json().get('user_id')
        user_type = signup_payload['payload']['user_type']  # Extract user_type from the original payload
        first_name = signup_payload['first_name']
        last_name = signup_payload['last_name']
        email_id = signup_payload['payload']['email_id']
        # Generate random payload using the obtained user_id and user_type
        create_profile_payload = generate_random_payload_create_profile(user_id, user_type, first_name, last_name, email_id)
        # print(create_profile_payload)
        # print('create profile -> payload created')
        create_profile_response = requests.post(create_profile_base_url, json=create_profile_payload)
        print(create_profile_response.text)
    else:
        print("Error in signup:", signup_response.text)

if __name__ == "__main__":
    send_signup_then_create_profile()
    send_signup_then_create_profile()
    send_signup_then_create_profile()
    # Create test object with desired parameters
    test = Test(n_threads=10, amp_time=0.00001)
    test.run()
