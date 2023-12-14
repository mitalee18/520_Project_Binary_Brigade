export interface DoctorCreateRequest {
    user_id ?: number
    first_name?: string,
    last_name?: string,
    age?: number,
    address?: string,
    contact_no?: string,
    dob: number,
    qualifications?: string,
    keywords ?: string,
    gender?: number,
    email_id?: string,
    user_type?: number
}

export interface DoctorGetProfile{
    user_id ?: number
    first_name?: string,
    last_name?: string,
    age?: number,
    address?: string,
    contact_no?: string,
    dob: number,
    qualifications?: string,
    keywords ?: string,
    gender?: number,
    email_id?: string,
    user_type?: number
    registration_date?:number,
    update_date?:number

}

export interface Doctor{
    user_id ?: number
    first_name?: string,
    last_name?: string,
    age?: number,
    address?: string,
    contact_no?: string,
    dob: string,
    qualifications?: string,
    keywords ?: string,
    gender?: number,
    email_id?: string,
    user_type?: number,
    registration_date?:number,
    update_date?:number,

}