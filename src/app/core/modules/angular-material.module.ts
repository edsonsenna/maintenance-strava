import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatSliderModule } from '@angular/material/slider';

const declarations = [
    
];

const exports = [

];

const imports = [
    MatButtonModule,
    MatSliderModule
];


@NgModule({
    declarations: [],
    exports: [...imports],
    imports: [...imports]
})
export class AngularMaterialModule {}