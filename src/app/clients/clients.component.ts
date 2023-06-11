import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Client } from '../interfaces/client';
import { ClientService } from '../services/client.service';

import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  clients: Client[] = [];
  client?: Client;

  displayedColumns: string[] = ['fio', 'phone', 'company_name', 'btns'];

  constructor (
    private location: Location,
    private clientService: ClientService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
    .subscribe(c => this.clients = c);
  }
  
  openDialog(client?: Client): void {
    this.client = client;
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {
        id: this.client?.id,
        fio: this.client?.fio,
        phone: this.client?.phone,
        company_name: this.client?.company_name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (client == undefined) {
          this.addClient(result as Client);
        }
        else {
          this.updateClient(result as Client);
        }
      }
    })
  }

  addClient(client: Client): void {
    this.clientService.addClient(client)
    .subscribe(_ => this.getClients());
  }
  
  updateClient(client: Client): void {
    this.clientService.updateClient(client)
    .subscribe(_ => this.getClients());
  }
  
  deleteClient(id: number): void {
    this.clientService.deleteClient(id)
    .subscribe(_ => this.getClients());
  }

}
