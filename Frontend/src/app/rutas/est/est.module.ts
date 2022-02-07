import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

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
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EstRoutingModule
  ],providers: [AuthService]
})
export class EstModule { }
