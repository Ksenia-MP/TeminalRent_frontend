import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/error-handle';
import { Contract } from 'src/app/interfaces/contract';
import { Terminal } from 'src/app/interfaces/terminal';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
  selector: 'app-contract-dialog',
  templateUrl: './contract-dialog.component.html'
})
export class ContractDialogComponent {

  contractForm!: FormGroup;
  //matcher = new MyErrorStateMatcher;

  public terminals: Terminal[] = [];

  constructor(
    public dialogRef: MatDialogRef<ContractDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contract,
    private formBuilder: FormBuilder,
    private terminalService: TerminalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getTerminals();


    this.contractForm = this.formBuilder.group(
      {
        id: [this.data.id],
        code: [this.data.code, [Validators.required]],
        address: [this.data.address, [Validators.required]],
        start: [this.data.start, [Validators.required]],
        finish: [this.data.finish, [Validators.required]],
        cl_id: [this.data.cl_id, [Validators.required]],
        t_id: [this.data.t_id, [Validators.required]]
      }
    );
  }


  getTerminals(): void {
    this.terminalService.getFreeTerminals()
    .subscribe(t => this.terminals = t);
  }

  submit() {
    if (this.contractForm.invalid) {
      console.log(this.contractForm.value);
      return;
    }
    this.dialogRef.close(this.contractForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
