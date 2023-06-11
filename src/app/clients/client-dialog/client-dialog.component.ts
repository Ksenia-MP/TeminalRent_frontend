import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/error-handle';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html'
})
export class ClientDialogComponent {
  
  clientForm!: FormGroup;
  //matcher = new MyErrorStateMatcher;

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group(
      {
        id: [this.data.id],
        fio: [this.data.fio, [Validators.required]],
        phone: [this.data.phone, [Validators.required]],
        company_name: [this.data.company_name, [Validators.required]]
      }
    );
  }

  submit() {
    if (this.clientForm.invalid) {
      return;
    }
    this.dialogRef.close(this.clientForm.value);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
