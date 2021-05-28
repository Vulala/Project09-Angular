import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AddEditNoteComponent } from './patient-note/add-edit-note/add-edit-note.component';
import { ListNoteComponent } from './patient-note/list-note/list-note/list-note.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientsRoutingModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent,
    AddEditNoteComponent,
    ListNoteComponent
  ]
})
export class PatientsModule { }
