import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';

const declarations = [
  MaintenanceFormComponent,
  MaintenanceListComponent,
]

const imports = [
  CommonModule,
  AngularMaterialModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  RouterModule,
  TranslateModule.forChild()
]


@NgModule({
  declarations: [...declarations],
  imports: [
    ...imports
  ]
})
export class MaintenanceModule { }
