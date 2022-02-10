import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  //titulo
  Titulo = 'CALIFICACIONES DEL ALUMNO';
  subnivel = 'NOTAS';


  //hablilitar notas
  q1p1: boolean ;
  q1p2: boolean ;
  q2p1: boolean ;
  q2p2: boolean ;
  q1exam: boolean ;
  q2exam: boolean ;



  //variables Notas Q1
  Q1P1: number = 0;
  Q1P2: number = 0;
  Q1PROM: number = 0;
  Q1PROM80: number = 0;
  Q1EXAM: number = 0;
  Q1EXAM20: number = 0;
  Q1QUI: number = 0;
  Q1EC: string = "";

  //variables Notas Q2
  Q2P1: number = 0;
  Q2P2: number = 0;
  Q2PROM: number = 0;
  Q2PROM80: number = 0;
  Q2EXAM: number = 0;
  Q2EXAM20: number = 0;
  Q2QUI: number = 0;
  Q2EC: string = "";

//promedio final
 PA: number = 0;
 AEC: string = "";

  public nota: any = {
    dni: []
  }

  public datos: any = {
  }
  nombre: string | null;
  usuario: string | null;

  area: string | null;
  asignatura: string | null;

  per: string | null;
  jor: string | null;
  niv: string | null;
  par: string | null;
  dis: string | null;


  id: string | null;
  nombree: string | null;


  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.nombre = null,
      this.nombree = null,
      this.usuario = null,
      this.area = null,
      this.asignatura = null,
      this.per = null,
      this.jor = null,
      this.niv = null,
      this.par = null,
      this.dis = null,
      this.q1p1 = false,
      this.q1p2 = false,
      this.q2p1 = false,
      this.q2p2 = false,
      this.q1exam = false,
      this.q2exam = false
  }

  ngOnInit(): void {
    this.loginData();
    this.obtenerNota();
    this.activarNotas();

  }

activarNotas() {
  this.authService.getANAll().subscribe(data => {
    console.log('notas activas: ',data.dni[0].Q1P1);
    this.q1p1 = Boolean(data.dni[0].Q1P1);
    this.q1p2 = data.dni[0].Q1P2;
    this.q1exam = data.dni[0].Q1EXAM;
    this.q2p1 = data.dni[0].Q2P1;
    this.q2p2 = data.dni[0].Q2P2;
    this.q2exam = data.dni[0].Q2EXAM;

  })
}

  obtenerNota() {
    if (this.id !== null) {
      this.authService.obtenerNotaId(this.id).subscribe(data => {
        this.area = data.Area;
        this.asignatura = data.Asignatura;
        this.per = data.Periodo;
        this.jor = data.Jornada;
        this.niv = data.Nivel;
        this.par = data.Paralelo;
        this.dis = data.Distributivo[0];


        this.Q1P1 = data.Q1P1;
        this.Q1P2 = data.Q1P2;
        this.Q1PROM = this.Promedio(data.Q1P1, data.Q1P2);
        this.Q1PROM80 = this.porciento80(this.Q1PROM);
        this.Q1EXAM = data.Q1EXAM;
        this.Q1EXAM20 = this.porciento20(this.Q1EXAM);
        this.Q1QUI = this.notaQui(this.Q1PROM80, this.Q1EXAM20);
        this.Q1EC = this.CE(this.Q1QUI);


        this.Q2P1 = data.Q2P1;
        this.Q2P2 = data.Q2P2;
        this.Q2PROM = this.Promedio(data.Q2P1, data.Q2P2);
        this.Q2PROM80 = this.porciento80(this.Q2PROM);
        this.Q2EXAM = data.Q2EXAM;
        this.Q2EXAM20 = this.porciento20(this.Q2EXAM);
        this.Q2QUI = this.notaQui(this.Q2PROM80, this.Q2EXAM20);
        this.Q2EC = this.CE(this.Q2QUI);


        this.PA = this.Promedio(this.Q1QUI, this.Q2QUI);
        this.AEC = this.CE(this.PA);


        this.obtenerEstudiante(data.Estudiante[0]);
      });
    }
  }

  Promedio(p1: number, p2: number): number {
    const promedio: number = (p1 + p2) / 2;
    return parseFloat(promedio.toFixed(2));
  }

  porciento80(prom: number): number {
    const respuesta: number = (prom) * 0.80;
    return parseFloat(respuesta.toFixed(2));
  }

  porciento20(exam: number): number {
    const respuesta: number = (exam) * 0.20;
    return parseFloat(respuesta.toFixed(2));
  }

  notaQui(prom: number, exam: number): number {
    const respuesta: number = prom + exam;
    return parseFloat(respuesta.toFixed(2));
  }

  CE(promQ1: number): string {
    let respuesta: string = "";
    if (promQ1 > 6.99) {
      respuesta = "S/A";
    } else {
      respuesta = "N/A";
    }
    return respuesta;
  }

  obtenerEstudiante(ide: any) {
    if (ide != null) {
      this.authService.obtenerEstudianteId(ide).subscribe(data => {
        this.nombree = data.Apellidos + " " + data.Nombres;
      }, error => {
        console.log(error);
      });
    }


  }


  Guardar() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "¡Se registrarán los datos ingresados!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.id !== null) {
          const NOTAS = {
            Q1P1: this.Q1P1,
            Q1P2: this.Q1P2,
            Q1EXAM: this.Q1EXAM,

            Q2P1: this.Q2P1,
            Q2P2: this.Q2P2,
            Q2EXAM: this.Q2EXAM,
          }

          this.authService.updateNota(this.id, NOTAS).subscribe(data => {
            swalWithBootstrapButtons.fire(
              'Registrado!',
              'El cambio fue guardado.',
              'success'
            )
            this.obtenerNota();
          }, error => {
            console.log(error);
          });
        }

      }
    })


  }

  Regresar() {
    this.router.navigateByUrl('/prof/lista/' + this.dis);
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
