import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PatientService } from '../../../service/patient.service';
import { Patient } from '../../../model/patient';
import { PatientReportService } from '../../../service/patient-report.service';
import { PatientReport } from '../../../model/patient-report';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
/**
 * Class used to get all the patients from the database, to delete a specific patient 
 * and to generate a diabetes assessment report for a specific patient.
 * To achieve this, it import the differents services class.
 */
export class ListComponent implements OnInit {
  patients!: Patient[];
  patientReport = new PatientReport;

  constructor(
    private patientService: PatientService,
    private patientReportService: PatientReportService
  ) { }

  /**
   * Retrieve all the patients present in the database, it relay here to the @link PatientService.
   */
  ngOnInit(): void {
    this.patientService.getAll()
      .pipe(first())
      .subscribe(patients => this.patients = patients);
  }

  /**
  * Delete method to delete a patient, it relay here to the @link PatientService.
  */
  deletePatient(uuid: string) {
    const patient = this.patients.find(x => x.uuid === uuid);
    if (!patient) {
      return;
    }
    this.patientService.delete(uuid)
      .pipe(first())
      .subscribe(() => this.patients = this.patients.filter(x => x.uuid !== uuid));
  }

  /**
  * Get method to retrieve a patient's assessment report, it relay here to the @link PatientReportService.
  */
  getPatientReport(uuid: string): void {
    const patient = this.patients.find(x => x.uuid === uuid);
    if (!patient) {
      return;
    }
    this.patientReportService.getByUUID(uuid)
      .pipe(first())
      .subscribe(patientReport => this.patientReport = patientReport);
  }
}
