import requests
from app import logger

global_user_id = 0
global_email_id = ""

def test_signup():
    print('================== Starting Test for Signup ==================')

    signup_base_url = 'http://localhost:8000/api/user/signup'
    signup_payload = {"email_id": "mitalee8@patient.com",
                      "password": "abc",
                      "user_type": 0
                      }
    try:
        # test 1: patient
        response = requests.post(signup_base_url, json=signup_payload)
        # print(response.json())
        assert response.status_code == 200
        assert response.json()['email'] == signup_payload['email_id']
        assert response.json()['user_id'] > 30000
        global global_user_id, global_email_id
        global_user_id = response.json()['user_id']
        global_email_id = signup_payload['email_id']
        print('______________ Test #1 Passed ______________')
        # test 2: patient already exists
        response = requests.post(signup_base_url, json=signup_payload)
        assert response.json()['status'] == 500
        assert response.json()['error']['message'] == 'User already exists.'
        print('______________ Test #2 Passed ______________')
        # test 3: patient id with different email
        signup_payload["email_id"] = "mitalee3@patient.com"
        # print(signup_payload)
        response = requests.post(signup_base_url, json=signup_payload)
        # print(response.json())
        assert response.status_code == 200
        assert response.json()['email'] == signup_payload['email_id']
        assert response.json()['user_id'] == global_user_id + 1
        print('______________ Test #3 Passed ______________')
    except AssertionError as e:
        print(e)
        print('================== Test for Signup Failed ==================')
    return

def test_create_profile():
    print('================== Starting Test for create-profile ==================')
    create_profile_base_url = 'http://localhost:8000/api/user/create-profile'
    patient_payload = {'user_id': global_user_id,
                       'first_name': 'Sahima',
                       'last_name': 'Srivastava',
                       'email_id': global_email_id,
                       'contact_no': '999999',
                       'address': 'djkb vf..jgnf',
                       'age': 18,
                       'emergency_contact': {'name': 'Mitalee', 'contact_no': '9999', 'email_id': 'temp@yahoo.com'},
                       'dob': 1644531028,
                       'health_insurance': 87456321,
                       'gender': 0,
                       'user_type': 0,
                       'allergies': 'peanuts,sesame',
                       'medical_conditions': 'hypertension, arithiritis',
                       'prescribed_medication': "[{'medicine_name': 'acetaminophen', 'medicine_dosage': '500mg'}]",
                       'surgical_history': "[{'surgery_date': 1604188800, 'doctor_name': 'Dr. Smith', 'surgery_name': 'Appendix Removal'}]",
                       'family_medical_history': 'Has a case of diabetes',
                       "documents" : "[{'file_link': 'http://dummyimage.com/image1.pdf','file_name': 'image1.pdf','description': 'A pdf file for testing', 'user_id': "+str(global_user_id)+"}]"}
    doctor_payload = {'user_id': 800,
                      'user_type': 1,
                      'first_name': 'Raj',
                      'last_name': 'Kumar',
                      'email_id': 'rk@gmail.com',
                      'contact_no': '1234567890',
                      'address': 'Bangalore',
                      'age': 30,
                      'dob': 1683611126,
                      'gender': 0,
                      'registration_date': 1683611126,
                      'update_date': 1683611126,
                      'qualifications': 'MBBS, MD',
                      'keywords': 'ENT, General Physician'}
    try:
        # test 1: create signed up patient profile
        response = requests.post(create_profile_base_url, json=patient_payload)
        assert response.status_code == 200
        assert response.json() == 1
        print('______________ Test #1 Passed ______________')
        # test 2: create a non-signed up doctor profile
        response = requests.post(create_profile_base_url, json=doctor_payload)
        assert response.json()['status'] == 500
        assert response.json()['error']['message'] == 'Internal Server Error: Profile creation unsuccessful.'
        print('______________ Test #2 Passed ______________')
        # test 3: creating a profile for a patient who already has a profile
        response = requests.post(create_profile_base_url, json=patient_payload)
        assert response.json()['status'] == 500
        assert response.json()['error']['message'] == 'Internal Server Error: Profile creation unsuccessful.'
        print('______________ Test #3 Passed ______________')
    except AssertionError as e:
        print(e)
        print('================== Test for create-profile Failed ==================')
    return

def test_get_profile():
    print('================== Starting Test for get-profile ==================')
    get_profile_base_url = 'http://localhost:8000/api/user/get-profile'
    get_profile_url = get_profile_base_url + '?user_id=' + str(global_user_id) + '&user_type=0'
    try:
        # test 1: get profile of a patient
        response = requests.get(get_profile_url)
        # print(response.json())
        assert response.status_code == 200
        assert response.json()['user_id'] == global_user_id
        assert response.json()['email_id'] == global_email_id
        print('______________ Test #1 Passed ______________')
        # test 2: get profile of a doctor
        get_profile_url = get_profile_base_url + '?user_id=800&user_type=0'
        response = requests.get(get_profile_url)
        assert response.json()['status'] == 500
        assert response.json()['error']['message'] == 'Internal Server Error: Profile could not be found.'
        print('______________ Test #2 Passed ______________')
        # test 3: get profile with correct id but incorrect user type
        get_profile_url = get_profile_base_url + '?user_id=' + str(global_user_id) + '&user_type=1'
        response = requests.get(get_profile_url)
        assert response.json()['status'] == 500
        assert response.json()['error']['message'] == 'Internal Server Error: Profile could not be found.'
        print('______________ Test #3 Passed ______________')
    except AssertionError as e:
        print(e)
        print('================== Test for get-profile Failed ==================')
    return

def test_get_all_doctors():
    print('================== Starting Test for get-all-doctor ==================')
    get_all_doctors_base_url = 'http://localhost:8000/api/doctor/get-all-doctor'
    try:
        # test 1: get all doctors
        response = requests.get(get_all_doctors_base_url)
        # print(response.json())
        assert response.status_code == 200
        assert len(response.json()[0]) > 0
        print('______________ Test #1 Passed ______________')
    except AssertionError as e:
        print(e)
        print('================== Test for get-all-doctors Failed ==================')
    return

def test_get_patient_schedule():
    print('================== Starting Test for get-patient-schedule ==================')
    get_patient_schedule_base_url = 'http://localhost:8000/api/patient/get-patient-schedule?user_id='
    get_patient_schedule_url = get_patient_schedule_base_url + str(30002)
    try:
        # test 1: get patient schedule
        response = requests.get(get_patient_schedule_url)
        # print(response.json())
        assert response.status_code == 200
        assert len(response.json()) > 0
        assert len(response.json()[0].keys()) == 2
        print('______________ Test #1 Passed ______________')
        # test 2: get patient schedule with incorrect user id
        get_patient_schedule_url = get_patient_schedule_base_url + '100'
        response = requests.get(get_patient_schedule_url)
        assert response.json()['status'] == 400
        assert response.json()['error']['message'] == 'Bad Request: User does not exist.'
        print('______________ Test #2 Passed ______________')
    except AssertionError as e:
        print(e)
        print('================== Test for get-patient-schedule Failed ==================')
    return

def test_get_available_time():
    print('================== Starting Test for get-available-time ==================')
    get_available_time_base_url = 'http://localhost:8000/api/doctor/get-available-time?user_id='
    get_available_time_url = get_available_time_base_url + str(607)
    try:
        # test 1: get available time
        response = requests.get(get_available_time_url)
        assert response.status_code == 200
        assert len(response.json()) > 0
        print('______________ Test #1 Passed ______________')
        # test 2: get available time with incorrect user id
        get_available_time_url = get_available_time_base_url + '100'
        response = requests.get(get_available_time_url)
        assert response.json()['status'] == 400
        assert response.json()['error']['message'] == 'Bad Request: Doctor does not exist.'
        print('______________ Test #2 Passed ______________')
    except AssertionError as e:
        print(e)
        print('================== Test for get-available-time Failed ==================')
    return

if __name__ == "__main__":
    test_signup()
    test_create_profile()
    test_get_profile()
    # executing data dump for some dummy data
    from services.server.controller import data_dump
    data_dump.dump_data()
    test_get_all_doctors()
    test_get_patient_schedule()
    test_get_available_time()



# postman_patient_payload = {
# "address": "129 Commercial Street",
# "age": 40,
# "allergies": "soy,eggs",
# "contact_no": "570-112-4812",
# "dob": 1577816800,
# "documents": "[{'description': 'Age-rel osteopor w current path fx, unsp femur, sequela', 'file_link': 'lehttp://dunnyimage.com/image7-png','file_name': 'xray', 'update_date': 1622678627, 'user_id': 30000}]",
# "email_id": "mitalee@patient.com",
# "emergency_contact":{
# "contact_no": "1234567890",
# "email_id": "abc@gamil.com",
# "name": "James Hall"
# },
# "family_medical_history": "diabetes",
# "first_name": "Meris ",
# "gender": 0,
# "health_insurance": 45678901,
# "last_name": "Airlie",
# "medical_conditions": "hypertension",
# "prescribed_medication": "[{'medicine_name' :'staminophen','medicine_dosage': '500mg'}]",
# "registration_date": 1577836800,
# "surgical_history": "[{'doctor_name': 'Dr. Smith','surgery_date': 1604188800,'surgery_name': 'Appendix Removal'}]",
# "update_date": 1686625738,
# "user_id": "30000",
# "user_type":0
# }
