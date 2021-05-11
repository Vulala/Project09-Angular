import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { PatientComponent } from './patient/patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { PatientDetailComponent } from './patient-detail/patient-detail.component';

const patientsModule = () => import('./patient/patient/patients.module').then(x => x.PatientsModule);

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', loadChildren: patientsModule },
  // { path: 'patients', component: PatientComponent },
  //  { path: 'detail/:uuid', component: PatientDetailComponent }
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
