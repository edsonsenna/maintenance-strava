import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

const declarations = [

];

const exports = [

];

const imports = [
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
];


@NgModule({
    declarations: [],
    imports: [...imports],
    exports: [...imports],
})
export class AngularMaterialModule { }