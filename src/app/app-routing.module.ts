import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./core/components/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: '',
    loadChildren: () => import('./core/components/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }