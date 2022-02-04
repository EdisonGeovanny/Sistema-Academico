import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorarioEstComponent } from 'src/app/Components/Estudiante/horario-est/horario-est.component';
import { NotaEstComponent } from 'src/app/Components/Estudiante/nota-est/nota-est.component';
import { PerfilEstComponent } from 'src/app/Components/Estudiante/perfil-est/perfil-est.component';

const routes: Routes = [
  { path: 'perfil-est', component: PerfilEstComponent },
  { path: 'notas-est', component:  NotaEstComponent },
  { path: 'horario-est', component: HorarioEstComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstRoutingModule { }
