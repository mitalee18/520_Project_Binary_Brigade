import requests

def test_create_profile():
    print('______________ Starting Test #1 ______________')
    create_profile_base_url = 'http://localhost:8000/api/user/create-profile'
    patient_payload = {'user_id': '30400',
                       'first_name': 'Sahima',
                       'last_name': 'Srivastava',
                       'email_id': 'temp@gmail.com',
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
                       'file_link': 'http://dummyimage.com/image1.pdf',
                       'file_name': 'image1.pdf',
                       'description': 'A pdf file for testing'}
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
        return print('_______ Test Passed for create_profile _______')
    except AssertionError as e:
        return f'Test failed for create_profile: {e}'

if __name__ == "__main__":
    print(test_create_profile())