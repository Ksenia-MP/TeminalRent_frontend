import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl = 'http://localhost:8080/api/clients';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientUrl)
    .pipe(
      //catchError
    );
  }

  getClient(id: number): Observable<Client> {
    const url = `${this.clientUrl}/${id}`;
    return this.http.get<Client>(url)
    .pipe(
      //catchError
    );
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientUrl, client, this.httpOptions)
    .pipe(
    );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.clientUrl, client, this.httpOptions)
    .pipe(
      //catchError
    );
  } 

  deleteClient(id: number): Observable<boolean> {
    const url = `${this.clientUrl}?id=${id}`;
    return this.http.delete<boolean>(url)
    .pipe(
      //catchError
    );
  }
}
