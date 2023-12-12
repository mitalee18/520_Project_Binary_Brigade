import { Patient } from "../model/patient"
import { FAKE_MEDICAL_HISTORY_DATA } from "./medicalHistoryMock"

export const FAKE_PATIENT_DATA: Patient = {
    id: "1",
    first_name : "Mitalee",
    last_name : "Minde",
    address : "501 Hamlet Way",
    contact : "512-123-910",
    dob : "April 25th 1997",
    gender : "Female",
    emergency_contact:[
        {
            name: "Vinita Minde",
            relation: "Mother",
            contact: "+91 9930725112"
        },
        {
            name: "Vilas Minde",
            relation: "Father",
            contact: "+91 9920725112"
        }
    ],
    medical_history : FAKE_MEDICAL_HISTORY_DATA,
    health_insurance_number : "123456788",
    email:"mitaleeminde@gmail.com"
}