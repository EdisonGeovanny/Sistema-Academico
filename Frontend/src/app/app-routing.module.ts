import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './Components/mensaje/error404/error404.component';
import { RolAdminGuard } from './rutas/guards/rol-admin.guard';
import { RolProfGuard } from './rutas/guards/rol-prof.guard';
import { RolEstGuard } from './rutas/guards/rol-est.guard';


const routes: Routes = [
  { path: '', redirectTo: '/app/pag-inicio', pathMatch: 'full' },

  {
    path: 'app',
    loadChildren: () => import('src/app/Components/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'admin',
    loadChildren: () => import('./rutas/admin/admin.module').then(m => m.AdminModule),
    canActivateChild: [RolAdminGuard]
  },

  {
    path: 'prof',
     loadChildren: () => import('./rutas/prof/prof.module').then(m => m.ProfModule),
     canActivateChild: [RolProfGuard]
  },

  { 
    path: 'est',
     loadChildren: () => import('./rutas/est/est.module').then(m => m.EstModule),
     canActivateChild: [RolEstGuard]
 },

  {
    path: 'error', component: Error404Component
  },
  

  { path: '**', redirectTo: '/app/pag-inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    RolAdminGuard,
    RolProfGuard,
    RolEstGuard,
    Error404Component
  ]

})
export class AppRoutingModule { }
