import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AddEditNoteComponent } from './patient-note/add-edit-note/add-edit-note.component';
import { ListNoteComponent } from './patient-note/list-note/list-note/list-note.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit/:uuid', component: AddEditComponent },
      { path: 'add-note', component: AddEditNoteComponent },
      { path: 'edit-note/:uuid', component: AddEditNoteComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
