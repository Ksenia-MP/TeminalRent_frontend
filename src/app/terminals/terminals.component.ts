import { Component } from '@angular/core';
import { Terminal } from '../interfaces/terminal';
import { TerminalService } from '../services/terminal.service';
import { MatDialog } from '@angular/material/dialog';
import { TerminalDialogComponent } from './terminal-dialog/terminal-dialog.component';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.css']
})
export class TerminalsComponent {
  terminals: Terminal[] = [];
  terminal?: Terminal;


  displayedColumns: string[] = ['code', 'model', 'state', 'free', 'btns'];

  constructor(
    private terminalService: TerminalService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTerminals();
  }


  getTerminals(): void {
    this.terminalService.getTerminals()
    .subscribe(t => this.terminals = t);
  }

  openDialog(terminal?: Terminal): void {
    this.terminal = terminal;
    const dialogRef = this.dialog.open(TerminalDialogComponent, {
      data: {
        id: this.terminal?.id,
        code: this.terminal?.code,
        m_id: this.terminal?.m_id,
        state: this.terminal?.state
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (terminal == undefined) {
          this.addTerminal(result as Terminal);
        }
        else {
          this.updateTerminal(result as Terminal);
        }
      }
    });
  }

  
  addTerminal(terminal: Terminal): void {
    this.terminalService.addModel(terminal)
    .subscribe(_ => this.getTerminals());
  }

  updateTerminal(terminal: Terminal): void {
    this.terminalService.updateModel(terminal)
    .subscribe(_ => this.getTerminals());
  }

  deleteTermianl(id: number): void {
    this.terminalService.deleteModel(id)
    .subscribe(_ => this.getTerminals());
  }

}
