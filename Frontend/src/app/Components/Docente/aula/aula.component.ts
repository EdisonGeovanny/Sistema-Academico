import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {
//titulo
Titulo = 'LISTA DE GRADOS ASIGNADA';
subnivel = 'LISTA DE GRADOS';
name_n = 'TABLA JORNADA VESPERTINA';
 //formGroup
 GradoForm: FormGroup;

  public periodo: any = {
    dni: []
  }

  public distributivoV: any = {
    dni: []
  }
  public distributivoM: any = {
    dni: []
  }

  public data: any = {
    dni: []
  }

  nombre : string | null;
  usuario: string | null;
  
  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.GradoForm = this.fb.group({
     
    }),
    this.nombre = null,
    this.usuario = null
   
  }


  ngOnInit(): void {
    this.PeriodoLectivo();
    this.AulaJornadaVespertina();
    this.AulaJornadaMatutina();
    this.loginData();
  }

  async PeriodoLectivo() {

    //obtener nivel para combobox
    const Obtenern = new Promise(async (resolve, reject) => {
      await this.authService.obtenerPeriodoEstado().subscribe(data => {
        resolve(data)
      })
    });

    this.periodo = await Obtenern.then(res => res);

  }

  async AulaJornadaVespertina() {
    //obtener nivel para combobox
    const idD = localStorage.getItem('id');
    if (idD !== null) {
      const Obtener = new Promise(async (resolve, reject) => {
        await this.authService.obtenerDistributivoporDocente(idD).subscribe(data => {
          resolve(data)
        })
      });

      this.data.dni = await Obtener.then(res => res);

      this.periodo.dni.forEach((p: any, i: any, array: any) => {
        this.data.dni.forEach((d: any, j: any, array: any) => {
          if (p.Codigo == d.Periodo) {
            if (d.Jornada == 'VESPERTINA') {
              this.distributivoV.dni.push(d);
            }
          }
        });
      });
    }
  }

  async AulaJornadaMatutina() {
    //obtener nivel para combobox
    const idD = localStorage.getItem('id');
    if (idD !== null) {
      const Obtener = new Promise(async (resolve, reject) => {
        await this.authService.obtenerDistributivoporDocente(idD).subscribe(data => {
          resolve(data)
        })
      });

      this.data.dni = await Obtener.then(res => res);

      this.periodo.dni.forEach((p: any, i: any, array: any) => {
        this.data.dni.forEach((d: any, j: any, array: any) => {
          if (p.Codigo == d.Periodo) {
            if (d.Jornada == 'MATUTINA') {
              this.distributivoM.dni.push(d);
            }
          }
        });
      });

    }
  }


  logOut(){
    this.authService.logoutA();
    this.router.navigateByUrl('/app/log-prof')
  }
  
  
  loginData(){
   this.usuario = localStorage.getItem('user');
   const id = localStorage.getItem('id');
   if(id!=null){
     this.authService.obtenerPorfesorId(id).subscribe(data => {
     this.nombre = data.Apellidos+" "+data.Nombres;
     }, error => {
       console.log(error);
     });
   }
   
  
  }
  
  view() {
   const id = localStorage.getItem('id');
   this.router.navigateByUrl('/prof/perfil/'+id);
  }
  
  obtenerlista(id:string) {
    this.router.navigateByUrl('/prof/lista/'+id);
  }

  unidadesNotas(id:string) {
    this.router.navigateByUrl('/prof/U1/'+id);
  }

}
