import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reg-periodo',
  templateUrl: './reg-periodo.component.html',
  styleUrls: ['./reg-periodo.component.css']
})
export class RegPeriodoComponent implements OnInit {
  PeriodoForm: FormGroup;

  //titulo
  Titulo = 'REGISTRO DE INFORMACIÓN';
  subnivel = 'REGISTRO DE DATOS';
  id: string | null;
  estado: string | null;

  //listar periodos
  periodos: any = {
    dni: []
  }

  //visualizar busqueda
  periodo: any = {
 
  }

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.PeriodoForm = this.fb.group({
      Codigo: ['', Validators.required],
      Descripcion: ['', Validators.maxLength(200)],
      Fecha_inicio: ['', Validators.required],
      Fecha_fin: ['', Validators.required],
      Nota_maxima: ['', Validators.required],
      Nota_base: ['', Validators.required],
      Faltas_maximas: ['', Validators.required],
      Numero_alumnos: ['', Validators.required],
      Estado: ['', Validators.required],
      Search: ['']

    })
    this.id = this.aRouter.snapshot.paramMap.get('id'),
    this.estado=""
    //  console.log(this.id)
  }

  ngOnInit(): void {
    this.obtenerPeriodo();
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
    const PERIODO: any = {
      Codigo: this.PeriodoForm.get('Codigo')?.value,
      Descripcion: this.PeriodoForm.get('Descripcion')?.value,
      Fecha_inicio: this.PeriodoForm.get('Fecha_inicio')?.value,
      Fecha_fin: this.PeriodoForm.get('Fecha_fin')?.value,
      Nota_base: this.PeriodoForm.get('Nota_base')?.value,
      Nota_maxima: this.PeriodoForm.get('Nota_maxima')?.value,
      Faltas_maximas: this.PeriodoForm.get('Faltas_maximas')?.value,
      Numero_alumnos: this.PeriodoForm.get('Numero_alumnos')?.value,
      Estado: this.PeriodoForm.get('Estado')?.value,
    }
    this.authService.registerPeriodo(PERIODO).subscribe(data => {
      this.PeriodoForm.reset();
      this.AlertExito();
    }, err => {
      console.log(err);
      this.AlertFracaso();
    })


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

          const PERIODO: any = {
            Codigo: this.PeriodoForm.get('Codigo')?.value,
            Descripcion: this.PeriodoForm.get('Descripcion')?.value,
            Fecha_inicio: this.PeriodoForm.get('Fecha_inicio')?.value,
            Fecha_fin: this.PeriodoForm.get('Fecha_fin')?.value,
            Nota_base: this.PeriodoForm.get('Nota_base')?.value,
            Nota_maxima: this.PeriodoForm.get('Nota_maxima')?.value,
            Faltas_maximas: this.PeriodoForm.get('Faltas_maximas')?.value,
            Numero_alumnos: this.PeriodoForm.get('Numero_alumnos')?.value,
            Estado: this.PeriodoForm.get('Estado')?.value,
          }
          
          this.authService.updatePeriodo(this.id,PERIODO).subscribe(data => {
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


 obtenerPeriodo(){
  if (this.id !== null ) {
    this.Titulo = 'ACTUALIZACIÓN DE INFORMACIÓN';
    this.subnivel = 'EDITOR DE DATOS';

    this.authService.obtenerPeriodoId(this.id).subscribe(data => {   
     this.PeriodoForm.controls['Codigo'].setValue(data.Codigo);
     this.PeriodoForm.controls['Descripcion'].setValue(data.Descripcion);
     this.PeriodoForm.controls['Fecha_inicio'].setValue(data.Fecha_inicio);
     this.PeriodoForm.controls['Fecha_fin'].setValue(data.Fecha_fin);
     this.PeriodoForm.controls['Nota_base'].setValue(data.Nota_base);
     this.PeriodoForm.controls['Nota_maxima'].setValue(data.Nota_maxima);
     this.PeriodoForm.controls['Faltas_maximas'].setValue(data.Faltas_maximas);
     this.PeriodoForm.controls['Numero_alumnos'].setValue(data.Numero_alumnos);
     this.PeriodoForm.controls['Estado'].setValue(data.Estado);
    })

  }
 }
  
  ////////////////////////Redirecciones ////////////////////

  RedirectCancel(): void {
    this.PeriodoForm.reset();
    this.router.navigateByUrl('/app/reg-periodo');
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
      title: 'Conficto..!<br>' +
        'Existe un registro con el mismo número de identificación',
      showConfirmButton: false,
      timer: 2500
    })
  }

  AlertNoEncotrado(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'No se encontro ningun registro..!'
    })
  }

  AlertCamposVacios(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'warning',
      title: 'El campo de busqueda esta vacio'
    })
  }


}
