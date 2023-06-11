import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Contract } from '../interfaces/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private contractUrl = 'http://localhost:8080/api/contracts'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor( private http: HttpClient) {  }

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.contractUrl)
    .pipe(
      //catchError
    );
  }

  getContract(id: number): Observable<Contract> {
    const url = `${this.contractUrl}/${id}`;
    return this.http.get<Contract>(url)
    .pipe(
      //catchError
    );
  }

  getClientContracts(id: number): Observable<Contract[]> {
    const url = `${this.contractUrl}/client/${id}`;
    return this.http.get<Contract[]>(url)
    .pipe(
      //catchError
    );
  }

  addContract(model: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.contractUrl, model, this.httpOptions)
    .pipe(
      //catchError
    );
  }

  updateContract(model: Contract): Observable<Contract> {
    return this.http.put<Contract>(this.contractUrl, model, this.httpOptions)
    .pipe(
      //catchError
    );
  }

  deleteContract(id: number): Observable<boolean> {
    const url = `${this.contractUrl}?id=${id}`;
    return this.http.delete<boolean>(url)
    .pipe(
      //catchError
    );
  }
}
