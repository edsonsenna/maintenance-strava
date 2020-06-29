import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { HomeRoutingModule } from './home-routing.modules';
import { MaintenanceModule } from '../maintenance/maintenance.module';

const declarations = [
    HomeComponent,
]

const imports = [
    AngularMaterialModule,
    CommonModule,
    HomeRoutingModule,
    MaintenanceModule,
    TranslateModule.forChild()
]

const exps = [];

@NgModule({
    declarations: [...declarations],
    imports: [...imports],
    exports: [...exps]
})
export class HomeModule {}