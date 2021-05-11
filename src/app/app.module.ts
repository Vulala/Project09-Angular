import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // <-- NgModel
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { PatientComponent } from './patient/patient.component';
//import { PatientDetailComponent } from '../../patient-detail/patient-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditComponent } from './patient/patient/add-edit/add-edit.component';
import { LayoutComponent } from './patient/patient/layout/layout.component';
import { ListComponent } from './patient/patient/list/list.component';
import { PatientSearchComponent } from './patient/patient-search/patient-search.component';
//import { PatientFormComponent } from './patient-form/patient-form.component';

@NgModule({
  declarations: [
    AppComponent,
    //  PatientComponent,
    //  PatientDetailComponent,
    MessagesComponent,
    DashboardComponent,
    //   AddEditComponent,
    //   LayoutComponent,
    //   ListComponent,
    PatientSearchComponent,
    //  PatientFormComponent
  ],
  imports: [
    BrowserModule,
    //  FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [], // no need to place any providers due to the `providedIn` flag.
  bootstrap: [AppComponent]
})
export class AppModule { }
