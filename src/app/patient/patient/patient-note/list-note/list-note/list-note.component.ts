import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PatientNoteService } from '../../../../../service/patient-note.service';
import { PatientNote } from 'src/app/model/patient-note';

@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.css']
})
/**
 * Class used to get all the patients' notes from the database and to delete a specific patient's note.
 * To achieve this, it import the PatientNoteService class.
 */
export class ListNoteComponent implements OnInit {
  patientsNotes!: PatientNote[];

  constructor(private patientNoteService: PatientNoteService) { }

  /**
   * Retrieve all the patients' notes present in the database, it relay here to the @link PatientNoteService.
   */
  ngOnInit(): void {
    this.patientNoteService.getAll()
      .pipe(first())
      .subscribe(patientsNotes => this.patientsNotes = patientsNotes);
  }

  /**
  * Delete method to delete a patient's note, it relay here to the @link PatientNoteService.
  */
  deletePatientNote(uuid: string) {
    const patientNote = this.patientsNotes.find(x => x.uuid === uuid);
    if (!patientNote) {
      return;
    }
    this.patientNoteService.delete(uuid)
      .pipe(first())
      .subscribe(() => this.patientsNotes = this.patientsNotes.filter(x => x.uuid !== uuid));
  }
}
