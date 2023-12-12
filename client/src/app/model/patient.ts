import { EmergencyContact } from "./emergencyContact"

export interface Patient{
    address?: string,
    age?: number,
    allergies?:string,
    contact_no:string,
    description?: string,
    dob?: number,
    email_id?: string,
    emergency_contact?:EmergencyContact,
    family_medical_history?: string,
    file_id?: number,
    file_link?: string,
    first_name?: string,
    last_name?: string,
    gender?: string,
    health_insaurance?: number,
    medical_conditions?: string,
    prescribe_medication: string,
    registration_date?: number,
    surgical_history?: number,
    update_date?: number,
    user_id?: number
}