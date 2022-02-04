import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-view-distributivo',
  templateUrl: './view-distributivo.component.html',
  styleUrls: ['./view-distributivo.component.css']
})
export class ViewDistributivoComponent implements OnInit {

  nombre: string | null;
  usuario: string | null;

  materias: any = { dato: [] }
  Horario: any = { dato: [] }

  //Objeto
  docente: any = {

  }

  //id
  id: string | null;
  Hora: Date | null;
  estado: string | null;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.nombre = null,
      this.usuario = null,
      this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.Hora = new Date(),
      this.estado = ""
  }

  ngOnInit(): void {
    this.loginData();
    this.esEditar();
  }

  //Obtener datos para Editar
  async esEditar() {
    if (this.id !== null) {

      this.authService.obtenerDistributivoId(this.id).subscribe(data => {

        this.authService.obtenerProfId(data.Docente[0]).subscribe(data => {
          this.docente = {
            id: data.dni._id,
            Nombre: data.dni.Apellidos + " " + data.dni.Nombres,
            DNI: data.dni.DNI,
            Celular: data.dni.Celular,
            Telefono: data.dni.Telefono,
            Email: data.dni.Email,
            Especialidad: data.dni.Especialidad
          }
        });

        this.authService.obtenerDistributivoxDocentePeriodo(data.Docente[0] + "," + data.Periodo).subscribe(data => {
          this.materias.dato = data;
       

          this.materias.dato.forEach((element: any, index: any, array: any) => {
            this.materias.dato[index].Horario.forEach((item: any, index: any, array: any) => {

              this.Horario.dato.push({
                id: element._id,
                Periodo: element.Periodo,
                Jornada: element.Jornada,
                Nivel: element.Nivel,
                Paralelo: element.Paralelo,
                Area: element.Area,
                Asignatura: element.Asignatura,
                Dia: item.Dia,
                Inicio: item.Hora_inicio,
                Fin: item.Hora_fin
              });

            });
          });

        });

      });

    }
  }


  logOut() {
    this.authService.logoutA();
    this.router.navigateByUrl('/app/log-admin')
  }


  loginData() {
    this.usuario = localStorage.getItem('user');
    const id = localStorage.getItem('id');
    if (id != null) {
      this.authService.obtenerPorfesorId(id).subscribe(data => {
        this.nombre = data.Apellidos + " " + data.Nombres;
      }, error => {
        console.log(error);
      });
    }


  }

  view() {
    const id = localStorage.getItem('id');
    this.router.navigateByUrl('/admin/view-prof/' + id);
  }

  //imprimir
  Print() {
    printJS({
      printable: 'PrintForm1',
      type: 'html',
      targetStyles: ['*'],
      ignoreElements: ['ignore'],
      header: '<h2>Unidad Educativa Comunitaria Intercultural Bilingüe "Benito Juárez"</h2>'
    })
  }

  viewDoc(id: any) {
    this.router.navigateByUrl('/admin/view-prof/' + id);
  }


}
