import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';
import { HomeRoutingModule } from './home-routing.modules';
import { MaintenanceModule } from '../maintenance/maintenance.module';
import { UserDetailComponent } from '../user/user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

const declarations = [
    HomeComponent,
    UserDetailComponent
]

const imports = [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule, // Remove and migrate to new user module
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