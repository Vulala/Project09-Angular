// import { Component, OnInit } from '@angular/core';

// import { PatientService } from '../../service/patient.service';
// import { Patient } from '../../model/patient';

// @Component({
//   selector: 'app-patient',
//   templateUrl: './patient.component.html',
//   styleUrls: ['./patient.component.css']
// })
// export class PatientComponent implements OnInit {
//   patients: Patient[];

//   constructor(private patientService: PatientService) { }

//   ngOnInit(): void {
//     this.getPatients();
//   }

//   /**
//    * Get method to retrieve a patient from the database, it relay here to the @link PatientService.
//    */
//   getPatients(): void {
//     this.patientService.getAll()
//       .subscribe(patients => this.patients = patients);
//   }

//   /**
//    * Add method to add a patient to the database, it relay here to the @link PatientService.
//    * @param name : of the patient to add
//    */
//   add(lastName: string, firstName: string, dateOfBirth: string, gender: string, homeAddress: string, phoneNumber: string): void {
//     lastName = lastName.trim();
//     if (!lastName || !firstName || !dateOfBirth || !gender || !homeAddress || !phoneNumber) {
//       return;
//     }
//     this.patientService.create({ lastName, firstName, dateOfBirth, gender, homeAddress, phoneNumber } as Patient)
//       .subscribe(patient => {
//         this.patients.push(patient);
//       });
//   }

//   /**
//    * Delete method to delete a patient in the database, it relay here to the @link PatientService.
//    * As a rule, an Observable does nothing until something subscribes.
//    * @param patient : to delete
//    */
//   delete(patient: Patient): void {
//     this.patients = this.patients.filter(h => h !== patient);
//     this.patientService.deletePatient(patient.uuid).subscribe();
//   }
// }
