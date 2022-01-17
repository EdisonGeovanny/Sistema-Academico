import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEstComponent } from './Estudiante/list-est/list-est.component';
import { ListPeriodoComponent } from './Periodo-lectivo/list-periodo/list-periodo.component';
import { ListProfComponent } from './Administrador/list-prof/list-prof.component';
import { ListRepComponent } from './Representante/list-rep/list-rep.component';
import { LogEstComponent } from './Autentificacion/log-est/log-est.component';
import { LoginProfComponent } from './Autentificacion/log-prof/login-prof.component';
import { PagInicioComponent } from './pag-inicio/pag-inicio.component';
import { RegEstComponent } from './Estudiante/reg-est/reg-est.component';
import { RegPeriodoComponent } from './Periodo-lectivo/reg-periodo/reg-periodo.component';
import { RegRepComponent } from './Representante/reg-rep/reg-rep.component';
import { RegisterProfComponent } from './Administrador/reg-prof/register-prof.component';
import { LogAdminComponent } from './Autentificacion/log-admin/log-admin.component';
import { ViewProfComponent } from './Administrador/view-prof/view-prof.component';
import { AutProfComponent } from './Autentificacion/aut-system/aut-prof.component';
import { ViewEstComponent } from './Estudiante/view-est/view-est.component';
import { ViewRepComponent } from './Representante/view-rep/view-rep.component';
import { RegFichaComponent } from './Ficha-Estudiante/reg-ficha/reg-ficha.component';
import { ListFichaComponent } from './Ficha-Estudiante/list-ficha/list-ficha.component';
import { ViewFichaComponent } from './Ficha-Estudiante/view-ficha/view-ficha.component';
import { AutSystemEComponent } from './Autentificacion/aut-system-e/aut-system-e.component';
import { ListAutProfComponent } from './Autentificacion/list-aut-prof/list-aut-prof.component';
import { ListAutEstComponent } from './Autentificacion/list-aut-est/list-aut-est.component';
import { GradoComponent } from './Grado/grado/grado.component';
import { NivelComponent } from './Grado/nivel/nivel.component';
import { ParaleloComponent } from './Grado/paralelo/paralelo.component';
import { MateriaComponent } from './Grado/materia/materia.component';
import { RegMatriculaComponent } from './Matricula/reg-matricula/reg-matricula.component';

const routes: Routes = [
  //inicio
  { path: 'pag-inicio', component: PagInicioComponent }, //yes
  
  //Autentificación
  { path: 'log-admin', component: LogAdminComponent }, //yes
  { path: 'log-prof', component: LoginProfComponent }, //yes
  { path: 'log-est', component: LogEstComponent }, //yes

  //Crear Usuarios Docente/administrador
  { path: 'aut-system', component: AutProfComponent }, //yes
  { path: 'list-aut', component: ListAutProfComponent }, //yes
  { path: 'edit-aut/:id', component: AutProfComponent },//yes
   //Crear Usuarios Estudiante
   { path: 'aut-system-e', component: AutSystemEComponent }, //yes
   { path: 'list-aut-e', component: ListAutEstComponent }, //yes
   { path: 'edit-aut-e/:id', component: AutSystemEComponent },//yes
   

  //Profesores
  { path: 'reg-prof', component: RegisterProfComponent }, //yes
  { path: 'edit-prof/:id', component: RegisterProfComponent }, //yes
  { path: 'list-prof', component: ListProfComponent }, //yes
  { path: 'view-prof/:id', component: ViewProfComponent }, //yes
  //Estudiante
  { path: 'reg-est', component: RegEstComponent },//yes
  { path: 'list-est', component: ListEstComponent },//yes
  { path: 'edit-est/:id', component: RegEstComponent }, //yes
  { path: 'view-est/:id', component: ViewEstComponent }, //yes

  //Representante
  { path: 'reg-rep', component: RegRepComponent }, //yes
  { path: 'list-rep', component: ListRepComponent },//yes
  { path: 'edit-rep/:id', component: RegRepComponent },//yes
  { path: 'view-rep/:id', component: ViewRepComponent }, //yes

  //Ficha estudiantil
  { path: 'reg-ficha', component: RegFichaComponent },//yes
  { path: 'list-ficha', component: ListFichaComponent },
  { path: 'edit-ficha/:id', component: RegFichaComponent },
  { path: 'view-ficha/:id', component: ViewFichaComponent },

  //PERIDO-LECTIVO
  { path: 'reg-periodo', component: RegPeriodoComponent },//yes
  { path: 'edit-periodo/:id', component: RegPeriodoComponent },//yes 
  { path: 'list-periodo', component: ListPeriodoComponent },//yes

  //Grado - paralelos, materias, Nivel, nivel-Materia
  { path: 'reg-nivel', component: NivelComponent },//yes
  { path: 'reg-grado', component: GradoComponent },//yes
  { path: 'reg-paralelo', component: ParaleloComponent },//yes
  { path: 'reg-materia', component: MateriaComponent },//yes
  
  //Matricula
  { path: 'reg-matricula', component: RegMatriculaComponent },//

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
