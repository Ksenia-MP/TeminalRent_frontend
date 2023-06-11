import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Observable, of } from "rxjs";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class ErrorHandler {
  hanleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(`${operation} failed: ${err.message}`);
      return of(result as T);
    }
  }
}
  