import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Components
import { RegisterProfComponent } from '../../Components/Administrador/reg-prof/register-prof.component';
import { ListProfComponent } from '../../Components/Administrador/list-prof/list-prof.component';
import { RegEstComponent } from '../../Components/Estudiante/reg-est/reg-est.component';
import { ListEstComponent } from '../../Components/Estudiante/list-est/list-est.component';
import { RegRepComponent } from '../../Components/Representante/reg-rep/reg-rep.component';
import { ListRepComponent } from '../../Components/Representante/list-rep/list-rep.component';
import { RegPeriodoComponent } from '../../Components/Periodo-lectivo/reg-periodo/reg-periodo.component';
import { ListPeriodoComponent } from '../../Components/Periodo-lectivo/list-periodo/list-periodo.component';
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
import { ListDistributivoComponent } from '../../Components/Distributivo/list-distributivo/list-distributivo.component';
import { RegDistributivoComponent } from '../../Components/Distributivo/reg-distributivo/reg-distributivo.component';
import { ViewDistributivoComponent } from '../../Components/Distributivo/view-distributivo/view-distributivo.component';
import { ActiveNotasComponent } from '../../Components/active-notas/active-notas.component';



@NgModule({
  declarations: [
    RegisterProfComponent,
    ListProfComponent,
    RegEstComponent,
    ListEstComponent,
    RegRepComponent,
    ListRepComponent,
    RegPeriodoComponent,
    ListPeriodoComponent,
    ViewProfComponent,
    AutProfComponent,
    ViewEstComponent,
    ViewRepComponent,
    RegFichaComponent,
    ListFichaComponent,
    ViewFichaComponent,
    AutSystemEComponent,
    ListAutProfComponent,
    ListAutEstComponent,
    NivelComponent,
    ParaleloComponent,
    MateriaComponent,
    RegMatriculaComponent,
    ListMatriculaComponent,
    ViewMatriculaComponent,
    ListDistributivoComponent,
    RegDistributivoComponent,
    ViewDistributivoComponent,
    ActiveNotasComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService]
})
export class AdminModule { }
