import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const declarations = [
  MaintenanceFormComponent,
  MaintenanceListComponent,
]

const imports = [
  CommonModule,
  AngularMaterialModule,
  BrowserAnimationsModule
]


@NgModule({
  declarations: [...declarations],
  imports: [
    ...imports
  ]
})
export class MaintenanceModule { }
