import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorarioComponent } from 'src/app/Components/Docente/horario/horario.component';
import { ListAlumnoComponent } from 'src/app/Components/Docente/list-alumno/list-alumno.component';
import { NotasComponent } from 'src/app/Components/Docente/notas/notas.component';
import { PerfilComponent } from 'src/app/Components/Docente/perfil/perfil.component';
import { AulaComponent } from '../../Components/Docente/aula/aula.component';

const routes: Routes = [
  { path: 'aulas', component: AulaComponent },
  { path: 'nota/:id', component: NotasComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'lista/:id', component: ListAlumnoComponent},
  { path: 'horarios', component: HorarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfRoutingModule { }
