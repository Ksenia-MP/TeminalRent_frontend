import { Component } from '@angular/core';
import { Model } from '../interfaces/model';
import { ModelService } from '../services/model.service';
import { Location } from '@angular/common';

import {MatDialog} from '@angular/material/dialog';
import { ModelDialogComponent } from './model-dialog/model-dialog.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent {
  models: Model[] = [];
  model?: Model;

  displayedColumns: string[] = ['name', 'code', 'conn', 'comm', 'btns'];

  constructor(
    private modelService: ModelService,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getModels();
  }

  getModels(): void {
    this.modelService.getModels()
    .subscribe(m => this.models = m);
  }

  goBack(): void {
    this.location.back();
  }

  openDialog(model?: Model): void {
    this.model= model;
    const dialogRef = this.dialog.open(ModelDialogComponent, {
      data: {
        id: this.model?.id,
        name: this.model?.name, 
        code: this.model?.code, 
        connection_type: this.model?.connection_type, 
        communication_id: this.model?.communication_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result);
        if (model == undefined){
          this.addModel(result as Model);
        }
        else{
          this.updateModel(result as Model);
        }
      }
    });
  }

  addModel(model: Model): void {
    this.modelService.addModel(model)
    .subscribe(_ => this.getModels());
  }

  updateModel(model: Model): void {
    this.modelService.updateModel(model)
    .subscribe(_ => this.getModels());
  }

  deleteModel(id: number): void {
    this.modelService.deleteModel(id)
    .subscribe(_ => this.getModels());
  }
}
