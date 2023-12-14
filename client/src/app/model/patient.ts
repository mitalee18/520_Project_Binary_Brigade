export interface Patient{
    address?: string,
    age?: number,
    allergies?:string,
    contact_no?:string,
    description?: string,
    dob?: number,
    email_id?: string,
    emergency_contact:EmergencyContact[],
    family_medical_history?: string,
    first_name?: string,
    last_name?: string,
    gender?: number,
    health_insurance?: number,
    medical_conditions?: string,
    prescribed_medication: PrescribedMedication[],
    registration_date?: number | null;
    surgical_history?: SurgicalHistory[];
    update_date?: number;
    user_id?: number;
    documents?: PatientDocuments[];
}

export interface PatientDocuments{
    description?: string;
    file_id?: number;
    file_link?: string;
    file_name?: string;
    update_date?: number;
    user_id?: number
}

export interface SurgicalHistory{
    surgery_date?: string,
    doctor_name?: string,
    surgery_name?: string
}

export interface PrescribedMedication{
    medicine_name?: string,
    medicine_dosage?: string
}

export interface EmergencyContact{
    name ?: string,
    email_id ?: string,
    contact_no ?: string
}

export interface CreatePatientRequest{
    address?: string,
    age?: number,
    allergies?:string,
    contact_no:string,
    description?: string,
    dob?: number,
    email_id?: string,
    emergency_contact:EmergencyContact,
    family_medical_history?: string,
    first_name: string,
    last_name?: string,
    gender?: number,
    health_insurance?: number,
    medical_conditions?: string,
    prescribed_medication: string,
    registration_date?: number | null;
    surgical_history?: string;
    update_date?: number;
    user_id?: number;
    documents?: string;
    user_type?: number;
}