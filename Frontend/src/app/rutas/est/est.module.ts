import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstRoutingModule } from './est-routing.module';
import { HorarioEstComponent } from 'src/app/Components/Estudiante/horario-est/horario-est.component';
import { NotaEstComponent } from 'src/app/Components/Estudiante/nota-est/nota-est.component';
import { PerfilEstComponent } from 'src/app/Components/Estudiante/perfil-est/perfil-est.component';


@NgModule({
  declarations: [
    HorarioEstComponent,
    NotaEstComponent,
    PerfilEstComponent,
  ],
  imports: [
    CommonModule,
    EstRoutingModule
  ]
})
export class EstModule { }
