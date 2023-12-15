import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreatePatientRequest, Patient } from 'src/app/model/patient';
import { FAKE_PATIENT_DATA } from 'src/app/mocks/patientMock';
import { FormGroup, FormArray, FormControl, FormBuilder} from '@angular/forms';
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
  patientEdit: CreatePatientRequest;
  patientDataForm: FormGroup;
  emergencyContactList!: FormGroup;
  surgicalHistoryList!: FormGroup;
  prescribedMedicationList!: FormGroup;
  patientDocumentsList!: FormGroup;


  constructor(private router: Router,
    private profileService: ProfileService,
    private formBuilder: FormBuilder){
    
  }

  ngOnInit(): void {
    const userString = localStorage.getItem("user_id") ?? "30000";
      const user_id = Math.floor(parseFloat(userString))
      this.profileService.getPatientProfile(user_id)
      .subscribe( 
        (response) => {
          this.patientData = response;
          console.log(this.patientData);
          this.setFunction()
      });
  }



  setFunction(){
    this.patientDataForm = this.formBuilder.group({
      last_name: [this.patientData.last_name],
      first_name: [this.patientData.first_name],
      address: [this.patientData.address],
      dob: [this.caculateDate(this.patientData.dob ?? 1000000)],
      age: [this.patientData.age],
      email_id: [this.patientData.email_id],
      gender: [this.patientData.gender === 1 ? 'Female' : 'Male'],
      family_medical_history: [this.patientData.family_medical_history],
      health_insurance:[this.patientData.health_insurance],
      registration_date:[this.patientData.registration_date],
      allergies: [this.patientData.allergies],
      medical_conditions: [this.patientData.medical_conditions],
      contact_no: [this.patientData.contact_no]
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

    this.prescribedMedicationList = new FormGroup({
      prescribedMedication: new FormArray([
        new FormGroup({
          medicine_name: new FormControl(''),
          medicine_dosage: new FormControl('')
        })
      ])
    });

    this.prescribedMedicationList.get('prescribedMedication')?.setValue(this.patientData.prescribed_medication);


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

  caculateDate(epochTime: number): string{
    const date = new Date(epochTime * 1000); // Convert to milliseconds
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
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

  

  onSubmitbtnClick(){
    const convertToJsonString = (data: any): string => {
      let jsonString = JSON.stringify(data);
      jsonString = jsonString.replace(/"/g, "'");
      return `"${jsonString}"`;
  };
  
    const documents = convertToJsonString(this.patientData.documents);
    const prescribed_medication = convertToJsonString(this.patientData.prescribed_medication);
    const surgical_history = convertToJsonString(this.patientData.surgical_history);
    this.patientEdit.first_name =  this.patientDataForm.get('first_name')?.value;
    this.patientEdit.last_name =  this.patientDataForm.get('last_name')?.value;
    this.patientEdit.address= this.patientDataForm.get('address')?.value
    this.patientEdit.dob = Math.floor(Date.now() / 1000);
    this.patientEdit.age=  this.patientDataForm.get('age')?.value,
    this.patientEdit.email_id=  this.patientDataForm.get('email_id')?.value,
    this.patientEdit.gender= this.patientDataForm.get('gender')?.value,
    this.patientEdit.family_medical_history= this.patientDataForm.get('family_medical_history')?.value,
    this.patientEdit.health_insurance =this.patientDataForm.get('health_insurance')?.value,
    this.patientEdit.registration_date =this.patientDataForm.get('registration_date')?.value,
    this.patientEdit.allergies= this.patientDataForm.get('allergies')?.value,
    this.patientEdit.medical_conditions= this.patientDataForm.get('medical_conditions')?.value,
    this.patientEdit.contact_no= this.patientDataForm.get('contact_no')?.value,
    this.patientEdit.documents = documents;
    this.patientEdit.prescribed_medication = prescribed_medication;
    this.patientEdit.surgical_history = surgical_history;

    
    this.profileService.createPatientProfile(this.patientEdit)
    .subscribe(
      response =>{
        console.log(response);
      },
      error =>{
        console.log(error);
      }
    )



  }

  
}
