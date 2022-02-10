import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent implements OnInit {
  ProfesoresForm: FormGroup;

  //titulo
  Titulo = 'DOCENTE: REGISTRO DE INFORMACIÓN';
  subnivel = 'REGISTRO DE DATOS';
  nombre : string | null;
  usuario: string | null;
  
  id: string | null;

  //Nombramiento
  Nombramiento = [{ name: "Seleccionar opción" },{ name: "Nombramiento Provisional" },
  { name: "Nombramiento Definitivo" }, { name: "Contrato" }];
  elegido1: string = "";

  //Genero
  Genero = [{ name: "Seleccionar opción" },{ name: "Masculino" }, { name: "Femenino" }];
  elegido2: string = "";

  //Documento
  Documento = [{ name: "Seleccionar opción" },{ name: "Cédula de identidad" }, { name: "Pasaporte" }, { name: "Licencia de conducir"},
               { name: "Identificación militar"}, { name: "Residencia permanente"}];
  elegido3: string = "";


  //Estado_civil
  Estado_civil = [{ name: "Seleccionar opción" }, { name: "Soltero(a)" }, { name: "Casado(a)" }, { name: "Divorciado(a)"},
               { name: "Viudo(a)"}];
  elegido4: string = "";

  //Tipo Sangre
  Sangre = [{ name: "Seleccionar opción" }, { name: "Desconicido" },{ name: "O positivo" }, { name: "O negativo" }, { name: "A positivo"},{ name: "A negativo"},
            { name: "B positivo"},{ name: "B negativo"},{ name: "AB positivo"},{ name: "AB negativo"}];
  elegido5: string = "";

  //Tipo Discapacidad
  Discapacidad = [{ name: "Seleccionar opción" }, { name: "Ninguna" },{ name: "Discapacidad Física o Motora" }, { name: "Discapacidad Sensorial" }, 
                 { name: "Discapacidad Intelectual"},{ name: "Discapacidad Psíquica"}];
  elegido6: string = "";

   //Nivel de educacion
   Nivel = [{ name: "Seleccionar opción" }, { name: "Educación media superior" },{ name: "Educación superior" }, { name: "Educación post-universitario" }];
  elegido7: string = "";

   //Tipo Institucion
   Institucion = [{ name: "Seleccionar opción" }, { name: "Pública" },{ name: "Privada" }, { name: "Mixta" }];
  elegido8: string = "";

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.ProfesoresForm = this.fb.group({
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
    Telefono: [''],
    Celular: ['', Validators.required],
    Email: ['', Validators.required],
    Observacion_medica: [''],
    Tipo_discapacidad: [''],
    Carnet_discapacidad: [''],
    Porcentaje_discapacidad: ['', Validators.maxLength(5)],
    Direccion: ['', Validators.required],
    Sector_domicilio: ['', Validators.required],
    Referencia_domicilio: ['', Validators.required],
    Nombre_emergente: [''],
    Contacto_emergente: [''],
    Nivel_educacion: ['', Validators.required],
    Institucion: ['', Validators.required],
    Lugar_institucion: ['', Validators.required],
    Tipo_institucion: ['', Validators.required],
    Especialidad: ['', Validators.required],
    Fecha_grado: ['', Validators.required],
   // Otros_titulos: [''],
    Fecha_ingreso_magisterio: ['', Validators.required],
    Fecha_ingreso_institucion: ['', Validators.required], 
    Años_servicio: ['', Validators.required],
    Condicion_laboral: ['', Validators.required],
    Observacion : ['', Validators.maxLength(400)],
    Estado : ['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id'),
    this.nombre = '';
    this.usuario = '';
    //console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
    this.loginData();
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
    const PROFESOR: any = {
      Tipo_documento: this.ProfesoresForm.get('Tipo_documento')?.value,
      DNI: this.ProfesoresForm.get('DNI')?.value,
      Apellidos: this.ProfesoresForm.get('Apellidos')?.value,
      Nombres: this.ProfesoresForm.get('Nombres')?.value,
      Genero: this.ProfesoresForm.get('Genero')?.value,
      Estado_civil: this.ProfesoresForm.get('Estado_civil')?.value,
      Fecha_nacimiento: this.ProfesoresForm.get('Fecha_nacimiento')?.value,
      Lugar_nacimiento: this.ProfesoresForm.get('Lugar_nacimiento')?.value,
      Nacionalidad: this.ProfesoresForm.get('Nacionalidad')?.value,
      Etnia: this.ProfesoresForm.get('Etnia')?.value,
      Grupo_sanguineo: this.ProfesoresForm.get('Grupo_sanguineo')?.value,
      Telefono: this.ProfesoresForm.get('Telefono')?.value,
      Celular: this.ProfesoresForm.get('Celular')?.value,
      Email: this.ProfesoresForm.get('Email')?.value,
      Observacion_medica: this.ProfesoresForm.get('Observacion_medica')?.value,
      Tipo_discapacidad: this.ProfesoresForm.get('Tipo_discapacidad')?.value,
      Carnet_discapacidad: this.ProfesoresForm.get('Carnet_discapacidad')?.value,
      Porcentaje_discapacidad: this.ProfesoresForm.get('Porcentaje_discapacidad')?.value,
      Direccion: this.ProfesoresForm.get('Direccion')?.value,
      Sector_domicilio: this.ProfesoresForm.get('Sector_domicilio')?.value,
      Referencia_domicilio: this.ProfesoresForm.get('Referencia_domicilio')?.value,
      Nombre_emergente: this.ProfesoresForm.get('Nombre_emergente')?.value,
      Contacto_emergente: this.ProfesoresForm.get('Contacto_emergente')?.value,
      Nivel_educacion: this.ProfesoresForm.get('Nivel_educacion')?.value,
      Institucion: this.ProfesoresForm.get('Institucion')?.value,
      Lugar_institucion: this.ProfesoresForm.get('Lugar_institucion')?.value,
      Tipo_institucion: this.ProfesoresForm.get('Tipo_institucion')?.value,
      Especialidad: this.ProfesoresForm.get('Especialidad')?.value,
      Fecha_grado: this.ProfesoresForm.get('Fecha_grado')?.value,
      Fecha_ingreso_magisterio: this.ProfesoresForm.get('Fecha_ingreso_magisterio')?.value,
      Fecha_ingreso_institucion: this.ProfesoresForm.get('Fecha_ingreso_institucion')?.value, 
      Años_servicio: this.ProfesoresForm.get('Años_servicio')?.value,
      Condicion_laboral: this.ProfesoresForm.get('Condicion_laboral')?.value,
      Observacion: this.ProfesoresForm.get('Observacion')?.value,
      Estado: this.ProfesoresForm.get('Estado')?.value
   
    }
    console.log(PROFESOR);
    this.authService.registerDA(PROFESOR).subscribe(data => {
      this.ProfesoresForm.reset();
      this.AlertExito()
    }, err => {
      console.log(err);
      this.AlertFracaso();
    })


  }

  //Obtener datos para Editar
  esEditar() {
    if (this.id !== null) {
      this.Titulo = 'DOCENTE: ACTUALIZACIÓN DE INFORMACIÓN';
      this.subnivel = 'EDITOR DE DATOS';

      this.authService.obtenerPorfesorId(this.id).subscribe(data => {
        
       // console.log(formatDate(data.Fecha_nacimiento, 'dd-MM-yyyy', 'en-US'));
     
      this.ProfesoresForm.controls['Tipo_documento'].setValue(data.Tipo_documento);
      this.ProfesoresForm.controls['DNI'].setValue(data.DNI);
      this.ProfesoresForm.controls['Apellidos'].setValue(data.Apellidos);
      this.ProfesoresForm.controls['Nombres'].setValue(data.Nombres);
      this.ProfesoresForm.controls['Genero'].setValue(data.Genero);
      this.ProfesoresForm.controls['Estado_civil'].setValue(data.Estado_civil);
      this.ProfesoresForm.controls['Fecha_nacimiento'].setValue(data.Fecha_nacimiento);
      this.ProfesoresForm.controls['Lugar_nacimiento'].setValue(data.Lugar_nacimiento);
      this.ProfesoresForm.controls['Nacionalidad'].setValue(data.Nacionalidad);
      this.ProfesoresForm.controls['Etnia'].setValue(data.Etnia);
      this.ProfesoresForm.controls['Grupo_sanguineo'].setValue(data.Grupo_sanguineo);
      this.ProfesoresForm.controls['Telefono'].setValue(data.Telefono);
      this.ProfesoresForm.controls['Celular'].setValue(data.Celular);
      this.ProfesoresForm.controls['Email'].setValue(data.Email);
      this.ProfesoresForm.controls['Observacion_medica'].setValue(data.Observacion_medica);
      this.ProfesoresForm.controls['Tipo_discapacidad'].setValue(data.Tipo_discapacidad);
      this.ProfesoresForm.controls['Carnet_discapacidad'].setValue(data.Carnet_discapacidad);
      this.ProfesoresForm.controls['Porcentaje_discapacidad'].setValue(data.Porcentaje_discapacidad);
      this.ProfesoresForm.controls['Direccion'].setValue(data.Direccion);
      this.ProfesoresForm.controls['Sector_domicilio'].setValue(data.Sector_domicilio);
      this.ProfesoresForm.controls['Referencia_domicilio'].setValue(data.Referencia_domicilio);
      this.ProfesoresForm.controls['Nombre_emergente'].setValue(data.Nombre_emergente);
      this.ProfesoresForm.controls['Contacto_emergente'].setValue(data.Contacto_emergente);
      this.ProfesoresForm.controls['Nivel_educacion'].setValue(data.Nivel_educacion);
      this.ProfesoresForm.controls['Institucion'].setValue(data.Institucion);
      this.ProfesoresForm.controls['Lugar_institucion'].setValue(data.Lugar_institucion);
      this.ProfesoresForm.controls['Tipo_institucion'].setValue(data.Tipo_institucion);
      this.ProfesoresForm.controls['Especialidad'].setValue(data.Especialidad);
      this.ProfesoresForm.controls['Fecha_grado'].setValue(data.Fecha_grado);
     // this.ProfesoresForm.controls['Nota_grado'].setValue(data.Nota_grado);
      this.ProfesoresForm.controls['Fecha_ingreso_magisterio'].setValue(data.Fecha_ingreso_magisterio);
      this.ProfesoresForm.controls['Fecha_ingreso_institucion'].setValue(data.Fecha_ingreso_institucion,);
      this.ProfesoresForm.controls['Años_servicio'].setValue(data.Años_servicio);
      this.ProfesoresForm.controls['Condicion_laboral'].setValue(data.Condicion_laboral);
      this.ProfesoresForm.controls['Observacion'].setValue(data.Observacion);
      this.ProfesoresForm.controls['Estado'].setValue(data.Estado); 
  
      });
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
      text: "¡Se modificará el registro con la infomación actual!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.id !== null) {
      
          const PROFESOR: any = {
            Tipo_documento: this.ProfesoresForm.get('Tipo_documento')?.value,
            DNI: this.ProfesoresForm.get('DNI')?.value,
            Apellidos: this.ProfesoresForm.get('Apellidos')?.value,
            Nombres: this.ProfesoresForm.get('Nombres')?.value,
            Genero: this.ProfesoresForm.get('Genero')?.value,
            Estado_civil: this.ProfesoresForm.get('Estado_civil')?.value,
            Fecha_nacimiento: this.ProfesoresForm.get('Fecha_nacimiento')?.value,
            Lugar_nacimiento: this.ProfesoresForm.get('Lugar_nacimiento')?.value,
            Nacionalidad: this.ProfesoresForm.get('Nacionalidad')?.value,
            Etnia: this.ProfesoresForm.get('Etnia')?.value,
            Grupo_sanguineo: this.ProfesoresForm.get('Grupo_sanguineo')?.value,
            Telefono: this.ProfesoresForm.get('Telefono')?.value,
            Celular: this.ProfesoresForm.get('Celular')?.value,
            Email: this.ProfesoresForm.get('Email')?.value,
            Observacion_medica: this.ProfesoresForm.get('Observacion_medica')?.value,
            Tipo_discapacidad: this.ProfesoresForm.get('Tipo_discapacidad')?.value,
            Carnet_discapacidad: this.ProfesoresForm.get('Carnet_discapacidad')?.value,
            Porcentaje_discapacidad: this.ProfesoresForm.get('Porcentaje_discapacidad')?.value,
            Direccion: this.ProfesoresForm.get('Direccion')?.value,
            Sector_domicilio: this.ProfesoresForm.get('Sector_domicilio')?.value,
            Referencia_domicilio: this.ProfesoresForm.get('Referencia_domicilio')?.value,
            Nombre_emergente: this.ProfesoresForm.get('Nombre_emergente')?.value,
            Contacto_emergente: this.ProfesoresForm.get('Contacto_emergente')?.value,
            Nivel_educacion: this.ProfesoresForm.get('Nivel_educacion')?.value,
            Institucion: this.ProfesoresForm.get('Institucion')?.value,
            Lugar_institucion: this.ProfesoresForm.get('Lugar_institucion')?.value,
            Tipo_institucion: this.ProfesoresForm.get('Tipo_institucion')?.value,
            Especialidad: this.ProfesoresForm.get('Especialidad')?.value,
            Fecha_grado: this.ProfesoresForm.get('Fecha_grado')?.value,
           // Nota_grado: this.ProfesoresForm.get('Nota_grado')?.value,
           // Otros_titulos: this.ProfesoresForm.get('Otros_titulos')?.value,
            Fecha_ingreso_magisterio: this.ProfesoresForm.get('Fecha_ingreso_magisterio')?.value,
            Fecha_ingreso_institucion: this.ProfesoresForm.get('Fecha_ingreso_institucion')?.value, 
            Años_servicio: this.ProfesoresForm.get('Años_servicio')?.value,
            Condicion_laboral: this.ProfesoresForm.get('Condicion_laboral')?.value,
            Observacion: this.ProfesoresForm.get('Observacion')?.value,
            Estado: this.ProfesoresForm.get('Estado')?.value      
          }
          console.log(PROFESOR);
          this.authService.updateDocente(this.id,PROFESOR).subscribe(data => {
            this.esEditar();
          }, err => {
            console.log(err);
            this.AlertFracaso();
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

 
  viewProf(id: any) {
    this.router.navigateByUrl('/admin/view-prof/'+id);
  }



////////////////////////Redirecciones ////////////////////

RedirectCancel(): void {
  this.ProfesoresForm.reset();
  this.router.navigateByUrl('/admin/reg-prof');
  this.id=null;
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
