import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { FAKE_PATIENT_DATA } from 'src/app/mocks/patientMock';
import { FormGroup, FormArray, FormControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientProfileComponent implements OnInit{
  patientData: Patient;
  patientDataForm: FormGroup;
  emergencyContactList!: FormGroup;
  medicalConditionList!: FormGroup;
  medicationList!: FormGroup;
  surgeryList!: FormGroup;


  constructor(private router: Router){
    this.patientData = FAKE_PATIENT_DATA;
  }

  ngOnInit(): void {
      this.patientDataForm = new FormGroup({
        first_name: new FormControl(FAKE_PATIENT_DATA.first_name),
        last_name: new FormControl(FAKE_PATIENT_DATA.last_name),
        address: new FormControl(FAKE_PATIENT_DATA.address),
        dob: new FormControl(FAKE_PATIENT_DATA.dob),
        age: new FormControl(FAKE_PATIENT_DATA.age),
        email_id: new FormControl(FAKE_PATIENT_DATA.email_id),
        gender: new FormControl(FAKE_PATIENT_DATA.gender),
        family_medical_history: new FormControl(FAKE_PATIENT_DATA.family_medical_history),
        health_insurance: new FormControl(FAKE_PATIENT_DATA.health_insurance),
        registration_date: new FormControl(FAKE_PATIENT_DATA.registration_date),
        update_date: new FormControl(FAKE_PATIENT_DATA.update_date),
        allergies: new FormControl([FAKE_PATIENT_DATA.allergies]),
        medical_conditions: new FormControl([FAKE_PATIENT_DATA.medical_conditions]),
        contact_no: new FormControl(FAKE_PATIENT_DATA.contact_no)
      })

      this.emergencyContactList = new FormGroup({
            emergencyContact: new FormArray([
              new FormGroup({
                name:  new FormControl(''),
                contact_no: new FormControl(''),
                email: new FormControl('')
              })
            ])
          });
      
      this.emergencyContactList.get('emergencyContact')?.setValue(FAKE_PATIENT_DATA.emergency_contact);

    this.medicationList = new FormGroup({
      medication: new FormArray([
        new FormGroup({
          medicationName: new FormControl(''),
          medicationDosage: new FormControl('')
        })
      ])
    });

    this.medicationList.get('medication')?.setValue(FAKE_PATIENT_DATA.prescribed_medication);

    this.surgeryList = new FormGroup({
      surgery: new FormArray([
        new FormGroup({
          surgeryName: new FormControl(''),
          surgeryDate: new FormControl(''),
          doctorName: new FormControl('')
        })
      ])  
    });

    this.surgeryList.get('surgery')?.setValue(FAKE_PATIENT_DATA.surgical_history);
  }

  get emergencyContact(): FormArray {
    return this.emergencyContactList?.get('emergencyContact') as FormArray;
  }

  get medicalCondition(): FormArray {
    return this.medicalConditionList?.get('medicalCondition') as FormArray;
  }

  get medication(): FormArray {
    return this.medicationList?.get('medication') as FormArray;
  }

  get surgery(): FormArray {
    return this.surgeryList?.get('surgery') as FormArray;
  }

  addEmergencyContact() {
    this.emergencyContact.push(
      new FormGroup({
        name: new FormControl(''),
        number: new FormControl('')
      })
    );
  }

  addMedicalCondition() {
    this.medicalCondition.push(
      new FormGroup({
        conditionName: new FormControl('')
      })
    );
  }

  addMedication() {
    this.medication.push(
      new FormGroup({
        medicationName: new FormControl(''),
        medicationDosage: new FormControl('')
      })
    );
  }

  addSurgery() {
    this.surgery.push(
      new FormGroup({
        surgeryDate: new FormControl(''),
        surgeryName: new FormControl(''),
        doctorName: new FormControl('')
      })
    );
  }

  onSaveUser(){

  }

  onSaveEmergencyContact(){
    
  }
}
