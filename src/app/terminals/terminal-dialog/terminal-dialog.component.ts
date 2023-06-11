import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { States } from 'src/app/enums/states';
import { MyErrorStateMatcher } from 'src/app/error-handle';
import { Model } from 'src/app/interfaces/model';
import { Terminal } from 'src/app/interfaces/terminal';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-terminal-dialog',
  templateUrl: './terminal-dialog.component.html'
})
export class TerminalDialogComponent {
  
  terminalForm!: FormGroup;
  //matcher = new MyErrorStateMatcher;

  public models: Model[] = [];
  public states = Object.values(States).filter(value => typeof value === 'string');

  constructor(
    private modelService: ModelService,
    private formBuilder: FormBuilder,

    public dialogRef: MatDialogRef<TerminalDialogComponent>,
    
    @Inject(MAT_DIALOG_DATA) 
    public data: Terminal

  ) {}

  ngOnInit() {
    this.getModels();
    this.terminalForm = this.formBuilder.group({
      id: [this.data.id],
      code: [this.data.code, [Validators.required]],
      m_id: [this.data.m_id, [Validators.required]],
      state: [this.data.state, [Validators.required]]
    });
  }

  getModels(): void {
    this.modelService.getModels()
    .subscribe(m => this.models = m);
  }

  submit() {
    if (this.terminalForm.invalid) {
      return;
    }
    this.dialogRef.close(this.terminalForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
