import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reg-est',
  templateUrl: './reg-est.component.html',
  styleUrls: ['./reg-est.component.css']
})
export class RegEstComponent implements OnInit {
  EstudianteForm: FormGroup;

  //titulo
  Titulo = 'ESTUDIANTE: REGISTRO DE INFORMACIÓN';
  subnivel = 'REGISTRO DE DATOS';
  id: string | null;

  //Genero
  Genero = [{ name: "Seleccionar opción" }, { name: "Masculino" }, { name: "Femenino" }];
  elegido2: string = "";


  //Documento
  Documento = [{ name: "Seleccionar opción" }, { name: "Cédula de identidad" }, { name: "Pasaporte" }, { name: "Licencia de conducir" },
  { name: "Identificación militar" }, { name: "Residencia permanente" }];
  elegido3: string = "";


  //Estado_civil
  Estado_civil = [{ name: "Seleccionar opción" }, { name: "Soltero(a)" }, { name: "Casado(a)" }, { name: "Divorciado(a)" },
  { name: "Viudo(a)" }];
  elegido4: string = "";

  //Tipo Sangre
  Sangre = [{ name: "Seleccionar opción" }, { name: "Desconicido" }, { name: "O positivo" }, { name: "O negativo" }, { name: "A positivo" }, { name: "A negativo" },
  { name: "B positivo" }, { name: "B negativo" }, { name: "AB positivo" }, { name: "AB negativo" }];
  elegido5: string = "";

  //Tipo Discapacidad
  Discapacidad = [{ name: "Seleccionar opción" }, { name: "Ninguna" }, { name: "Discapacidad Física o Motora" }, { name: "Discapacidad Sensorial" },
  { name: "Discapacidad Intelectual" }, { name: "Discapacidad Psíquica" }];
  elegido6: string = "";




  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.EstudianteForm = this.fb.group({
      Tipo_documento: ['', Validators.required],
      Codigo: ['', Validators.required],
      DNI: ['', Validators.required],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Genero: ['', Validators.required],
      Estado_civil: ['', Validators.required],
      Fecha_nacimiento: ['', Validators.required],
      Lugar_nacimiento: ['', Validators.required],
      Nacionalidad: ['', Validators.required],
      Etnia: ['', Validators.required],
      Grupo_sanguineo: [''],
      Observacion_medica: [''],
      Tipo_discapacidad: [''],
      Carnet_discapacidad: [''],
      Porcentaje_discapacidad: ['', Validators.maxLength(5)],
      Direccion: ['', Validators.required],
      Sector_domicilio: ['', Validators.required],
      Referencia_domicilio: ['', Validators.required],
      Estado: [''],
      Observacion: ['', Validators.maxLength(200)],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
    //  console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }


  //agregar datos o actualizar datos
  saveData() {
    if (this.id !== null) {
      this.upDate();
    } else {
      this.create();
    }
  }

  // Registrar
  create() {
    const ESTUDIANTE: any = {
      Codigo: this.EstudianteForm.get('Codigo')?.value,
      Tipo_documento: this.EstudianteForm.get('Tipo_documento')?.value,
      DNI: this.EstudianteForm.get('DNI')?.value,
      Nombres: this.EstudianteForm.get('Nombres')?.value,
      Apellidos: this.EstudianteForm.get('Apellidos')?.value,
      Genero: this.EstudianteForm.get('Genero')?.value,
      Estado_civil: this.EstudianteForm.get('Estado_civil')?.value,
      Fecha_nacimiento: this.EstudianteForm.get('Fecha_nacimiento')?.value,
      Lugar_nacimiento: this.EstudianteForm.get('Lugar_nacimiento')?.value,
      Nacionalidad: this.EstudianteForm.get('Nacionalidad')?.value,
      Etnia: this.EstudianteForm.get('Etnia')?.value,
      Grupo_sanguineo: this.EstudianteForm.get('Grupo_sanguineo')?.value,
      Observacion_medica: this.EstudianteForm.get('Observacion_medica')?.value,
      Tipo_discapacidad: this.EstudianteForm.get('Tipo_discapacidad')?.value,
      Carnet_discapacidad: this.EstudianteForm.get('Carnet_discapacidad')?.value,
      Porcentaje_discapacidad: this.EstudianteForm.get('Porcentaje_discapacidad')?.value,
      Direccion: this.EstudianteForm.get('Direccion')?.value,
      Sector_domicilio: this.EstudianteForm.get('Sector_domicilio')?.value,
      Referencia_domicilio: this.EstudianteForm.get('Referencia_domicilio')?.value,
      Estado: this.EstudianteForm.get('Estado')?.value,
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
      this.Titulo = 'ESTUDIANTE: ACTUALIZACIÓN DE INFORMACIÓN';
      this.subnivel = 'EDITOR DE DATOS';

      this.authService.obtenerEstudianteId(this.id).subscribe(data => {
        console.log(data);
        this.EstudianteForm.controls['Codigo'].setValue(data.Codigo);
        this.EstudianteForm.controls['Tipo_documento'].setValue(data.Tipo_documento);
        this.EstudianteForm.controls['DNI'].setValue(data.DNI);
        this.EstudianteForm.controls['Apellidos'].setValue(data.Apellidos);
        this.EstudianteForm.controls['Nombres'].setValue(data.Nombres);
        this.EstudianteForm.controls['Genero'].setValue(data.Genero);
        this.EstudianteForm.controls['Estado_civil'].setValue(data.Estado_civil);
        this.EstudianteForm.controls['Fecha_nacimiento'].setValue(data.Fecha_nacimiento);
        this.EstudianteForm.controls['Lugar_nacimiento'].setValue(data.Lugar_nacimiento);
        this.EstudianteForm.controls['Nacionalidad'].setValue(data.Nacionalidad);
        this.EstudianteForm.controls['Etnia'].setValue(data.Etnia);
        this.EstudianteForm.controls['Grupo_sanguineo'].setValue(data.Grupo_sanguineo);
        this.EstudianteForm.controls['Observacion_medica'].setValue(data.Observacion_medica);
        this.EstudianteForm.controls['Tipo_discapacidad'].setValue(data.Tipo_discapacidad);
        this.EstudianteForm.controls['Carnet_discapacidad'].setValue(data.Carnet_discapacidad);
        this.EstudianteForm.controls['Porcentaje_discapacidad'].setValue(data.Porcentaje_discapacidad);
        this.EstudianteForm.controls['Direccion'].setValue(data.Direccion);
        this.EstudianteForm.controls['Sector_domicilio'].setValue(data.Sector_domicilio);
        this.EstudianteForm.controls['Referencia_domicilio'].setValue(data.Referencia_domicilio);
        this.EstudianteForm.controls['Condicion_laboral'].setValue(data.Condicion_laboral);
        this.EstudianteForm.controls['Observacion'].setValue(data.Observacion);
        this.EstudianteForm.controls['Estado'].setValue(data.Estado);

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

          const ESTUDIANTE: any = {
            Codigo: this.EstudianteForm.get('Codigo')?.value,
            Tipo_documento: this.EstudianteForm.get('Tipo_documento')?.value,
            DNI: this.EstudianteForm.get('DNI')?.value,
            Nombres: this.EstudianteForm.get('Nombres')?.value,
            Apellidos: this.EstudianteForm.get('Apellidos')?.value,
            Genero: this.EstudianteForm.get('Genero')?.value,
            Estado_civil: this.EstudianteForm.get('Estado_civil')?.value,
            Fecha_nacimiento: this.EstudianteForm.get('Fecha_nacimiento')?.value,
            Lugar_nacimiento: this.EstudianteForm.get('Lugar_nacimiento')?.value,
            Nacionalidad: this.EstudianteForm.get('Nacionalidad')?.value,
            Etnia: this.EstudianteForm.get('Etnia')?.value,
            Grupo_sanguineo: this.EstudianteForm.get('Grupo_sanguineo')?.value,
            Observacion_medica: this.EstudianteForm.get('Observacion_medica')?.value,
            Tipo_discapacidad: this.EstudianteForm.get('Tipo_discapacidad')?.value,
            Carnet_discapacidad: this.EstudianteForm.get('Carnet_discapacidad')?.value,
            Porcentaje_discapacidad: this.EstudianteForm.get('Porcentaje_discapacidad')?.value,
            Direccion: this.EstudianteForm.get('Direccion')?.value,
            Sector_domicilio: this.EstudianteForm.get('Sector_domicilio')?.value,
            Referencia_domicilio: this.EstudianteForm.get('Referencia_domicilio')?.value,
            Estado: this.EstudianteForm.get('Estado')?.value,
            Observacion: this.EstudianteForm.get('Observacion')?.value,
          }
          console.log(ESTUDIANTE);
          this.authService.updateEst(this.id, ESTUDIANTE).subscribe(data => {
            this.esEditar();
            this.AlertExito2();
          }, err => {
            console.log(err);
            this.AlertFracaso();
            //this.ProfesoresForm.reset();
          })


        }

        swalWithBootstrapButtons.fire(
          'Actualizado!',
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
      title: 'Conficto..!<br>' +
        'Existe un registro con el mismo número de identificación',
      showConfirmButton: false,
      timer: 2500
    })
  }

}
