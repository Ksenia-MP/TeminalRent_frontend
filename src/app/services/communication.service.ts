import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Communication } from '../interfaces/communication';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private commUrl = 'http://localhost:8080/api/communications'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getComms(): Observable<Communication[]> {
    return this.http.get<Communication[]>(this.commUrl)
    .pipe(
      //catchError
    );
  }

  getComm(id: number): Observable<Communication[]> {
    const url = `${this.commUrl}/${id}`;
    return this.http.get<Communication[]>(url)
    .pipe(
      //catchError
    );
  }

  addComm(comm: Communication): Observable<Communication> {
    return this.http.post<Communication>(this.commUrl, comm, this.httpOptions)
    .pipe(
    );
  }

  updateComm(comm: Communication): Observable<Communication> {
    return this.http.put<Communication>(this.commUrl, comm, this.httpOptions)
    .pipe(
      //catchError
    );
  } 

  deleteComm(id: number): Observable<boolean> {
    const url = `${this.commUrl}?id=${id}`;
    return this.http.delete<boolean>(url)
    .pipe(
      //catchError
    );
  }
}
