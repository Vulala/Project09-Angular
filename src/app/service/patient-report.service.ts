import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { PatientReport } from './../model/patient-report';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
/** Service used to do retrieve a diabetes assessment report for a patient. */
export class PatientReportService {

  private patientUrl = 'http://localhost:8080/assess'; // URL to the web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET a patient diabetes assessment by providing the patient's UUID. 
   * Asynchronous signature, returning an Observable.
   */
  getByUUID(uuid: string): Observable<PatientReport> {
    return this.http.get<PatientReport>(`${this.patientUrl}/${uuid}`)
      .pipe(
        tap(_ => this.log(`Successfully fetched the patient's report with the uuid: ${uuid}`)),
        catchError(this.handleError<PatientReport>(`getByUUID uuid: ${uuid}`))
      );
  }

  /** Log a PatientService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PatientService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

