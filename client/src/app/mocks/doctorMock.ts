import { DoctorCreateRequest, DoctorGetProfile, GetAllDoctor } from "../model/doctor"

export const FAKE_DOCTOR_DATA: DoctorCreateRequest = {
    user_id: 30000,
    first_name: "Charles",
    last_name: "Paul",
    age: 36,
    address: "121 Brittany Manor",
    contact_no: "+1 413-123-9091",
    dob: 1689177302,
    qualifications: "MD general surgery",
    gender: 1,
    email_id: "charles.paul@doctor.com",
    user_type:1
}

export const FAKE_DOCTOR_DATA_RESPONSE: DoctorGetProfile ={
    user_id: 30000,
    first_name: "Charles",
    last_name: "Paul",
    age: 36,
    address: "121 Brittany Manor",
    contact_no: "+1 413-123-9091",
    dob: 1689177302,
    qualifications: "MD general surgery",
    gender: 1,
    email_id: "charles.paul@doctor.com",
    user_type:1

}

export const FAKE_ALL_DOCTORS_RESPONSE: GetAllDoctor[]=[
    {
        "email_id": "rhugonneau0@cocolog-nifty.com",
        "first_name": "Ralph",
        "keywords": "Cancer",
        "last_name": "Hugonneau",
        "qualifications": "DVM",
        "user_id": 601
    },
    {
        "email_id": "abazell1@europa.eu",
        "first_name": "Abramo",
        "keywords": "heart",
        "last_name": "Bazell",
        "qualifications": "FRCS",
        "user_id": 602
    },
    {
        "email_id": "mcorbett2@reverbnation.com",
        "first_name": "Mureil",
        "keywords": "heart",
        "last_name": "Corbett",
        "qualifications": "DVM",
        "user_id": 603
    },
    {
        "email_id": "bgomm3@reference.com",
        "first_name": "Bev",
        "keywords": "heart",
        "last_name": "Gomm",
        "qualifications": "MD",
        "user_id": 604
    },
    {
        "email_id": "ayven4@fotki.com",
        "first_name": "Almira",
        "keywords": "heart",
        "last_name": "Yven",
        "qualifications": "MBBS",
        "user_id": 605
    },
    {
        "email_id": "akemmet5@guardian.co.uk",
        "first_name": "Alethea",
        "keywords": "eye",
        "last_name": "Kemmet",
        "qualifications": "MD",
        "user_id": 606
    },
    {
        "email_id": "dhullot6@amazon.co.uk",
        "first_name": "Danica",
        "keywords": "eye",
        "last_name": "Hullot",
        "qualifications": "DVM",
        "user_id": 607
    },
    {
        "email_id": "rmosby7@cocolog-nifty.com",
        "first_name": "Ramonda",
        "keywords": "eye",
        "last_name": "Mosby",
        "qualifications": "MRCP",
        "user_id": 608
    },
    {
        "email_id": "gmaggs8@jugem.jp",
        "first_name": "Gradey",
        "keywords": "eye",
        "last_name": "Maggs",
        "qualifications": "DVM",
        "user_id": 609
    },
    {
        "email_id": "cbrain9@cbsnews.com",
        "first_name": "Coralyn",
        "keywords": "cancer",
        "last_name": "Brain",
        "qualifications": "MSc",
        "user_id": 610
    },
    {
        "email_id": "mitalee@doctor.com",
        "first_name": "Mitalee",
        "keywords": "Surgeon, heart",
        "last_name": "Minde",
        "qualifications": "MD ",
        "user_id": 611
    }
]