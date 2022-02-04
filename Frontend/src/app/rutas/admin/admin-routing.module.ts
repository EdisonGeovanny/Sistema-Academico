import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEstComponent } from '../../Components/Estudiante/list-est/list-est.component';
import { ListPeriodoComponent } from '../../Components/Periodo-lectivo/list-periodo/list-periodo.component';
import { ListProfComponent } from '../../Components/Administrador/list-prof/list-prof.component';
import { ListRepComponent } from '../../Components/Representante/list-rep/list-rep.component';
import { RegEstComponent } from '../../Components/Estudiante/reg-est/reg-est.component';
import { RegPeriodoComponent } from '../../Components/Periodo-lectivo/reg-periodo/reg-periodo.component';
import { RegRepComponent } from '../../Components/Representante/reg-rep/reg-rep.component';
import { RegisterProfComponent } from '../../Components/Administrador/reg-prof/register-prof.component';
import { ViewProfComponent } from '../../Components/Administrador/view-prof/view-prof.component';
import { AutProfComponent } from '../../Components/Autentificacion/aut-system/aut-prof.component';
import { ViewEstComponent } from '../../Components/Estudiante/view-est/view-est.component';
import { ViewRepComponent } from '../../Components/Representante/view-rep/view-rep.component';
import { RegFichaComponent } from '../../Components/Ficha-Estudiante/reg-ficha/reg-ficha.component';
import { ListFichaComponent } from '../../Components/Ficha-Estudiante/list-ficha/list-ficha.component';
import { ViewFichaComponent } from '../../Components/Ficha-Estudiante/view-ficha/view-ficha.component';
import { AutSystemEComponent } from '../../Components/Autentificacion/aut-system-e/aut-system-e.component';
import { ListAutProfComponent } from '../../Components/Autentificacion/list-aut-prof/list-aut-prof.component';
import { ListAutEstComponent } from '../../Components/Autentificacion/list-aut-est/list-aut-est.component';
import { NivelComponent } from '../../Components/Grado/nivel/nivel.component';
import { ParaleloComponent } from '../../Components/Grado/paralelo/paralelo.component';
import { MateriaComponent } from '../../Components/Grado/materia/materia.component';
import { RegMatriculaComponent } from '../../Components/Matricula/reg-matricula/reg-matricula.component';
import { ListMatriculaComponent } from '../../Components/Matricula/list-matricula/list-matricula.component';
import { ViewMatriculaComponent } from '../../Components/Matricula/view-matricula/view-matricula.component';
import { RegDistributivoComponent } from '../../Components/Distributivo/reg-distributivo/reg-distributivo.component';
import { ListDistributivoComponent } from '../../Components/Distributivo/list-distributivo/list-distributivo.component';
import { ViewDistributivoComponent } from '../../Components/Distributivo/view-distributivo/view-distributivo.component';
import { ActiveNotasComponent } from '../../Components/active-notas/active-notas.component';


const routes: Routes = [
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
  { path: 'reg-paralelo', component: ParaleloComponent },//yes
  { path: 'reg-materia', component: MateriaComponent },//yes
  
  //Matricula
  { path: 'reg-matricula', component: RegMatriculaComponent },//yes
  { path: 'edit-matricula/:id', component: RegMatriculaComponent },//yes
  { path: 'list-matricula', component: ListMatriculaComponent },//yes
  { path: 'view-matricula/:id', component: ViewMatriculaComponent },//

  //Distributivo
  { path: 'reg-dist', component: RegDistributivoComponent },//yes
  { path: 'edit-dist/:id', component: RegDistributivoComponent },//yes
  { path: 'list-dist', component: ListDistributivoComponent },//yes
  { path: 'view-dist/:id', component: ViewDistributivoComponent },//

  //Activar ingreso de Notas
  { path: 'active-nota', component: ActiveNotasComponent },//yes
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
