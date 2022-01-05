import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Profesor } from '../../../models/profesor';
import Swal from 'sweetalert2';
import { Representante } from 'src/app/models/representante';

@Component({
  selector: 'app-reg-rep',
  templateUrl: './reg-rep.component.html',
  styleUrls: ['./reg-rep.component.css']
})
export class RegRepComponent implements OnInit {

  RepresentantesForm: FormGroup;

  //titulo
  Titulo = 'Registrar Representante';
  id: string | null;

  //Parentesco
  Parentesco = [{ name: "Padre" },{ name: "Madre" }, { name: "Abuelo" },
   { name: "Abuela" }, { name: "Tio" }, { name: "Tia" }];
  elegido1: string = "";

    //Estado civil
    EstadoCivil = [{ name: "Solter@" }, { name: "Casad@" }, { name: "Divorciad@" },
    { name: "Viud@" }];
    elegido3: string = "";

  //Genero
  Genero = [{ name: "Masculino" }, { name: "Femenino" }];
  elegido2: string = "";

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
      this.RepresentantesForm = this.fb.group({
        Parentesco: ['', Validators.required],
        DNI: ['', Validators.required],
        Nombres: ['', Validators.required],
        Apellidos: ['', Validators.required],
        Fecha_nacimiento: ['', Validators.required],
        Direccion: ['', Validators.required],
        Estado_civil: ['', Validators.required],
        Profesion: ['', Validators.required],
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
    const REPRESENTANTE: Representante = {
      Parentesco: this.RepresentantesForm.get('Parentesco')?.value,
      DNI: this.RepresentantesForm.get('DNI')?.value,
      Nombres: this.RepresentantesForm.get('Nombres')?.value,
      Apellidos: this.RepresentantesForm.get('Apellidos')?.value,
      Fecha_nacimiento: this.RepresentantesForm.get('Fecha_nacimiento')?.value,
      Direccion: this.RepresentantesForm.get('Direccion')?.value,
      Estado_civil: this.RepresentantesForm.get('Estado_civil')?.value,
      Profesion: this.RepresentantesForm.get('Profesion')?.value,
      Email: this.RepresentantesForm.get('Email')?.value,
      Telefono: this.RepresentantesForm.get('Telefono')?.value,
      Celular: this.RepresentantesForm.get('Celular')?.value,
      Estado: this.RepresentantesForm.get('Estado')?.value,
      Genero: this.RepresentantesForm.get('Genero')?.value,
      Observacion: this.RepresentantesForm.get('Observacion')?.value,
    }
    console.log(REPRESENTANTE);
    this.authService.registerRep(REPRESENTANTE).subscribe(data => {
      this.RepresentantesForm.reset();
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
      this.Titulo = 'Editar Representante';

      this.authService.obtenerRepresentanteId(this.id).subscribe(data => {
console.log(data);
        this.RepresentantesForm.setValue({
          Parentesco: data.Parentesco,
          DNI: data.DNI,
          Nombres: data.Nombres,
          Apellidos: data.Apellidos,
          Fecha_nacimiento: data.Fecha_nacimiento,
          Direccion: data.Direccion,
          Estado_civil: data.Estado_civil,
          Profesion: data.Profesion,
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
      
          const REPRESENTANTE: Representante = {
            Parentesco: this.RepresentantesForm.get('Parentesco')?.value,
            DNI: this.RepresentantesForm.get('DNI')?.value,
            Nombres: this.RepresentantesForm.get('Nombres')?.value,
            Apellidos: this.RepresentantesForm.get('Apellidos')?.value,
            Fecha_nacimiento: this.RepresentantesForm.get('Fecha_nacimiento')?.value,
            Direccion: this.RepresentantesForm.get('Direccion')?.value,
            Estado_civil: this.RepresentantesForm.get('Estado_civil')?.value,
            Profesion: this.RepresentantesForm.get('Profesion')?.value,
            Email: this.RepresentantesForm.get('Email')?.value,
            Telefono: this.RepresentantesForm.get('Telefono')?.value,
            Celular: this.RepresentantesForm.get('Celular')?.value,
            Estado: this.RepresentantesForm.get('Estado')?.value,
            Genero: this.RepresentantesForm.get('Genero')?.value,
            Observacion: this.RepresentantesForm.get('Observacion')?.value,
          }
          console.log(REPRESENTANTE);
          this.authService.updateRepresentante(this.id,REPRESENTANTE).subscribe(data => {
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
    this.RepresentantesForm.reset();
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
