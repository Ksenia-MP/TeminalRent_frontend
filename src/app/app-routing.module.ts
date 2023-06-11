import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelsComponent } from './models/models.component';
import { MainComponent } from './main/main.component';
import { CommunicationsComponent } from './communications/communications.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'communications', component: CommunicationsComponent },
  { path: 'models', component: ModelsComponent },
  { path: 'clients/:id', component: ClientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
