import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-view-ficha',
  templateUrl: './view-ficha.component.html',
  styleUrls: ['./view-ficha.component.css']
})

export class ViewFichaComponent implements OnInit {
  hermanos: any = { dato: [] }
  institucion: any = { dato: [] }
  i: any = []
  i2: any = []
  FichaForm: FormGroup;


  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.FichaForm = this.fb.group({
      Nombre: ['', Validators.required],
      Edad: ['', Validators.required],
      Puesto: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }



  agregar() {

    const HERMANO: any = {
      Nombre: this.FichaForm.get('Nombre')?.value,
      Edad: this.FichaForm.get('Edad')?.value,
      Puesto: this.FichaForm.get('Puesto')?.value
    }


    this.hermanos.dato.push({
      nombre: HERMANO.Nombre,
      edad: HERMANO.Edad,
      puesto: HERMANO.Puesto
    });


    this.i.push(HERMANO.Nombre)

    console.log(this.i)
    console.log(this.hermanos.dato)


  }


  borrar(nombre: any) {
  
    this.i.forEach((element: any, index:any, array:any) => {
      this
      if(nombre == element){
        this.hermanos.dato.splice(index, 1);
        this.i.splice(index, 1);

        console.log(this.hermanos)
        console.log(this.i)
      }
    });


  }


  //limpiar array
  limpiar() {
    this.hermanos.dato.splice(0, this.hermanos.dato.length)
    this.i.splice(0, this.hermanos.dato.length)
    console.log(this.hermanos);
    console.log(this.i);

  }

  enviar(nombre:any){

    this.i.forEach((element: any, index:any, array:any) => {
      if(nombre == element){
        console.log(this.hermanos.dato[index])
        this.institucion.dato.push(this.hermanos.dato[index])
        this.i2.push(element)
        console.log(this.institucion)
      }
    });


  }

  borrar2(nombre: any) {
   
      this.i2.forEach((element: any, index:any, array:any) => {
        this
        if(nombre == element){
          this.institucion.dato.splice(index, 1);
          this.i2.splice(index, 1);
  
          console.log(this.institucion)
          console.log(this.i2)
        }
      });
  
    }



    limpiar2() {
      this.institucion.dato.splice(0, this.institucion.dato.length)
      this.i2.splice(0, this.institucion.dato.length)
      console.log(this.institucion);
      console.log(this.i2);
  
    }


}




