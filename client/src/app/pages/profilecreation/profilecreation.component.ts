import { Component, OnInit, SimpleChanges } from '@angular/core';
import {SelectItem} from "primeng/api";

interface Gender {
  name: string;
  val: string;
}

@Component({
  selector: 'app-profilecreation',
  templateUrl: './profilecreation.component.html',
  styleUrls: ['./profilecreation.component.css']
})


export class ProfilecreationComponent implements OnInit{
  genders: Gender[] | undefined;
  
  selectedGender: Gender | undefined;

  ngOnInit() {
      this.genders = [
          { name: 'Male', val: 'male' },
          { name: 'Female', val: 'female' },
          { name: 'Other', val: 'other' }
      ];

  }
}
