import { Patient } from "../model/patient"

export const FAKE_PATIENT_DATA: Patient = {
        address: "djkb vf..jgnf",
        age: 18,
        allergies: [ "peanuts","sesame"], 
        contact_no: "999999",
        dob: 1644531028,
        documents: [
            {
            description: "A pdf file for testing",
            file_link: "http://dunnyimage.com/image.pdf",
            file_name: "image1.pdf",
            update_date: 1702424206,
            user_id: 30030
            }
        ], 
        email_id: "temp@gmail.com",
        emergency_contact: [ 
            {
                contact_no: "9999",
                email_id: "temp@yahoo.com",
                name: "Mitalee"
            }
        ],
        family_medical_history: "Has a case of diabetes",
        first_name: "Sahima",
        gender: "Male",
        health_insurance: 87456321,
        last_name: "Srivastava",
        medical_conditions: [ "hypertension", "arithiritis"],
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
