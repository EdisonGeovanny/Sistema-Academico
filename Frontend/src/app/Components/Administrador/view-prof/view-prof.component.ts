import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-view-prof',
  templateUrl: './view-prof.component.html',
  styleUrls: ['./view-prof.component.css']
})
export class ViewProfComponent implements OnInit {
 //Objeto
  profesor: any = {
 
  }
  //id
  id: string | null;
  Hora:Date | null;
  estado: string | null;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    
    this.id = this.aRouter.snapshot.paramMap.get('id'),
    this.Hora = new Date(),
    this.estado = "",
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }


  //Obtener datos para Editar
 async esEditar() {
    if (this.id !== null) {

      this.authService.obtenerPorfesorId(this.id).subscribe(data => {
        
        if(data.Estado){
           this.estado = "habilitado";
          }else{ this.estado = "deshabilitado";}

        this.profesor = {
          DNI: data.DNI,
          Nombres: data.Nombres +" "+ data.Apellidos,
          Fecha_ingreso_magisterio: data.Fecha_ingreso_magisterio,
          Fecha_ingreso_institucion: data.Fecha_ingreso_institucion,
          Titulo_profesional: data.Titulo_profesional,
          servicio: data.Años_servicio,
          Condicion_laboral: data.Condicion_laboral,
          Fecha_nacimiento: data.Fecha_nacimiento,
          Direccion: data.Direccion,
          Email: data.Email,
          Telefono: data.Telefono,
          Celular: data.Celular,
          Estado: this.estado,
          Genero: data.Genero,
          Observacion: data.Observacion
        }
      })

    }
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
