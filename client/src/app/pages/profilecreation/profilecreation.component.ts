import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Patient } from 'src/app/model/patient';

interface Gender {
  name: string;
  val: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-profilecreation',
  templateUrl: './profilecreation.component.html',
  styleUrls: ['./profilecreation.component.css'],
  providers: [MessageService, ConfirmationService]
})


export class ProfilecreationComponent implements OnInit{
  patientRequestData: Patient;
  genders: Gender[] | undefined;
  firstNameValue: string | undefined;
  emailValue: string | undefined;
  lastNameValue: string | undefined;
  contactNumberValue: string | undefined;
  dateOfBirthValue: Date | undefined;
  healthInsuranceValue: string | undefined;
  confirmHealthInsuranceValue: string | undefined;
  
  selectedGender: Gender | undefined;

  emergencyContactList!: FormGroup;
  medicalConditionList!: FormGroup;
  medicationList!: FormGroup;
  surgeryList!: FormGroup;

  // private messageService!: MessageService;
  constructor(
    private messageService: MessageService, 
    private submitConfirmationService: ConfirmationService, 
    private submitMessageService: MessageService){

  }

  ngOnInit() {
      this.genders = [
          { name: 'Male', val: 'male' },
          { name: 'Female', val: 'female' },
          { name: 'Other', val: 'other' }
      ];   
      this.emergencyContactList = new FormGroup({
        emergencyContact: new FormArray([
          new FormGroup({
            name: new FormControl(''),
            number: new FormControl('')
          })
        ])
      });
  
      this.medicalConditionList = new FormGroup({
        medicalCondition: new FormArray([
          new FormGroup({
            conditionName: new FormControl('')
          })
        ])
      });
  
      this.medicationList = new FormGroup({
        medication: new FormArray([
          new FormGroup({
            medicationName: new FormControl(''),
            medicationDosage: new FormControl('')
          })
        ])
      });
  
      this.surgeryList = new FormGroup({
        surgery: new FormArray([
          new FormGroup({
            surgeryName: new FormControl(''),
            surgeryDate: new FormControl(''),
            doctorName: new FormControl('')
          })
        ])
      });
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


  onUpload(event: any) {
    // Check if 'event.originalEvent' is available and is an instance of 'Event'
    if (event.originalEvent instanceof Event) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    } else {
      // Handle the case where 'event.originalEvent' is not as expected
      console.error('Unexpected event structure:', event);
    }
  }

  confirmSubmit() {
    console.log(this.emergencyContactList.value)
    this.submitConfirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.submitMessageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.submitMessageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.submitMessageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
          default:
            // Handle unexpected case
            break;
        }
      }
    });
  }
}
