import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Profesor } from '../../../models/profesor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent implements OnInit {
  ProfesoresForm: FormGroup;

  //titulo
  Titulo = 'Registrar Docente';
  id: string | null;

  //Nombramiento
  Nombramiento = [{ name: "Nombramiento Provisional" },
  { name: "Nombramiento Definitivo" }, { name: "Contrato" }];
  elegido1: string = "";

  //Genero
  Genero = [{ name: "Masculino" }, { name: "Femenino" }];
  elegido2: string = "";

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.ProfesoresForm = this.fb.group({
      DNI: ['', Validators.required],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Fecha_ingreso_magisterio: ['', Validators.required],
      Fecha_ingreso_institucion: ['', Validators.required],
      Titulo_profesional: ['', Validators.required],
      Años_servicio: ['', Validators.required],
      Condicion_laboral: ['', Validators.required],
      Fecha_nacimiento: ['', Validators.required],
      Direccion: ['', Validators.required],
      Email: ['', Validators.required],
      Telefono: ['', Validators.required],
      Celular: ['', Validators.required],
      Estado: [''],
      Genero: ['', Validators.required],
      Observacion: ['', Validators.maxLength(200)],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
    console.log(this.id)
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
    const PROFESOR: Profesor = {
      DNI: this.ProfesoresForm.get('DNI')?.value,
      Nombres: this.ProfesoresForm.get('Nombres')?.value,
      Apellidos: this.ProfesoresForm.get('Apellidos')?.value,
      Fecha_ingreso_magisterio: this.ProfesoresForm.get('Fecha_ingreso_magisterio')?.value,
      Fecha_ingreso_institucion: this.ProfesoresForm.get('Fecha_ingreso_institucion')?.value,
      Titulo_profesional: this.ProfesoresForm.get('Titulo_profesional')?.value,
      Años_servicio: this.ProfesoresForm.get('Años_servicio')?.value,
      Condicion_laboral: this.ProfesoresForm.get('Condicion_laboral')?.value,
      Fecha_nacimiento: this.ProfesoresForm.get('Fecha_nacimiento')?.value,
      Direccion: this.ProfesoresForm.get('Direccion')?.value,
      Email: this.ProfesoresForm.get('Email')?.value,
      Telefono: this.ProfesoresForm.get('Telefono')?.value,
      Celular: this.ProfesoresForm.get('Celular')?.value,
      Estado: this.ProfesoresForm.get('Estado')?.value,
      Genero: this.ProfesoresForm.get('Genero')?.value,
      Observacion: this.ProfesoresForm.get('Observacion')?.value,
    }
    console.log(PROFESOR);
    this.authService.registerDA(PROFESOR).subscribe(data => {
      this.ProfesoresForm.reset();
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
      this.Titulo = 'Editar Profesor';

      this.authService.obtenerPorfesorId(this.id).subscribe(data => {

        this.ProfesoresForm.setValue({
          DNI: data.DNI,
          Nombres: data.Nombres,
          Apellidos: data.Apellidos,
          Fecha_ingreso_magisterio: data.Fecha_ingreso_magisterio,
          Fecha_ingreso_institucion: data.Fecha_ingreso_institucion,
          Titulo_profesional: data.Titulo_profesional,
          Años_servicio: data.Años_servicio,
          Condicion_laboral: data.Condicion_laboral,
          Fecha_nacimiento: data.Fecha_nacimiento,
          Direccion: data.Direccion,
          Email: data.Email,
          Telefono: data.Telefono,
          Celular: data.Celular,
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
      
          const PROFESOR: Profesor = {
            DNI: this.ProfesoresForm.get('DNI')?.value,
            Nombres: this.ProfesoresForm.get('Nombres')?.value,
            Apellidos: this.ProfesoresForm.get('Apellidos')?.value,
            Fecha_ingreso_magisterio: this.ProfesoresForm.get('Fecha_ingreso_magisterio')?.value,
            Fecha_ingreso_institucion: this.ProfesoresForm.get('Fecha_ingreso_institucion')?.value,
            Titulo_profesional: this.ProfesoresForm.get('Titulo_profesional')?.value,
            Años_servicio: this.ProfesoresForm.get('Años_servicio')?.value,
            Condicion_laboral: this.ProfesoresForm.get('Condicion_laboral')?.value,
            Fecha_nacimiento: this.ProfesoresForm.get('Fecha_nacimiento')?.value,
            Direccion: this.ProfesoresForm.get('Direccion')?.value,
            Email: this.ProfesoresForm.get('Email')?.value,
            Telefono: this.ProfesoresForm.get('Telefono')?.value,
            Celular: this.ProfesoresForm.get('Celular')?.value,
            Estado: this.ProfesoresForm.get('Estado')?.value,
            Genero: this.ProfesoresForm.get('Genero')?.value,
            Observacion: this.ProfesoresForm.get('Observacion')?.value,
          }
          console.log(PROFESOR);
          this.authService.updateDocente(this.id,PROFESOR).subscribe(data => {
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
    this.ProfesoresForm.reset();
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
