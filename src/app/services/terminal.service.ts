import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Terminal } from '../interfaces/terminal';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private terminalUrl = 'http://localhost:8080/api/terminals'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor( private http: HttpClient ) { }

  getTerminals(): Observable<Terminal[]> {
    return this.http.get<Terminal[]>(this.terminalUrl)
    .pipe(
      //catchError
    );
  }

  getFreeTerminals():Observable<Terminal[]> {
    const url = `${this.terminalUrl}/free`
    return this.http.get<Terminal[]>(url)
    .pipe(
      //ce
    );
  }

  getTerminal(id: number): Observable<Terminal> {
    const url = `${this.terminalUrl}/${id}`;
    return this.http.get<Terminal>(url)
    .pipe(
      //catchError
    );
  }

  addModel(model: Terminal): Observable<Terminal> {
    return this.http.post<Terminal>(this.terminalUrl, model, this.httpOptions)
    .pipe(
      //catchError
    );
  }

  updateModel(model: Terminal): Observable<Terminal> {
    return this.http.put<Terminal>(this.terminalUrl, model, this.httpOptions)
    .pipe(
      //catchError
    );
  }

  deleteModel(id: number): Observable<boolean> {
    const url = `${this.terminalUrl}?id=${id}`;
    return this.http.delete<boolean>(url)
    .pipe(
      //catchError
    );
  }
}
