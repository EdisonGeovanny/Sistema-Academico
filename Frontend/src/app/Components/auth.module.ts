import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth.routing.model';
import { AuthService } from '../services/auth.service';

//Componentes
import { LogEstComponent } from './Autentificacion/log-est/log-est.component';
import { LoginProfComponent } from './Autentificacion/log-prof/login-prof.component';
import { PagInicioComponent } from './pag-inicio/pag-inicio.component';
import { LogAdminComponent } from './Autentificacion/log-admin/log-admin.component';
import { Error404Component } from './mensaje/error404/error404.component';
import { HorarioComponent } from './Docente/horario/horario.component';





@NgModule({
  declarations: [
    LoginProfComponent,
    PagInicioComponent,
    LogEstComponent,
    LogAdminComponent,
    Error404Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [AuthService]
})
export class AuthModule { }
