import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-horario-est',
  templateUrl: './horario-est.component.html',
  styleUrls: ['./horario-est.component.css']
})
export class HorarioEstComponent implements OnInit {
  //titulo
  Titulo = 'CRONOGRAMA DE CLASES';
  subnivel = 'HORARIO';

  nombre: string | null;
  usuario: string | null;
  periodo: string | null;
  jornada: string | null;
  nivel: string | null;
  paralelo: string | null;

  id: string | null;
  //Matutina
  public Lunes: any = {
    dni: []
  }
  public Martes: any = {
    dni: []
  }
  public Miercoles: any = {
    dni: []
  }
  public Jueves: any = {
    dni: []
  }
  public Viernes: any = {
    dni: []
  }

  //otros
  public estudiante: any = {
    dni: []
  }

  public Horario: any = {
    dni: []
  }

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.nombre = null,
      this.usuario = null,
      this.periodo = null,
      this.jornada = null,
      this.nivel = null,
      this.paralelo = null

  }


  ngOnInit(): void {
    this.loginData();
    this.obtenerHorario();
  }

  logOut() {
    this.authService.logoutA();
    this.router.navigateByUrl('/app/log-est')
  }

  obtenerHorario() {
    //obtener Periodos activos
    this.authService.obtenerPeriodoEstado().subscribe(data => {
      this.periodo = data.dni[0].Codigo;

      //Matriculas
      const id = localStorage.getItem('id');
      if (id != null) {
        this.authService.obtenerMatriculaEstPer(id + "," + this.periodo).subscribe(matricula => {
          this.jornada = matricula[0].Jornada;
          this.nivel = matricula[0].Nivel;
          this.paralelo = matricula[0].Paralelo;


          this.authService.obtenerNVPorNivel(matricula[0].Nivel).subscribe(nivel => {
            nivel.dni.forEach((element: any, index: any, array: any) => {
              this.estudiante.dni.push({
                _id: matricula[0]._id,
                Estudiante: matricula[0].Estudiante[0],
                Nivel: matricula[0].Nivel,
                Paralelo: matricula[0].Paralelo,
                Area: element.Area,
                Asignatura: element.Asignatura,
              });
            });


            let horas: any = {
              dni: []
            };
            this.authService.obtenerDistributivoxPeriodoNivelParalelo(this.periodo + "," + this.nivel + "," + this.paralelo + "," + this.jornada).subscribe(distr => {


              distr.forEach((element: any, index: any, array: any) => {
                distr[index].Horario.forEach((item: any, index: any, array: any) => {

                  horas.dni.push({
                    id: element._id,
                    Docente: element.Docente[0],
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
              // console.table(horas.dni)

              // tablas de prueba
              // console.table(this.estudiante.dni)

              // tablas de horarios

              let conDocente:any = {
                dni: []
              }

              this.estudiante.dni.forEach((a: any, i: any, array: any) => {
                horas.dni.forEach((h: any, j: any, array: any) => {
                  if (a.Nivel == h.Nivel) {
                    if (a.Paralelo == h.Paralelo) {
                      if (a.Area == h.Area) {
                        conDocente.dni.push({
                          Docente: h.Docente,
                          Area: a.Area,
                          Asignatura: a.Asignatura,
                          Dia: h.Dia,
                          Inicio: h.Inicio,
                          Fin: h.Fin
                        });
                      }
                    }
                  }
                });
              });

              this.authService.getProfAll().subscribe(data=>{
                console.log(data)
               

                conDocente.dni.forEach((h: any, index: any, array: any) => {
                  data.dni.forEach((d: any, index: any, array: any) => {
                    if(h.Docente == d._id){
                      this.Horario.dni.push({
                        Docente: d.Apellidos+" "+d.Nombres,
                        Area: h.Area,
                        Asignatura: h.Asignatura,
                        Dia: h.Dia,
                        Inicio: h.Inicio,
                        Fin: h.Fin
                      });
                     }
                  });
                });

                console.table(this.Horario.dni)
                 //Lunes Matutina
              this.Horario.dni.forEach((element: any, index: any, array: any) => {
                if (element.Dia == 'LUNES') {
                  this.Lunes.dni.push(element);
                }
                if (element.Dia == 'MARTES') {
                  this.Martes.dni.push(element);
                }
                if (element.Dia == 'MIÉRCOLES') {
                  this.Miercoles.dni.push(element);
                }
                if (element.Dia == 'JUEVES') {
                  this.Jueves.dni.push(element);
                }
                if (element.Dia == 'VIERNES') {
                  this.Viernes.dni.push(element);
                }
                
              });

              this.ordenarHorario(this.Lunes.dni);
              this.ordenarHorario(this.Martes.dni);
              this.ordenarHorario(this.Miercoles.dni);
              this.ordenarHorario(this.Jueves.dni);
              this.ordenarHorario(this.Viernes.dni);

              });

            });

          });
        });
      }
    });
  }


  ordenarHorario(horario: any): any {
    horario.sort(((a: any, b: any) => {
      if (a.Inicio < b.Inicio) {
        return -1;
      } else if (a.Inicio > b.Inicio) {
        return 1;
      } else {
        return 0;
      }
    }));

  }

  loginData() {
    this.usuario = localStorage.getItem('user');
    const id = localStorage.getItem('id');
    if (id != null) {
      this.authService.obtenerEstudianteId(id).subscribe(data => {
        this.nombre = data.Apellidos + " " + data.Nombres;
      }, error => {
        console.log(error);
      });
    }


  }

  view() {
    const id = localStorage.getItem('id');
    this.router.navigateByUrl('/est/perfil/' + id);
  }

}
