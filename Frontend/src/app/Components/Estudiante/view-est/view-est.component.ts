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

    this.authService.obtenerEstudianteId(this.id).subscribe(data => {
      
      if(data.Estado){
         this.estado = "habilitado";
        }else{ this.estado = "deshabilitado";}

      this.estudiante = {
        Codigo: data.Codigo,
        DNI: data.DNI,
        Apellidos:data.Apellidos,
        Nombres: data.Nombres,
        Fecha_nacimiento: data.Fecha_nacimiento,
        Direccion: data.Direccion,
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
