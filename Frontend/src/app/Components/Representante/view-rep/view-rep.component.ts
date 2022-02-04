import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-view-rep',
  templateUrl: './view-rep.component.html',
  styleUrls: ['./view-rep.component.css']
})
export class ViewRepComponent implements OnInit {

  //Objeto
  representante: any = {
 
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
  if (this.id !== null) {

    this.authService.obtenerRepresentanteId(this.id).subscribe(data => {
      
      if(data.Estado){
         this.estado = "activo";
        }else{ this.estado = "Suspendido";}

      this.representante = {
       
        Parentesco: data.Parentesco,
        Tipo_documento: data.Tipo_documento,
        DNI: data.DNI,
        Nombres: data.Nombres,
        Apellidos: data.Apellidos,
        Genero: data.Genero,
        Estado_civil : data.Estado_civil,
        Fecha_nacimiento: data.Fecha_nacimiento,
        Lugar_nacimiento: data.Lugar_nacimiento,
        Nacionalidad: data.Nacionalidad,
        Etnia: data.Etnia,
        Grupo_sanguineo: data.Grupo_sanguineo,
        Tipo_discapacidad: data.Tipo_discapacidad,
        Carnet_discapacidad: data.Carnet_discapacidad,
        Porcentaje_discapacidad: data.Porcentaje_discapacidad,
        Observacion_medica: data.Observacion_medica,
        Nivel_educacion: data.Nivel_educacion,
        Actividad: data.Actividad,
        Area: data.Area,
        Sector_domicilio: data.Sector_domicilio,
        Referencia_domicilio: data.Referencia_domicilio,
        Direccion: data.Direccion,
        Profesion: data.Profesion,
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
