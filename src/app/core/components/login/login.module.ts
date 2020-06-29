import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AngularMaterialModule } from '../../modules/angular-material.module';

const declarations = [
    LoginComponent
];

const imports = [
    AngularMaterialModule,
    CommonModule,
    LoginRoutingModule
];

const exps = [

]


@NgModule({
    declarations: [...declarations],
    imports: [...imports],
    exports: [...exps]
})
export class LoginModule {}