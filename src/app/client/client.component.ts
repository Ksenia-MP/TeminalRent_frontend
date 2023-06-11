import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Client } from '../interfaces/client';
import { Contract } from '../interfaces/contract';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from '../services/contract.service';
import { ClientService } from '../services/client.service';
import { ContractDialogComponent } from './contract-dialog/contract-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IsFocusableConfig } from '@angular/cdk/a11y';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  client?: Client;
  contracts: Contract[] = [];
  contract?: Contract;
  client_id = parseInt(this.route.snapshot.paramMap.get('id')!);

  displayedColumns: string[] = ['id', 'code', 'address', 'start', 'finish', 'terminal', 'btns'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private contractService: ContractService,
    private clientService: ClientService,
    public dialog: MatDialog
  ) {}

  getClient(): void {
    //const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.clientService.getClient(this.client_id)
    .subscribe(cl => this.client = cl);
  }

  getContracts(): void {
    //const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.contractService.getClientContracts(this.client_id)
    .subscribe(c => this.contracts = c);
  }

  ngOnInit(): void {
    this.getClient();
    console.log(this.client);
    this.getContracts();
  }

  openDialog(contract?: Contract): void {
    this.contract = contract;
    const dialogRef = this.dialog.open(ContractDialogComponent, {
      data: {
        id: this.contract?.id,
        code: this.contract?.code,
        address: this.contract?.address,
        start: this.contract?.start,
        finish: this.contract?.finish,
        cl_id: this.client?.id,
        t_id: this.contract?.t_id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (contract == undefined) {
          this.addContract(result as Contract);
        }
        else {
          this.updateContract(result as Contract);
        }
      }
    })
  }

  addContract(contract: Contract): void {
    this.contractService.addContract(contract)
    .subscribe(_ => this.getContracts());
  }
  
  updateContract(contract: Contract): void {
    this.contractService.updateContract(contract)
    .subscribe(_ => this.getContracts());
  }
  
  deleteContract(id: number): void {
    this.contractService.deleteContract(id)
    .subscribe(_ => this.getContracts());
  }

  goBack(): void {
    this.location.back();
  }
}
