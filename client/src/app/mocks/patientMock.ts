import { Patient,CreatePatientRequest } from "../model/patient"

export 

const FAKE_PATIENT_DATA: Patient = {
        address: "djkb vf..jgnf",
        age: 18,
        allergies: "peanuts, sesame", 
        contact_no: "999999",
        dob: 1644531028,
        documents: [
            {
            description: "A pdf file for testing",
            file_link: "http://dunnyimage.com/image.pdf",
            file_name: "image1.pdf",
            user_id: 30030
            }
        ], 
        email_id: "temp@gmail.com",
        emergency_contact: {
                contact_no: "9999",
                email_id: "temp@yahoo.com",
                name: "Mitalee"
            },
        family_medical_history: "Has a case of diabetes",
        first_name: "Sahima",
        gender: "Male",
        health_insurance: 87456321,
        last_name: "Srivastava",
        medical_conditions: "hypertension, arithiritis",
        prescribed_medication: [{
            medicine_name:"acetaminophen",
            medicine_dosage:"500mg"
        }],
        registration_date: null,
        surgical_history: [
            {
                surgery_date:"1604188800",
                doctor_name:"Dr. Smith",
                surgery_name:"Appendix Removal"
            }
        ],
        update_date: 1702424206,
        user_id:30030
    }
const FAKE_PATIENT_REQUEST_DATE: CreatePatientRequest = {
        "address": "129 Commercial Street",
        "age": 40,
        "allergies": "soy, eggs",
        "contact_no": "570-112-4812",
        "dob": 1577816800,
        "documents": "[{'description': 'Age-rel osteopor w current path fx, unsp femur, sequela', 'file_link': 'http://dunnyimage.com/image7-png','file_name': 'xray', 'user_id': 30001}]",
        "email_id": "mitalee@patient.com",
        "emergency_contact":{
            "contact_no": "1234567890",
            "email_id": "abc@gamil.com",
            "name": "James Hall"    
            },
        "family_medical_history": "diabetes",
        "first_name": "Meris ",
        "gender": 0,
        "health_insurance": 45678901,
        "last_name": "Airlie",
        "medical_conditions": "hypertension",
        "prescribed_medication": "[{'medicine_name' :'staminophen','medicine_dosage': '500mg'}]",
        "registration_date": 1577836800,
        "surgical_history": "[{'doctor_name': 'Dr. Smith','surgery_date': 1604188800,'surgery_name': 'Appendix Removal'}]",
        "update_date": 1686625738,
        "user_id": 30001,
        "user_type":0
    }
