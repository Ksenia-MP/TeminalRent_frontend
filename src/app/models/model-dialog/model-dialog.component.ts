import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Model } from 'src/app/interfaces/model';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionType } from 'src/app/enums/conn-type';
import { MyErrorStateMatcher } from 'src/app/error-handle'; 
import { Communication } from 'src/app/interfaces/communication';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html'
})
export class ModelDialogComponent {

  modelForm!: FormGroup;
  //matcher = new MyErrorStateMatcher;

  public conns = Object.values(ConnectionType).filter(value => typeof value === 'string');
  public comms: Communication[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Model,
    private formBuilder: FormBuilder,
    private commService: CommunicationService
  ) {}

  ngOnInit() {
    this.getCommunications();
    this.modelForm = this.formBuilder.group(
      {
        id: [this.data.id],
        name: [this.data.name, [Validators.required]],
        code: [this.data.code, [Validators.required]],
        connection_type: [this.data.connection_type, [Validators.required]],
        communication_id: [this.data.communication_id, [Validators.required]]
      }
    );
  }

  getCommunications(): void {
    this.commService.getComms()
    .subscribe(c => this.comms = c);
  }

  submit() {
    if (this.modelForm.invalid) {
      return;
    }
    this.dialogRef.close(this.modelForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}
