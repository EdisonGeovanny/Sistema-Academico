import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth.routing.model';


//Componentes
import { AuthService } from '../services/auth.service';
import { LoginProfComponent } from './Autentificacion/log-prof/login-prof.component';
import { RegisterProfComponent } from './Administrador/reg-prof/register-prof.component';
import { ListProfComponent } from './Administrador/list-prof/list-prof.component';
import { RegEstComponent } from './Estudiante/reg-est/reg-est.component';
import { ListEstComponent } from './Estudiante/list-est/list-est.component';
import { RegRepComponent } from './Representante/reg-rep/reg-rep.component';
import { ListRepComponent } from './Representante/list-rep/list-rep.component';
import { RegPeriodoComponent } from './reg-periodo/reg-periodo.component';
import { ListPeriodoComponent } from './list-periodo/list-periodo.component';
import { PagInicioComponent } from './pag-inicio/pag-inicio.component';
import { LogEstComponent } from './Autentificacion/log-est/log-est.component';
import { LogAdminComponent } from './Autentificacion/log-admin/log-admin.component';
import { ViewProfComponent } from './Administrador/view-prof/view-prof.component';
import { AutProfComponent } from './Autentificacion/aut-system/aut-prof.component';
import { ViewEstComponent } from './Estudiante/view-est/view-est.component';
import { ViewRepComponent } from './Representante/view-rep/view-rep.component';
import { RegFichaComponent } from './Ficha-Estudiante/reg-ficha/reg-ficha.component';
import { ListFichaComponent } from './Ficha-Estudiante/list-ficha/list-ficha.component';
import { ViewFichaComponent } from './Ficha-Estudiante/view-ficha/view-ficha.component';


@NgModule({
  declarations: [
    LoginProfComponent,
    RegisterProfComponent,
    ListProfComponent,
    RegEstComponent,
    ListEstComponent,
    RegRepComponent,
    ListRepComponent,
    RegPeriodoComponent,
    ListPeriodoComponent,
    PagInicioComponent,
    LogEstComponent,
    LogAdminComponent,
    ViewProfComponent,
    AutProfComponent,
    ViewEstComponent,
    ViewRepComponent,
    RegFichaComponent,
    ListFichaComponent,
    ViewFichaComponent
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
