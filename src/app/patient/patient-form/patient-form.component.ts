import { Component } from '@angular/core';

import { Patient } from '../../model/patient';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {

  patientForm = new Patient();

  constructor() { }

  submitted = false;

  onSubmit() { this.submitted = true; }

  get diagnostic() { return JSON.stringify(this.patientForm); }

  newPatient() {
    this.patientForm = new Patient();
  }
}
