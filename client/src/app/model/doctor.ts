export interface DoctorCreateRequest {
    user_id ?: number
    first_name?: string,
    last_name?: string,
    age?: string,
    address?: string,
    contact?: string,
    dob?: number,
    qualifications?: string,
    keywords ?: string,
    gender?: string,
    email_id?: string
}

export interface DoctorGetProfile{
    user_id ?: number
    first_name?: string,
    last_name?: string,
    age?: string,
    address?: string,
    contact?: string,
    dob?: number,
    qualifications?: string,
    keywords ?: string,
    gender?: string,
    email_id?: string

}