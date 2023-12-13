import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { EmergencyContact, CreatePatientRequest, PatientDocuments, PrescribedMedication, SurgicalHistory } from 'src/app/model/patient';
import { ProfileService } from '../service/profile.service';

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
          email_id: [''],
          gender: [''],
          family_medical_history: [''],
          health_insurance:[''],
          registration_date:[''],
          update_date: [''],
          allergies: [''],
          medical_conditions: [''],
          contact_no: [''],
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
    const parts = dateString.split('-');
  
    // Ensure the string has three parts (month, day, and year)
    if (parts.length === 3) {
      // Note: JavaScript months are 0-based, so we subtract 1 from the month
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
  
      // Create a new Date object using the parsed values
      const date = new Date(year, month, day);
  
      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        // Return the epoch time in milliseconds
        return date.getTime();
      }
    }
      const currentEpochTimeInSeconds = Math.floor(new Date().getTime() / 1000);
      return currentEpochTimeInSeconds;
  }

  onSubmitbtnClick(){
    //create a request to api

    this.patientData = this.patientDataForm.value;
    console.log(this.patientData);
    console.log(this.patientData.first_name);
    console.log(typeof(this.patientDataForm.value.first_name));
    console.log(typeof(this.patientData.first_name));
    const user_id = localStorage.getItem("user_id") ?? "30001";
    this.patientData.user_id = parseInt(user_id); 

    const date = this.patientDataForm.value.dob;
    this.patientData.dob = this.dateStringToEpoch(date);

    this.patientData.emergency_contact = this.emergencyContactList.value;
    this.patientData.documents = this.patientDocumentsList.value;

    console.log(this.patientData)

  }
}
