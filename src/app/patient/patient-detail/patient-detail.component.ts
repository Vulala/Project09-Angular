// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';

// import { PatientService } from '../../service/patient.service';
// import { Patient } from '../../model/patient';

// @Component({
//   selector: 'app-patient-detail',
//   templateUrl: './patient-detail.component.html',
//   styleUrls: ['./patient-detail.component.css']
// })

// export class PatientDetailComponent implements OnInit {

//   patient: Patient;

//   constructor(
//     private route: ActivatedRoute,
//     private patientService: PatientService,
//     private location: Location
//   ) { }

//   ngOnInit(): void {
//     this.getPatient();
//   }

//   getPatient(): void {
//     const uuid = String(this.route.snapshot.paramMap.get('uuid'));
//     this.patientService.getPatient(uuid)
//       .subscribe(patient => this.patient = patient);
//   }

//   save(): void {
//     this.patientService.updatePatient(this.patient)
//       .subscribe(() => this.goBack());
//   }

//   /**
//    * Way to go back to the previously visited page.
//    */
//   goBack(): void {
//     this.location.back();
//   }

// }
