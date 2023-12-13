import { DoctorCreateRequest, DoctorGetProfile } from "../model/doctor"

export const FAKE_DOCTOR_DATA: DoctorCreateRequest = {
    user_id: 30000,
    first_name: "Charles",
    last_name: "Paul",
    age: "36",
    address: "121 Brittany Manor",
    contact: "+1 413-123-9091",
    dob: 1689177302,
    qualifications: "MD general surgery",
    gender: "Male",
    email_id: "charles.paul@doctor.com"
    
}