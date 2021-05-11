import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PatientService } from '../../../service/patient.service';
import { Patient } from '../../../model/patient';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  patients!: Patient[];


  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getAll()
      .pipe(first())
      .subscribe(patients => this.patients = patients);
  }

  deletePatient(uuid: string) {
    const patient = this.patients.find(x => x.uuid === uuid);
    if (!patient) {
      return;
    }
    this.patientService.delete(uuid)
      .pipe(first())
      .subscribe(() => this.patients = this.patients.filter(x => x.uuid !== uuid));
  }
}
