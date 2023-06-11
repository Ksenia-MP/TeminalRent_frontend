import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Model } from '../interfaces/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private modelUrl = 'http://localhost:8080/api/models'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor( private http: HttpClient) {  }

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.modelUrl)
    .pipe(
      //catchError
    );
  }

  getModel(id: number): Observable<Model> {
    const url = `${this.modelUrl}/${id}`;
    return this.http.get<Model>(url)
    .pipe(
      //catchError
    );
  }

  addModel(model: Model): Observable<Model> {
    return this.http.post<Model>(this.modelUrl, model, this.httpOptions)
    .pipe(
      //catchError
    );
  }

  updateModel(model: Model): Observable<Model> {
    return this.http.put<Model>(this.modelUrl, model, this.httpOptions)
    .pipe(
      //catchError
    );
  }

  deleteModel(id: number): Observable<boolean> {
    const url = `${this.modelUrl}?id=${id}`;
    return this.http.delete<boolean>(url)
    .pipe(
      //catchError
    );
  }
}
