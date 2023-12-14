export interface Signup {
    email: string;
    password: string;
    confirm_password: string;
    user_type: number;
}


export interface SignupRequest {
    email_id: string;
    password: string;
    user_type: number;
}
export interface SignupResponse{
    email:string;
    user_id:number;
}