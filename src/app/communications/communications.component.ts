import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Communication } from '../interfaces/communication';
import { MatDialog } from '@angular/material/dialog';
import { CommunicationService } from '../services/communication.service';
import { CommDialogComponent } from './comm-dialog/comm-dialog.component';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent {

  communications: Communication[] = [];
  comm?: Communication;

  displayedColumns: string[] = ['name', 'btns'];

  constructor (
    private location: Location,
    private commService: CommunicationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStates();
  }

  getStates(): void {
    this.commService.getComms()
    .subscribe(c => this.communications = c);
  }

  openDialog(comm?: Communication): void {
    this.comm = comm;
    const dialogRef = this.dialog.open(CommDialogComponent, {
      data: {
        id: this.comm?.id,
        name: this.comm?.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (comm == undefined) {
          this.addComm(result as Communication);
        }
        else {
          this.updateComm(result as Communication);
        }
      }
    })
  }

  addComm(comm: Communication): void {
    this.commService.addComm(comm)
    .subscribe(_ => this.getStates());
  }
  
  updateComm(comm: Communication): void {
    this.commService.updateComm(comm)
    .subscribe(_ => this.getStates());
  }
  
  deleteComm(id: number): void {
    this.commService.deleteComm(id)
    .subscribe(_ => this.getStates());
  }

  goBack(): void {
    this.location.back();
  }
}
