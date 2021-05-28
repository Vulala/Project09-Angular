import { TestBed } from '@angular/core/testing';

import { PatientNoteService } from './patient-note.service';

describe('PatientNoteService', () => {
  let service: PatientNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
