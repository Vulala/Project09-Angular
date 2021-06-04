import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { PatientService } from '../../service/patient.service';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
/**
 * Class used to search a specific patient with a search bar.
 * It returns the edit-patient template.
 */
export class PatientSearchComponent implements OnInit {
  patients$: Observable<Patient[]>;
  private searchTerm = new Subject<string>();

  constructor(
    private patientService: PatientService,
    private router: Router
  ) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
    this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore a new term if it's the same as the previous term entered
      distinctUntilChanged(),

      // switch to a new search observable each time the term changes
      switchMap((term: string) => this.patientService.searchPatient(term)),

    ).subscribe((data) => console.log(JSON.stringify(data)));
  }

  /**
   * Go to the edit page of the specified patient.
   * If the patient doesn't exist, then it return an empty patient.
   */
  editTheSpecifiedPatient(uuid: string): void {
    this.router.navigate(['../patients/edit/' + uuid]);
  }

}
