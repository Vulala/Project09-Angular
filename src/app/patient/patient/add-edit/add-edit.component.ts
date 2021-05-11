import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { PatientService } from '../../../service/patient.service';
import { MessageService } from '../../../service/message.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
/**
 * Component used to Add or Edit a patient.
 */
export class AddEditComponent implements OnInit {

  form!: FormGroup;
  uuid!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.uuid = this.route.snapshot.params.uuid;
    this.isAddMode = !this.uuid;

    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      homeAddress: [''],
      phoneNumber: ['']
    });

    /**
     * Switch to edit mode
     */
    if (!this.isAddMode) {
      this.patientService.getByUUID(this.uuid)
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
      this.createPatient();
    } else {
      this.updatePatient();
    }
  }

  /**
   * Create a patient with the provided information from the patient form.
   * Redirect to the last visited page once it's done.
   */
  private createPatient() {
    this.patientService.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.messageService.add('Patient added');
        this.goBack();
      })
      .add(() => this.loading = false);
  }

  /**
   * Update a patient with the provided information from the patient form.
   * Redirect to the last visited page once it's done.
   */
  private updatePatient() {
    this.patientService.update(this.uuid, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.messageService.add('Patient updated');
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
