import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-list-alumno',
  templateUrl: './list-alumno.component.html',
  styleUrls: ['./list-alumno.component.css']
})
export class ListAlumnoComponent implements OnInit {
  //titulo
  Titulo = 'LISTA DE ALUMNOS';
  subnivel = 'LISTA';
  name_n = 'TABLA ALUMNOS';

  

//variables de titulos o encabezados
  nombre: string | null;
  usuario: string | null;
  area: string | null;
  asignatura: string | null;

  per: string | null;
  jor: string | null;
  niv: string | null;
  par: string | null;

  id: string | null;

  public estudiantes: any = {
    dni: []
  }
  public busqueda: any = {
    dni: []
  }

  public aula: any = {
    dni: []
  }

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {

    this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.nombre = null,
      this.usuario = null,
      this.area = null,
      this.asignatura = null,
      this.per = null,
      this.jor = null,
      this.niv = null,
      this.par = null

  }

  ngOnInit(): void {
    this.obtenerEstudiantes();
    this.loginData();
  }

  async obtenerEstudiantes() {
    if (this.id !== null) {
      this.authService.obtenerDistributivoId(this.id).subscribe(data => {
        //obtención de distributivo de materia, periodo, aula, nivel, asignatura, etc
        this.area = data.Area;
        this.asignatura = data.Asignatura;
        const Docente = data.Docente[0];

        //obtención de matriculados en el periodo y paralelo seleccionado
        this.authService.obtenerGrado(data.Periodo + "," + data.Nivel + "," + data.Paralelo + "," + data.Jornada).subscribe(data => {

          this.estudiantes.dni = data;

          //obtención de Registro de estudiantes 
          this.authService.getEstAll().subscribe(data => {
            this.busqueda = data;

            //cotejar Estudiantes con Matriculas
            this.estudiantes.dni.forEach((grado: any, i: any, array: any) => {
              this.busqueda.dni.forEach((estudiante: any, j: any, array: any) => {

                if (grado.Estudiante == estudiante._id) {

                  //añadir descripción de año lectivo, aula, etc
                  this.per = grado.Periodo;
                  this.jor = grado.Jornada;
                  this.niv = grado.Nivel;
                  this.par = grado.Paralelo;

                  //crear lista de alumnos
                  this.aula.dni.push({
                    Matricula: grado._id,
                    Estudiante: estudiante._id,
                    Docente: Docente,
                    Distributivo: this.id,
                    Codigo: estudiante.Codigo,
                    DNI: estudiante.DNI,
                    Nombres: estudiante.Nombres,
                    Apellidos: estudiante.Apellidos,
                    Periodo: grado.Periodo,
                    Jornada: grado.Jornada,
                    Nivel: grado.Nivel,
                    Paralelo: grado.Paralelo,
                    Asignatura: this.asignatura,
                    Area: this.area
                  });

                }
              });
            });

            this.ordenarAlumnos(this.aula.dni);

          }, error => {
            console.log(error);
          });

        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }
  }

  Regresar() {
    this.router.navigateByUrl('/prof/aulas');
  }

  ordenarAlumnos(alumnos: any): any {
    console.table(alumnos.sort(((a: any, b: any) => {
      if (a.Apellidos < b.Apellidos) {
        return -1;
      } else if (a.Apellidos > b.Apellidos) {
        return 1;
      } else {
        return 0;
      }
    })));
  
  }

  logOut() {
    this.authService.logoutA();
    this.router.navigateByUrl('/app/log-prof')
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
    this.router.navigateByUrl('/prof/perfil/' + id);
  }

  datosNotas(objeto: any) {
    const param = objeto.Periodo + "," + objeto.Matricula + "," + objeto.Distributivo + "," + objeto.Asignatura;
    this.authService.RepetidoNota(param).subscribe(data => {
      if (data[0] !== undefined) {
         this.router.navigateByUrl('/prof/nota/'+data[0]._id);
        
      } else {
        console.log('no existen datos');
        const NOTA = {
          Matricula: objeto.Matricula,
          Estudiante: objeto.Estudiante,
          Docente: objeto.Docente,
          Distributivo: objeto.Distributivo,
          Periodo: objeto.Periodo,
          Jornada: objeto.Jornada,
          Nivel: objeto.Nivel,
          Paralelo: objeto.Paralelo,
          Asignatura: objeto.Asignatura,
          Area: objeto.Area
        }
       
        this.authService.registerNota(NOTA).subscribe(nota=>{
          this.router.navigateByUrl('/prof/nota/'+nota._id);
        }, error => {
          console.log(error);
        });
      }
    });


    
    // this.router.navigateByUrl('/prof/nota');
  }

  
  Print() {
    printJS({
      printable: 'PrintForm1',
      type: 'html',
      targetStyles: ['*'],
      ignoreElements: ['ignore'],
      header: '<h2>Unidad Educativa Comunitaria Intercultural Bilingüe "Benito Juárez"</h2>'
    })
  }



}
