import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { MaintenanceListComponent } from '../maintenance/maintenance-list/maintenance-list.component';
import { MaintenanceFormComponent } from '../maintenance/maintenance-form/maintenance-form.component';
import { EquipmentResolver } from '../../resolvers/equipment.resolver';
import { MaintenanceResolver } from '../../resolvers/maintenance.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'maintenance',
        component: MaintenanceListComponent,
      },
      {
        path: 'maintenance/create',
        component: MaintenanceFormComponent,
        resolve: {
          equipments: EquipmentResolver,
        },
      },
      {
        path: 'maintenance/create/:id',
        component: MaintenanceFormComponent,
        resolve: {
          equipments: EquipmentResolver,
          maintenance: MaintenanceResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

// {
//   path: '',
//   children: [
//       {
//         path: 'home',
//         component: HomeComponent
//       },
//       {
//           path: 'maintenance',
//           component: MaintenanceListComponent
//       },
//       {
//           path: 'maintenance/create',
//           component: MaintenanceFormComponent,
//           resolve: {
//             equipments: EquipmentResolver
//           },
//         },
//   ]
// }
