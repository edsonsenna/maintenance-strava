import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginGuard } from './core/guards/login.guard';
import { MaintenanceListComponent } from './core/components/maintenance/maintenance-list/maintenance-list.component';
import { MaintenanceFormComponent } from './core/components/maintenance/maintenance-form/maintenance-form.component';
import { EquipmentResolver } from './core/resolvers/equipment.resolver';
import { StravaService } from './core/services/strava.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'maintenance',
    component: MaintenanceListComponent
  },
  {
    path: 'maintenance/create',
    component: MaintenanceFormComponent,
    resolve: {
      equipments: EquipmentResolver
    }
  },
  {
    path: '**',
    redirectTo: 'login',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StravaService]
})
export class AppRoutingModule { }
