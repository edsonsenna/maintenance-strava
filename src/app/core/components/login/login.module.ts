import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AngularMaterialModule } from '../../modules/angular-material.module';

const declarations = [
    LoginComponent
];

const imports = [
    AngularMaterialModule,
    CommonModule,
    LoginRoutingModule,
    TranslateModule.forChild()
];

const exps = [

]


@NgModule({
    declarations: [...declarations],
    imports: [...imports],
    exports: [...exps]
})
export class LoginModule {}