import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
//Objeto
profesor: any = {
 
}
//id
id: string | null;
Hora:Date | null;
estado: string | null;

nombre : string | null;
usuario: string | null;

constructor(private authService: AuthService, private router: Router,
  private fb: FormBuilder, private aRouter: ActivatedRoute) {
  
  this.id = this.aRouter.snapshot.paramMap.get('id'),
  this.Hora = new Date(),
  this.estado = "",
  this.nombre = '';
  this.usuario = '';
}

  ngOnInit(): void {
    this.esEditar();
    this.loginData();
  }

    //Obtener datos para Editar
 async esEditar() {
  const id = localStorage.getItem('id');
  this.id = id;
  if (this.id !== null) {

    this.authService.obtenerPorfesorId(this.id).subscribe(data => {
      
      if(data.Estado){
         this.estado = "Activo";
        }else{ this.estado = "Suspendido";}

      this.profesor = {
        Tipo_documento: data.Tipo_documento,
        DNI: data.DNI,
        Nombres: data.Nombres +" "+ data.Apellidos,
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
        Observacion_medica: data.Observacion_medica,
        Nivel_educacion: data.Nivel_educacion,
        Institucion: data.Institucion,
        Lugar_institucion: data.Lugar_institucion,
        Tipo_institucion: data.Tipo_institucion,
        Especialidad: data.Especialidad,
        Nota_grado: data.Nota_grado,
        Fecha_grado: data.Fecha_grado,
        Fecha_ingreso_magisterio: data.Fecha_ingreso_magisterio,
        Fecha_ingreso_institucion: data.Fecha_ingreso_institucion,
        servicio: data.Años_servicio,
        Condicion_laboral: data.Condicion_laboral,
        Direccion: data.Direccion,
        Sector_domicilio: data.Sector_domicilio,
        Referencia_domicilio: data.Referencia_domicilio,
        Nombre_emergente: data.Nombre_emergente,
        Contacto_emergente: data.Contacto_emergente,
        Email: data.Email,
        Telefono: data.Telefono,
        Celular: data.Celular,
        Estado: this.estado,
        Observacion: data.Observacion
      }
    })

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
 this.router.navigateByUrl('/prof/perfil/'+this.id);
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
Regresar() {
  this.router.navigateByUrl('/prof/aulas');
}
}
