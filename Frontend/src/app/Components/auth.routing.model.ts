import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogEstComponent } from './Autentificacion/log-est/log-est.component';
import { LoginProfComponent } from './Autentificacion/log-prof/login-prof.component';
import { PagInicioComponent } from './pag-inicio/pag-inicio.component';
import { LogAdminComponent } from './Autentificacion/log-admin/log-admin.component';

const routes: Routes = [
  //inicio
  { path: 'pag-inicio', component: PagInicioComponent }, //yes
  
  //Autentificación
  { path: 'log-admin', component: LogAdminComponent }, //yes
  { path: 'log-prof', component: LoginProfComponent }, //yes
  { path: 'log-est', component: LogEstComponent }, //yes

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
