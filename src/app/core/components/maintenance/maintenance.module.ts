import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';

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
  TranslateModule.forChild(),
  NgxMaskModule.forChild()
]


@NgModule({
  declarations: [...declarations],
  imports: [
    ...imports
  ]
})
export class MaintenanceModule { }
