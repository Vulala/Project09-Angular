import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { PatientNote } from './../model/patient-note';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
/** Service used to do CRUD operations with a MongoDB datasource. */
export class PatientNoteService {

  private patientNoteUrl = 'http://localhost:8080/patientHistory'; // URL to the web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET all the patients' notes from the database, it will return an error 404 if no patients' notes are found.
   * Asynchronous signature, returning an Observable.
   */
  getAll(): Observable<PatientNote[]> {
    return this.http.get<PatientNote[]>(this.patientNoteUrl)
      .pipe(
        tap(_ => this.log(`Successfully fetched all the patients' notes`)),
        catchError(this.handleError<PatientNote[]>('getAll', []))
      );
  }

  /** GET patient's notes by UUID. It will return an error 404 if the patient's notes is not found.
   * Asynchronous signature, returning an Observable.
   */
  getByUUID(uuid: string): Observable<PatientNote> {
    return this.http.get<PatientNote>(`${this.patientNoteUrl}/${uuid}`)
      .pipe(
        tap(_ => this.log(`Successfully fetched the patient's note with the uuid: ${uuid}`)),
        catchError(this.handleError<PatientNote>(`getByUUID uuid: ${uuid}`))
      );
  }

  /** POST: add a new patient's note in the MongoDB database.
   * Asynchronous signature, returning an Observable.
   */
  create(params: any): Observable<PatientNote> {
    return this.http.post(this.patientNoteUrl, params)
      .pipe(
        tap((newPatientNote: PatientNote) => this.log(`Successfully added the patient's note w/ uuid: ${newPatientNote.uuid}`)),
        catchError(this.handleError<PatientNote>('addPatient'))
      );
  }

  /** PUT: update the patient's note in the MongoDB database.
   * Asynchronous signature, returning an Observable.
   */
  update(uuid: string, params: any): Observable<any> {
    return this.http.put(`${this.patientNoteUrl}/${uuid}`, params)
      .pipe(
        tap(_ => this.log(`Successfully updated the patient's note with the uuid: ${uuid}`)),
        catchError(this.handleError<any>('updatePatient'))
      );
  }

  /** DELETE: delete the patient's note from the MongoDB database.
   * Asynchronous signature, returning an Observable.
   */
  delete(uuid: string): Observable<PatientNote> {
    return this.http.delete<PatientNote>(`${this.patientNoteUrl}/${uuid}`)
      .pipe(
        tap(_ => this.log(`Successfully deleted the patient's note with the uuid: ${uuid}`)),
        catchError(this.handleError<PatientNote>('deletePatient'))
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

  /* Search a patient's note by using the UUID.
   * Asynchronous signature, returning an Observable using the RxJS of() function.
  */
  searchPatientNote(uuid: string): Observable<PatientNote[]> {
    if (!uuid.trim()) {
      // if the search term is empty then return an empty PatientNote array.
      return of([]);
    }
    return this.http.get<PatientNote[]>(`${this.patientNoteUrl}/${uuid}`)
      .pipe(
        tap(x => x.length ?
          this.log(`Found a PatientNote matching the uuid: "${uuid}"`) :
          this.log(`Found no PatientNote matching the uuid: "${uuid}"`)),
        catchError(this.handleError<PatientNote[]>('searchPatient'))
      );
  }

}
