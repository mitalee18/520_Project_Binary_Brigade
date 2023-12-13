import requests

def test_signup():
    print('______________ Starting Test #1 ______________')
    signup_base_url = 'http://localhost:8000/api/user/signup'
    signup_payload = {"email_id": "mitalee8@patient.com",
                      "password": "abc",
                      "user_type": 0
                      }
    try:
        # test 1: patient
        response = requests.post(signup_base_url, json=signup_payload)
        print(response.json())
        assert response.status_code == 200
        assert response.json()['email'] == signup_payload['email_id']
        assert response.json()['user_id'] > 30000
        return print('______________ Test #1 Passed ______________')
    except AssertionError as e:
        print(e)
        print('______________ Test #1 Failed ______________')
        return

def test_create_profile():
    print('______________ Starting Test #2 ______________')
    create_profile_base_url = 'http://localhost:8000/api/user/create-profile'
    patient_payload = {'user_id': '30009',
                       'first_name': 'Sahima',
                       'last_name': 'Srivastava',
                       'email_id': 'mitalee8@patient.com',
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
                       "documents" : "[{'file_link': 'http://dummyimage.com/image1.pdf','file_name': 'image1.pdf','description': 'A pdf file for testing', 'user_id': 30030}]"}
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
    admin_payload =  {'user_id': 299,
                      'user_type': 2,
                      'first_name': 'Sachin',
                      'last_name': 'Tendulkar',
                      'email_id': 'st@yahoo.com',
                      'contact_no': '1234567890',
                      'address': '948 Mumbai'}
    try:
        # test 1: patient
        response = requests.post(create_profile_base_url, json=patient_payload)
        print(response.json())
        assert response.status_code == 200
        assert response.json() == 1
        print('test 1 passed')
        # test 2: doctor
        response = requests.post(create_profile_base_url, json=doctor_payload)
        assert response.status_code == 200
        assert response.json() == 1
        print('test 2 passed')
        # test 3: admin
        response = requests.post(create_profile_base_url, json=admin_payload)
        assert response.status_code == 200
        assert response.json() == 1
        print('test 3 passed')
        return print('______________ Test #2 Passed ______________')
    except AssertionError as e:
        print(e)
        print('______________ Test #2 Failed ______________')
        return

if __name__ == "__main__":
    # print(test_create_profile())
    print(test_signup())

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
