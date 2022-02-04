import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-view-est',
  templateUrl: './view-est.component.html',
  styleUrls: ['./view-est.component.css']
})
export class ViewEstComponent implements OnInit {

  //Objeto
  estudiante: any = {
 
  }
  //id
  id: string | null;
  Hora:Date | null;
  estado: string | null;


  nombre : string | null;
  usuario: string | null;
  usuarioEst: string | null;
  Rol: string | null;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) { 
       
    this.id = this.aRouter.snapshot.paramMap.get('id'),
    this.Hora = new Date(),
    this.estado = "",
    this.nombre = '';
    this.usuario = '';
    this.usuarioEst = null;
    this.Rol= null;
    }

  ngOnInit(): void {
    this.esEditar();
    this.loginData();
    this.obtenerAcceso()
  }

  
  //Obtener datos para Editar
 async esEditar() {
  if (this.id !== null) {

    this.authService.obtenerEstudianteId(this.id).subscribe(data => {
      
      if(data.Estado){
         this.estado = "Activo";
        }else{ this.estado = "Suspendido";}

      this.estudiante = {
        Tipo_documento: data.Tipo_documento,
        Codigo: data.Codigo,
        DNI: data.DNI,
        Apellidos:data.Apellidos,
        Nombres: data.Nombres,
        Genero: data.Genero,
        Estado_civil : data.Estado_civil,
        Fecha_nacimiento: data.Fecha_nacimiento,
        Lugar_nacimiento: data.Lugar_nacimiento,
        Etnia : data.Etnia,
        Nacionalidad : data.Nacionalidad,
        Grupo_sanguineo: data.Grupo_sanguineo,
        Tipo_discapacidad: data.Tipo_discapacidad,
        Carnet_discapacidad: data.Carnet_discapacidad,
        Porcentaje_discapacidad: data.Porcentaje_discapacidad,
        Direccion: data.Direccion,
        Sector_domicilio: data.Sector_domicilio,
        Referencia_domicilio: data.Referencia_domicilio,
        Observacion_medica: data.Observacion_medica,
        Estado: this.estado,
        Observacion: data.Observacion
      }
    });
  }
}

async obtenerAcceso(){
  if (this.id !== null) {
  this.authService.obtenerUsuarioPorId(this.id).subscribe(data=>{
    console.log(data)
    this.usuarioEst = data.dni[0].Usuario,
    this.Rol = data.dni[0].Rol
  });
}

}

logOut(){
  this.authService.logoutA();
  this.router.navigateByUrl('/app/log-admin')
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
 this.router.navigateByUrl('/admin/view-prof/'+id);
}

  //imprimir
Print(){
  printJS({
    printable:'PrintForm1',
    type: 'html',
    targetStyles: ['*'],
    ignoreElements:['ignore'],
    header: '<h2>Unidad Educativa Comunitaria Intercultural Bilingüe "Benito Juárez"</h2>'
  })
  }
  

}
