import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PatientNoteService } from '../../../../../service/patient-note.service';
import { PatientNote } from 'src/app/model/patient-note';

@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.css']
})
export class ListNoteComponent implements OnInit {
  patientsNotes!: PatientNote[];

  constructor(private patientNoteService: PatientNoteService) { }

  ngOnInit(): void {
    this.patientNoteService.getAll()
      .pipe(first())
      .subscribe(patientsNotes => this.patientsNotes = patientsNotes);
  }

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
