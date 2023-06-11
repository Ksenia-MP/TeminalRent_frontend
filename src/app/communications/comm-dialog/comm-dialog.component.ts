import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/app/error-handle';
import { Communication } from 'src/app/interfaces/communication';

@Component({
  selector: 'app-comm-dialog',
  templateUrl: './comm-dialog.component.html'
})
export class CommDialogComponent {

  communicationForm!: FormGroup;
  matcher = new MyErrorStateMatcher;

  constructor(
    public dialogRef: MatDialogRef<CommDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Communication,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.communicationForm = this.formBuilder.group(
      {
        id: [this.data.id],
        name: [this.data.name, [Validators.required]]
      }
    );
  }

  submit() {
    if (this.communicationForm.invalid) {
      return;
    }
    this.dialogRef.close(this.communicationForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
