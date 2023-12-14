import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { EmergencyContact, CreatePatientRequest, PatientDocuments, PrescribedMedication, SurgicalHistory } from 'src/app/model/patient';
import { ProfileService } from '../service/profile.service';
import { isEmpty } from 'rxjs';
import { FAKE_DOCUMENTS } from '../../mocks/patientMock'

@Component({
  selector: 'app-profilecreation',
  templateUrl: './profilecreation.component.html',
  styleUrls: ['./profilecreation.component.css'],
  providers: [MessageService, ConfirmationService]
})


export class ProfilecreationComponent implements OnInit{
  patientData: CreatePatientRequest;
  patientDataForm: FormGroup;
  emergencyContactList!: FormGroup;
  surgicalHistoryList!: FormGroup;
  prescribedMedicationList!: FormGroup;
  patientDocumentsList!: FormGroup;

  patientEmergencyContact: EmergencyContact;
  patientDocument:PatientDocuments;
  patientPrescribedMedication: PrescribedMedication;
  patientSurgicalHistory: SurgicalHistory;


  constructor(private router: Router,
    private profileService: ProfileService,
    private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
      this.patientDataForm = this.formBuilder.group({
          first_name: [''],
          last_name: [''],
          address: [''],
          dob: [''],
          age: [''],
          email_id: [localStorage.getItem('email_id')],
          gender: [''],
          family_medical_history: [''],
          health_insurance:[''],
          registration_date:[''],
          update_date: [''],
          allergies: [''],
          medical_conditions: [''],
          contact_no: [''],
          prescribed_medication: ['']
      })
      this.patientDataForm.get('email_id')?.setValue(localStorage.getItem('email_id'));

      this.emergencyContactList = new FormGroup({
            emergencyContact: new FormArray([
              new FormGroup({
                name:  new FormControl(''),
                contact_no: new FormControl(''),
                email_id: new FormControl('')
              })
            ])
          });

    this.prescribedMedicationList = new FormGroup({
      prescribedMedication: new FormArray([
        new FormGroup({
          medicine_name: new FormControl(''),
          medicine_dosage: new FormControl('')
        })
      ])
    });

    this.surgicalHistoryList = new FormGroup({
      surgicalHistory: new FormArray([
        new FormGroup({
          surgery_name: new FormControl(''),
          surgery_date: new FormControl(''),
          doctor_name: new FormControl('')
        })
      ])  
    });


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
    const obj = this.patientDataForm.value;
    console.log(obj)


  }

  onSaveEmergencyContact(){
    const obj = this.emergencyContactList.value;
    console.log(obj)

  }
  onSavePrescibedMedication(){
    const obj = this.prescribedMedicationList.value;
    console.log(obj)

  }
  onSaveSurgicalInformation(){
    const obj = this.surgicalHistoryList.value;
    console.log(obj)
  }

  onSavePatientDocuments(){
    const obj = this.patientDocumentsList.value;
    console.log(obj)
  }

  dateStringToEpoch(dateString: string): number {
    console.log(dateString);
      if (dateString.length !== 0) {
        // Return the epoch time in milliseconds
        return  Math.floor(new Date(dateString).getTime() / 1000);
      }
      const currentEpochTimeInSeconds = Math.floor(new Date().getTime() / 1000);
      return currentEpochTimeInSeconds;
  }

  calculateAge(dateString: string): number {
    const birthdate = new Date(dateString);

    // Calculate the current date
    const currentDate = new Date();

    // Calculate the age in milliseconds
    const ageInMilliseconds = currentDate.getTime() - birthdate.getTime();

    // Convert the age to years
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    // Round down to the nearest whole year
    const roundedAge = Math.floor(ageInYears);

    return roundedAge
  }

  getGender(gender: string): number{
    if(gender === "Female"){
      return 1;
    }
    return 0;
  }



  onSubmitbtnClick(){
    //create a request to api

    this.patientData = this.patientDataForm.value;
    const user_id = localStorage.getItem("user_id") ?? "30001";
    this.patientData.user_id = parseInt(user_id); 

    const date = this.patientDataForm.value.dob;
    this.patientData.dob = this.dateStringToEpoch(date);
    this.patientData.emergency_contact = this.emergencyContactList.value;
    this.patientData.documents = FAKE_DOCUMENTS.documents;
    this.patientData.surgical_history = FAKE_DOCUMENTS.surgical_history;
    this.patientData.registration_date =Math.floor(new Date().getTime() / 1000);
    this.patientData.update_date = Math.floor(new Date().getTime() / 1000);
    this.patientData.age = this.calculateAge(date);


    this.patientData.gender = this.getGender(this.emergencyContactList.value.gender);

    this.patientData.user_type = 0;
    this.profileService.createPatientProfile(this.patientData)
    .subscribe( 
      response => {
             console.log("User is created in");
             console.log(response)
             this.router.navigateByUrl("/patient-dashboard")
            
         },
      error =>{
        console.log(error);
      }
      
     );

  }
}
