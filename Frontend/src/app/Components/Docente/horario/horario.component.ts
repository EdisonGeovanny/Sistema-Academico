import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  //titulo
  Titulo = 'CRONOGRAMA DE CLASES';
  subnivel = 'HORARIO';

  nombre: string | null;
  usuario: string | null;
  per: string | null;
  jor: string | null;
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

  //Vespertina 
  public Lunesv: any = {
    dni: []
  }
  public Martesv: any = {
    dni: []
  }
  public Miercolesv: any = {
    dni: []
  }
  public Juevesv: any = {
    dni: []
  }
  public Viernesv: any = {
    dni: []
  }

  //otros
  public materias: any = {
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
      this.per = null,
      this.jor = null

  }

  ngOnInit(): void {
    this.loginData();
    this.obtenerHorario();
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

  obtenerHorario() {
    //obtener Periodos activos
    this.authService.obtenerPeriodoEstado().subscribe(data => {
      this.per = data.dni[0].Codigo;

      const id = localStorage.getItem('id');
      if (id != null) {
        //obtener distributivo de docente cession y periodo activo
        this.authService.obtenerDistributivoxDocentePeriodo(id + "," + this.per).subscribe(data => {
          this.materias.dni = data;

          this.materias.dni.forEach((element: any, index: any, array: any) => {
            this.materias.dni[index].Horario.forEach((item: any, index: any, array: any) => {

              this.Horario.dni.push({
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


         // console.log('Horario: ', this.Horario.dni)
         
          //Lunes Matutina
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'MATUTINA') {
              if (element.Dia == 'LUNES') {
                this.Lunes.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Lunes.dni);


          //Martes Matutina
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'MATUTINA') {
              if (element.Dia == 'MARTES') {
                this.Martes.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Martes.dni);

          //Miercoles Matutina
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'MATUTINA') {
              if (element.Dia == 'MIERCOLES') {
                this.Miercoles.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Miercoles.dni);


          //Jueves Matutina
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'MATUTINA') {
              if (element.Dia == 'JUEVES') {
                this.Jueves.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Jueves.dni);


          //Viernes Matutina
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'MATUTINA') {
              if (element.Dia == 'VIERNES') {
                this.Viernes.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Viernes.dni);


          //Lunes VESPERTINA
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'VESPERTINA') {
              if (element.Dia == 'LUNES') {
                this.Lunesv.dni.push(element);
              }
            }
          });
          this.ordenarHorario(this.Lunesv.dni);
        



          //Martes VESPERTINA
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'VESPERTINA') {
              if (element.Dia == 'MARTES') {
                this.Martesv.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Martesv.dni);

          //Miercoles VESPERTINA
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'VESPERTINA') {
              if (element.Dia == 'MIERCOLES') {
                this.Miercolesv.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Miercolesv.dni);


          //Jueves VESPERTINA
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'VESPERTINA') {
              if (element.Dia == 'JUEVES') {
                this.Juevesv.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Juevesv.dni);


          //Viernes Vespertina
          this.Horario.dni.forEach((element: any, index: any, array: any) => {
            if (element.Jornada == 'VESPERTINA') {
              if (element.Dia == 'VIERNES') {
                this.Viernesv.dni.push(element);
              }
            }
          });

          this.ordenarHorario(this.Viernesv.dni);


        });
      }
    });


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
}
