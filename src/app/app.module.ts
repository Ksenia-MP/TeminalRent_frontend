import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { TerminalsComponent } from './terminals/terminals.component';
import { TerminalDialogComponent } from './terminals/terminal-dialog/terminal-dialog.component';

import { ModelsComponent } from './models/models.component';
import { ModelDialogComponent } from './models/model-dialog/model-dialog.component';

import { MainComponent } from './main/main.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDialogComponent } from './clients/client-dialog/client-dialog.component';
import { ClientComponent } from './client/client.component';
import { CommunicationsComponent } from './communications/communications.component';
import { CommDialogComponent } from './communications/comm-dialog/comm-dialog.component';
import { ContractDialogComponent } from './client/contract-dialog/contract-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    ModelsComponent,
    TerminalsComponent,
    ModelDialogComponent,
    TerminalDialogComponent,
    MainComponent,
    ClientsComponent,
    ClientDialogComponent,
    ClientComponent,
    CommunicationsComponent,
    CommDialogComponent,
    ContractDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
