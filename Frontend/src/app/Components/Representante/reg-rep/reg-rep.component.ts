import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reg-rep',
  templateUrl: './reg-rep.component.html',
  styleUrls: ['./reg-rep.component.css']
})
export class RegRepComponent implements OnInit {

  RepresentantesForm: FormGroup;

  //titulo
  //titulo
  Titulo = 'DOCENTE: REGISTRO DE INFORMACIÓN';
  subnivel = 'REGISTRO DE DATOS';
  id: string | null;
  pariente: string | null = "";

  //Documento
  Documento = [{ name: "Seleccionar opción" },{ name: "Cédula de identidad" }, { name: "Pasaporte" }, { name: "Licencia de conducir"},
               { name: "Identificación militar"}, { name: "Residencia permanente"}];
  elegido3: string = "";

  //Tipo Sangre
  Sangre = [{ name: "Seleccionar opción" }, { name: "Desconicido" },{ name: "O positivo" }, { name: "O negativo" }, { name: "A positivo"},{ name: "A negativo"},
            { name: "B positivo"},{ name: "B negativo"},{ name: "AB positivo"},{ name: "AB negativo"}];
  elegido5: string = "";

   //Nivel de educacion
   Nivel = [{ name: "Seleccionar opción" },{ name: "Educación primaria" },{ name: "Educación secundaria" }, { name: "Educación media superior" },{ name: "Educación superior" }, { name: "Educación post-universitario" },{ name: "Ninguna" }];
  elegido7: string = "";

  //Tipo Discapacidad
  Discapacidad = [{ name: "Seleccionar opción" }, { name: "Ninguna" },{ name: "Discapacidad Física o Motora" }, { name: "Discapacidad Sensorial" }, 
                 { name: "Discapacidad Intelectual"},{ name: "Discapacidad Psíquica"}];
  elegido6: string = "";

  //Parentesco
  Parentesco = [{ name: "Padre" },{ name: "Madre" }, { name: "Abuelo" },
   { name: "Abuela" }, { name: "Tio" }, { name: "Tia" }];
  elegido1: string = "";

    //Estado civil
    Estado_civil = [{ name: "Seleccionar opción" }, { name: "Soltero(a)" }, { name: "Casado(a)" }, { name: "Divorciado(a)"},
    { name: "Viudo(a)"}];
    elegido0: string = "";

  //Genero
  Genero = [{ name: "Seleccionar opción" },{ name: "Masculino" }, { name: "Femenino" }];
  elegido2: string = "";

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.RepresentantesForm = this.fb.group({

    Parentesco: ['', Validators.required],
    Tipo_documento: ['', Validators.required],
    DNI: ['', Validators.required],
    Apellidos: ['', Validators.required],
    Nombres: ['', Validators.required],
    Genero: ['', Validators.required],
    Estado_civil: ['', Validators.required],
    Fecha_nacimiento: ['', Validators.required],
    Lugar_nacimiento: ['', Validators.required],
    Nacionalidad: ['', Validators.required],
    Etnia: ['', Validators.required],
    Grupo_sanguineo: [''],
    Nivel_educacion: ['', Validators.required],
    Actividad: ['', Validators.required],
    Area: ['', Validators.required],
    Observacion_medica: [''],
    Tipo_discapacidad: [''],
    Carnet_discapacidad: [''],
    Porcentaje_discapacidad: ['', Validators.maxLength(5)],
    Direccion: ['', Validators.required],
    Sector_domicilio: ['', Validators.required],
    Referencia_domicilio: ['', Validators.required],
    Telefono: [''],
    Celular: ['', Validators.required],
    Email: ['', Validators.required],
    Observacion : ['', Validators.maxLength(400)],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
    //console.log(this.id)
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
    const REPRESENTANTE: any = {
      Parentesco: this.RepresentantesForm.get('Parentesco')?.value,
      Tipo_documento: this.RepresentantesForm.get('Tipo_documento')?.value,
      DNI: this.RepresentantesForm.get('DNI')?.value,
      Nombres: this.RepresentantesForm.get('Nombres')?.value,
      Apellidos: this.RepresentantesForm.get('Apellidos')?.value,
      Genero: this.RepresentantesForm.get('Genero')?.value,
      Estado_civil: this.RepresentantesForm.get('Estado_civil')?.value,
      Fecha_nacimiento: this.RepresentantesForm.get('Fecha_nacimiento')?.value,
      Lugar_nacimiento: this.RepresentantesForm.get('Lugar_nacimiento')?.value,
      Nacionalidad: this.RepresentantesForm.get('Nacionalidad')?.value,
      Etnia: this.RepresentantesForm.get('Etnia')?.value,
      Grupo_sanguineo: this.RepresentantesForm.get('Grupo_sanguineo')?.value,
      Nivel_educacion: this.RepresentantesForm.get('Nivel_educacion')?.value,
      Actividad: this.RepresentantesForm.get('Actividad')?.value,
      Area: this.RepresentantesForm.get('Area')?.value,
      Observacion_medica: this.RepresentantesForm.get('Observacion_medica')?.value,
      Tipo_discapacidad: this.RepresentantesForm.get('Tipo_discapacidad')?.value,
      Carnet_discapacidad: this.RepresentantesForm.get('Carnet_discapacidad')?.value,
      Porcentaje_discapacidad: this.RepresentantesForm.get('Porcentaje_discapacidad')?.value,
      Direccion: this.RepresentantesForm.get('Direccion')?.value,
      Sector_domicilio: this.RepresentantesForm.get('Sector_domicilio')?.value,
      Referencia_domicilio: this.RepresentantesForm.get('Referencia_domicilio')?.value,
      Email: this.RepresentantesForm.get('Email')?.value,
      Telefono: this.RepresentantesForm.get('Telefono')?.value,
      Celular: this.RepresentantesForm.get('Celular')?.value,
      Estado: this.RepresentantesForm.get('Estado')?.value,  
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
      this.Titulo = 'REPRESENTANTE: ACTUALIZACIÓN DE INFORMACIÓN';
      this.subnivel = 'EDITOR DE DATOS';

      this.authService.obtenerRepresentanteId(this.id).subscribe(data => {
        //console.log(data);
        this.RepresentantesForm.controls['Parentesco'].setValue(data.Parentesco);
        this.RepresentantesForm.controls['Tipo_documento'].setValue(data.Tipo_documento);
        this.RepresentantesForm.controls['DNI'].setValue(data.DNI);
        this.RepresentantesForm.controls['Apellidos'].setValue(data.Apellidos);
        this.RepresentantesForm.controls['Nombres'].setValue(data.Nombres);
        this.RepresentantesForm.controls['Genero'].setValue(data.Genero);
        this.RepresentantesForm.controls['Estado_civil'].setValue(data.Estado_civil);
        this.RepresentantesForm.controls['Fecha_nacimiento'].setValue(data.Fecha_nacimiento);
        this.RepresentantesForm.controls['Lugar_nacimiento'].setValue(data.Lugar_nacimiento);
        this.RepresentantesForm.controls['Nacionalidad'].setValue(data.Nacionalidad);
        this.RepresentantesForm.controls['Etnia'].setValue(data.Etnia);
        this.RepresentantesForm.controls['Grupo_sanguineo'].setValue(data.Grupo_sanguineo);
        this.RepresentantesForm.controls['Telefono'].setValue(data.Telefono);
        this.RepresentantesForm.controls['Celular'].setValue(data.Celular);
        this.RepresentantesForm.controls['Email'].setValue(data.Email);
        this.RepresentantesForm.controls['Observacion_medica'].setValue(data.Observacion_medica);
        this.RepresentantesForm.controls['Tipo_discapacidad'].setValue(data.Tipo_discapacidad);
        this.RepresentantesForm.controls['Carnet_discapacidad'].setValue(data.Carnet_discapacidad);
        this.RepresentantesForm.controls['Porcentaje_discapacidad'].setValue(data.Porcentaje_discapacidad);
        this.RepresentantesForm.controls['Direccion'].setValue(data.Direccion);
        this.RepresentantesForm.controls['Sector_domicilio'].setValue(data.Sector_domicilio);
        this.RepresentantesForm.controls['Referencia_domicilio'].setValue(data.Referencia_domicilio);
        this.RepresentantesForm.controls['Actividad'].setValue(data.Actividad);
        this.RepresentantesForm.controls['Area'].setValue(data.Area);
        this.RepresentantesForm.controls['Nivel_educacion'].setValue(data.Nivel_educacion);
        this.RepresentantesForm.controls['Observacion'].setValue(data.Observacion);
      
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
      
          const REPRESENTANTE: any = {
            Parentesco: this.RepresentantesForm.get('Parentesco')?.value,
      Tipo_documento: this.RepresentantesForm.get('Tipo_documento')?.value,
      DNI: this.RepresentantesForm.get('DNI')?.value,
      Nombres: this.RepresentantesForm.get('Nombres')?.value,
      Apellidos: this.RepresentantesForm.get('Apellidos')?.value,
      Genero: this.RepresentantesForm.get('Genero')?.value,
      Estado_civil: this.RepresentantesForm.get('Estado_civil')?.value,
      Fecha_nacimiento: this.RepresentantesForm.get('Fecha_nacimiento')?.value,
      Lugar_nacimiento: this.RepresentantesForm.get('Lugar_nacimiento')?.value,
      Nacionalidad: this.RepresentantesForm.get('Nacionalidad')?.value,
      Etnia: this.RepresentantesForm.get('Etnia')?.value,
      Grupo_sanguineo: this.RepresentantesForm.get('Grupo_sanguineo')?.value,
      Nivel_educacion: this.RepresentantesForm.get('Nivel_educacion')?.value,
      Actividad: this.RepresentantesForm.get('Actividad')?.value,
      Area: this.RepresentantesForm.get('Area')?.value,
      Observacion_medica: this.RepresentantesForm.get('Observacion_medica')?.value,
      Tipo_discapacidad: this.RepresentantesForm.get('Tipo_discapacidad')?.value,
      Carnet_discapacidad: this.RepresentantesForm.get('Carnet_discapacidad')?.value,
      Porcentaje_discapacidad: this.RepresentantesForm.get('Porcentaje_discapacidad')?.value,
      Direccion: this.RepresentantesForm.get('Direccion')?.value,
      Sector_domicilio: this.RepresentantesForm.get('Sector_domicilio')?.value,
      Referencia_domicilio: this.RepresentantesForm.get('Referencia_domicilio')?.value,
      Email: this.RepresentantesForm.get('Email')?.value,
      Telefono: this.RepresentantesForm.get('Telefono')?.value,
      Celular: this.RepresentantesForm.get('Celular')?.value,
      Estado: this.RepresentantesForm.get('Estado')?.value,  
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
    this.router.navigateByUrl('/app/reg-rep');
    this.id=null;
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
