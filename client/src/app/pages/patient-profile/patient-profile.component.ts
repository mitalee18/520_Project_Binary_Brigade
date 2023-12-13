import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { FAKE_PATIENT_DATA } from 'src/app/mocks/patientMock';
import { FormGroup, FormArray, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../service/profile.service';


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
  surgicalHistoryList!: FormGroup;
  prescribedMedicationList!: FormGroup;
  patientDocumentsList!: FormGroup;



  constructor(private router: Router,
    private profileService: ProfileService){
      const userString = localStorage.getItem("user_id") ?? "30000";
      const user_id = Math.floor(parseFloat(userString))
      this.profileService.getPatientProfile(user_id)
      .subscribe( 
        (response) => {
          this.patientData = response;
          console.log(this.patientData);
      }
  );
  }

  ngOnInit(): void {
      this.patientDataForm = new FormGroup({
        first_name: new FormControl(this.patientData.first_name),
        last_name: new FormControl(this.patientData.last_name),
        address: new FormControl(this.patientData.address),
        dob: new FormControl(this.patientData.dob),
        age: new FormControl(this.patientData.age),
        email_id: new FormControl(this.patientData.email_id),
        gender: new FormControl(this.patientData.gender),
        family_medical_history: new FormControl(this.patientData.family_medical_history),
        health_insurance: new FormControl(this.patientData.health_insurance),
        registration_date: new FormControl(this.patientData.registration_date),
        update_date: new FormControl(this.patientData.update_date),
        allergies: new FormControl([this.patientData.allergies]),
        medical_conditions: new FormControl([this.patientData.medical_conditions]),
        contact_no: new FormControl(this.patientData.contact_no)
      })

      this.emergencyContactList = new FormGroup({
            emergencyContact: new FormArray([
              new FormGroup({
                name:  new FormControl(''),
                contact_no: new FormControl(''),
                email_id: new FormControl('')
              })
            ])
          });
      
      this.emergencyContactList.get('emergencyContact')?.setValue(this.patientData.emergency_contact);
      console.log('Form Data:', this.emergencyContactList.value);

    this.prescribedMedicationList = new FormGroup({
      prescribedMedication: new FormArray([
        new FormGroup({
          medicine_name: new FormControl(''),
          medicine_dosage: new FormControl('')
        })
      ])
    });

    this.prescribedMedicationList.get('prescribedMedication')?.setValue(this.patientData.prescribed_medication);
    console.log('Form Data:', this.prescribedMedicationList.value);


    this.surgicalHistoryList = new FormGroup({
      surgicalHistory: new FormArray([
        new FormGroup({
          surgery_name: new FormControl(''),
          surgery_date: new FormControl(''),
          doctor_name: new FormControl('')
        })
      ])  
    });

    this.surgicalHistoryList.get('surgicalHistory')?.setValue(this.patientData.surgical_history);

    this.patientDocumentsList = new FormGroup({
      patientDocuments: new FormArray([
        new FormGroup({
          description: new FormControl(''),
          file_id: new FormControl(''),
          file_link: new FormControl(''),
          file_name: new FormControl(''),
          update_date: new FormControl(''),
          user_id: new FormControl(this.patientDataForm.get('user_id')),
        })
      ])  
    });
    this.patientDocumentsList.get('patientDocuments')?.setValue(this.patientData.documents);
    console.log('Form Data:', this.patientDocumentsList.value);

  }

  get emergencyContact(): FormArray {
    return this.emergencyContactList?.get('emergencyContact') as FormArray;
  }

  get surgicalHistory(): FormArray {
    return this.surgicalHistoryList?.get('surgicalHistory') as FormArray;
  }

  get prescribedMedication(): FormArray {
    return this.prescribedMedicationList?.get('prescribedMedication') as FormArray;
  }

  get patientDocuments(): FormArray{
    return this.patientDocumentsList?.get('patientDocuments') as FormArray;
  }

  save(event: any): void{
    let selectFile = event.target.files;
    for(let i=0; i> selectFile.length; i++){
      let file_name = selectFile[i].name;
      let file_type =  selectFile[i].type;
      this.patientDocuments.push(
        new FormGroup({
          description: new FormControl(file_name),
          file_id: new FormControl(file_name+'_'+i),
          file_link: new FormControl(file_name+'.'+file_type),
          file_name: new FormControl(file_name),
          update_date: new FormControl(''),
          user_id: new FormControl(this.patientDataForm.get('user_id'))
        })
      )
    }
  }


  addEmergencyContact() {
    this.emergencyContact.push(
      new FormGroup({
        name: new FormControl(''),
        number: new FormControl('')
      })
    );
  }

  addSurgicalHistory() {
    this.surgicalHistory.push(
      new FormGroup({
        conditionName: new FormControl('')
      })
    );
  }

  addMedication() {
    this.prescribedMedication.push(
      new FormGroup({
        medicine_name: new FormControl(''),
        medicine_dosage: new FormControl('')
      })
    );
  }

  removeEmergencyContact(index: number){
    this.emergencyContact.removeAt(index);
  }

  removeMedicine(index: number){
    this.prescribedMedication.removeAt(index);
  }

  removeSurgicalHistory(index: number){
    this.surgicalHistory.removeAt(index);
  }

  onSaveUser(){
    const obj = this.patientDocumentsList.value;
  }

  onSaveEmergencyContact(){

  }
  onSavePrescibedMedication(){

  }
  onSaveSurgicalInformation(){

  }

  onSavePatientDocuments(){

  }

  
}
