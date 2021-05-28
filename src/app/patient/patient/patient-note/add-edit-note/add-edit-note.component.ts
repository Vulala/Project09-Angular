import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { PatientNoteService as PatientNoteService } from '../../../../service/patient-note.service';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.css']
})
/**
* Component used to Add or Edit a patient's note.
*/
export class AddEditNoteComponent implements OnInit {
  form!: FormGroup;
  uuid!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientNoteService: PatientNoteService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.uuid = this.route.snapshot.params.uuid;
    this.isAddMode = !this.uuid;

    this.form = this.formBuilder.group({
      uuid: ['', Validators.required],
      notes: ['']
    });

    /**
     * Switch to edit mode
     */
    if (!this.isAddMode) {
      this.patientNoteService.getByUUID(this.uuid)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for an easy access to form fields
  get fields() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset message on submit
    this.messageService.clear();

    // stop here if the form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createPatientNote();
    } else {
      this.updatePatientNote();
    }
  }

  /**
   * Create a patient history with the provided information from the patient note form.
   * Redirect to the last visited page once it's done.
   */
  private createPatientNote() {
    this.patientNoteService.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.messageService.add('Patient`s note added');
        this.goBack();
      })
      .add(() => this.loading = false);
  }

  /**
   * Update a patient's history with the provided information from the patient note form.
   * Redirect to the last visited page once it's done.
   */
  private updatePatientNote() {
    this.patientNoteService.update(this.uuid, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.messageService.add('Patient`s note updated');
        this.goBack();
      })
      .add(() => this.loading = false);
  }

  /**
   * Way to go back to the previously visited page.
   */
  goBack(): void {
    this.router.navigate(['../patients']);
  }
}
