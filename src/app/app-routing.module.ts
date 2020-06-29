import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StravaService } from './core/services/strava.service';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./core/components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: '',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }