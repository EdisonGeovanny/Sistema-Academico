import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-reg-est',
  templateUrl: './reg-est.component.html',
  styleUrls: ['./reg-est.component.css']
})
export class RegEstComponent implements OnInit {
  EstudianteForm: FormGroup;

  //titulo
  Titulo = 'Registrar Estudiante';
  id: string | null;

    //Genero
    Genero = [{ name: "Masculino" }, { name: "Femenino" }];
    elegido2: string = "";

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) { 
      this.EstudianteForm = this.fb.group({
        Codigo: ['', Validators.required],
        DNI: ['', Validators.required],
        Nombres: ['', Validators.required],
        Apellidos: ['', Validators.required],
        Fecha_nacimiento: ['', Validators.required],
        Direccion: ['', Validators.required],
        Estado: [''],
        Genero: ['', Validators.required],
        Observacion: ['', Validators.maxLength(200)],
      })
     this.id = this.aRouter.snapshot.paramMap.get('id')
    //  console.log(this.id)

    }

  ngOnInit(): void {
    this.esEditar();
  }


  //agregar datos o actualizar datos
 saveData(){
  if (this.id !== null) {
    this.upDate();
  }else{
    this.create();
  }
 }

 // Registrar
  create() {
    const ESTUDIANTE: Estudiante = {
      Codigo: this.EstudianteForm.get('Codigo')?.value,
      DNI: this.EstudianteForm.get('DNI')?.value,
      Nombres: this.EstudianteForm.get('Nombres')?.value,
      Apellidos: this.EstudianteForm.get('Apellidos')?.value,
      Fecha_nacimiento: this.EstudianteForm.get('Fecha_nacimiento')?.value,
      Direccion: this.EstudianteForm.get('Direccion')?.value,
      Estado: this.EstudianteForm.get('Estado')?.value,
      Genero: this.EstudianteForm.get('Genero')?.value,
      Observacion: this.EstudianteForm.get('Observacion')?.value,
    }
    console.log(ESTUDIANTE);
    this.authService.registerEst(ESTUDIANTE).subscribe(data => {
      this.EstudianteForm.reset();
      this.AlertExito()
    }, err => {
      console.log(err);
      this.AlertFracaso();
      //this.ProfesoresForm.reset();
    })


  }

  //Obtener datos para Editar
  esEditar() {
    if (this.id !== null) {
      this.Titulo = 'Editar Registro de Estudiante';

      this.authService.obtenerEstudianteId(this.id).subscribe(data => {

        this.EstudianteForm.setValue({
          Codigo: data.Codigo,
          DNI: data.DNI,
          Nombres: data.Nombres,
          Apellidos: data.Apellidos,
          Fecha_nacimiento: data.Fecha_nacimiento,
          Direccion: data.Direccion,
          Estado: data.Estado,
          Genero: data.Genero,
          Observacion: data.Observacion
        })
      })
    }
  }

  //editar
  upDate() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "¡Se actualizarán los datos ingresados!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.id !== null) {
      
          const ESTUDIANTE: Estudiante = {
           Codigo:this.EstudianteForm.get('Codigo')?.value,
            DNI: this.EstudianteForm.get('DNI')?.value,
            Nombres: this.EstudianteForm.get('Nombres')?.value,
            Apellidos: this.EstudianteForm.get('Apellidos')?.value,
            Fecha_nacimiento: this.EstudianteForm.get('Fecha_nacimiento')?.value,
            Direccion: this.EstudianteForm.get('Direccion')?.value,
            Estado: this.EstudianteForm.get('Estado')?.value,
            Genero: this.EstudianteForm.get('Genero')?.value,
            Observacion: this.EstudianteForm.get('Observacion')?.value,
          }
          console.log(ESTUDIANTE);
          this.authService.updateEst(this.id,ESTUDIANTE).subscribe(data => {
            this.esEditar();
            this.AlertExito2();
          }, err => {
            console.log(err);
            this.AlertFracaso();
            //this.ProfesoresForm.reset();
          })
      
      
        }

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Tu registro fue actualizado.',
          'success'
        )
      }   
    })
    
  }

////////////////////////Redirecciones ////////////////////

RedirectCancel(): void {
  this.EstudianteForm.reset();
}

  ///////////   ventanas de alerta    ///////////////////
  AlertExito(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Tu registro ha sido guardado',
      showConfirmButton: false,
      timer: 1500
    })
  }

  AlertExito2(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Tu registro ha sido actualizado',
      showConfirmButton: false,
      timer: 1500
    })
  }


  AlertFracaso(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Conficto..!<br>'+
      'Existe un registro con el mismo número de identificación',
      showConfirmButton: false,
      timer: 2500
    })
  }

}
