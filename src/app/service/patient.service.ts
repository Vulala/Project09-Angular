import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Patient } from './../model/patient';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
/** Service used to do CRUD operations with a datasource. */
export class PatientService {

  private patientUrl = 'http://localhost:8080/patient'; // URL to the web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET all the patients from the database, it will return an error 404 if no patients are found.
   * Asynchronous signature, returning an Observable.
   */
  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientUrl)
      .pipe(
        tap(_ => this.log(`Successfully fetched all the patients`)),
        catchError(this.handleError<Patient[]>('getAll', []))
      );
  }

  /** GET patient by UUID. It will return an error 404 if the patient is not found.
   * Asynchronous signature, returning an Observable.
   */
  getByUUID(uuid: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientUrl}/${uuid}`)
      .pipe(
        tap(_ => this.log(`Successfully fetched the patient with the uuid: ${uuid}`)),
        catchError(this.handleError<Patient>(`getByUUID uuid: ${uuid}`))
      );
  }

  /** POST: add a new patient to the server.
   * Asynchronous signature, returning an Observable.
   */
  create(params: any): Observable<Patient> {
    return this.http.post(this.patientUrl, params)
      .pipe(
        tap((newPatient: Patient) => this.log(`Successfully added the patient w/ uuid: ${newPatient.uuid}`)),
        catchError(this.handleError<Patient>('addPatient'))
      );
  }

  /** PUT: update the patient on the server.
   * Asynchronous signature, returning an Observable.
   */
  update(uuid: string, params: any): Observable<any> {
    return this.http.put(`${this.patientUrl}/${uuid}`, params)
      .pipe(
        tap(_ => this.log(`Successfully updated the patient with the uuid: ${uuid}`)),
        catchError(this.handleError<any>('updatePatient'))
      );
  }

  /** DELETE: delete the patient from the server
   * Asynchronous signature, returning an Observable.
   */
  delete(uuid: string): Observable<Patient> {
    return this.http.delete<Patient>(`${this.patientUrl}/${uuid}`)
      .pipe(
        tap(_ => this.log(`Successfully deleted the patient with the uuid: ${uuid}`)),
        catchError(this.handleError<Patient>('deletePatient'))
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

  /* Search a patient by using the UUID.
   * Asynchronous signature, returning an Observable using the RxJS of() function.
  */
  searchPatient(uuid: string): Observable<Patient[]> {
    if (!uuid.trim()) {
      // if the search term is empty then return an empty patient array.
      return of([]);
    }
    return this.http.get<Patient[]>(`${this.patientUrl}/${uuid}`)
      .pipe(
        tap(x => x.length ?
          this.log(`Found a patient matching the uuid: "${uuid}"`) :
          this.log(`Found no patient matching the uuid: "${uuid}"`)),
        catchError(this.handleError<Patient[]>('searchPatient'))
      );
  }

}

