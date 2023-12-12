import { EmergencyContact } from "./emergencyContact"
import { MedicalHistory } from "./medicalHistory"

export interface Patient{
    id ?: string,
    first_name ?: string,
    last_name ?: string,
    address ?: string,
    contact ?: string,
    dob ?: string,
    gender ?: string
    emergency_contact ?:EmergencyContact[],
    medical_history ?: MedicalHistory,
    health_insurance_number ?: string,
    email?: string

}