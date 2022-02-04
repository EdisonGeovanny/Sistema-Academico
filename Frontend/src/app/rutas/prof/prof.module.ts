import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

import { ProfRoutingModule } from './prof-routing.module';

//Components
import { AulaComponent } from '../../Components/Docente/aula/aula.component';
import { NotasComponent } from 'src/app/Components/Docente/notas/notas.component';
import { PerfilComponent } from 'src/app/Components/Docente/perfil/perfil.component';
import { ListAlumnoComponent } from 'src/app/Components/Docente/list-alumno/list-alumno.component';
import { HorarioComponent } from 'src/app/Components/Docente/horario/horario.component';


@NgModule({
  declarations: [
    AulaComponent,
    NotasComponent,
    PerfilComponent,
    ListAlumnoComponent,
    HorarioComponent,
  ],
  imports: [
    CommonModule,
    ProfRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],providers: [AuthService]
})
export class ProfModule { }
