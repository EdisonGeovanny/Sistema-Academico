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
  Titulo = 'ESTUDIANTE: REGISTRO DE INFORMACIÓN';
  subnivel = 'REGISTRO DE DATOS';
  id: string | null;

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
      Estado: ['', Validators.required]
      
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
    //  console.log(this.id)
  }

  ngOnInit(): void {
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
  console.log(PERIODO);
  this.authService.registerPeriodo(PERIODO).subscribe(data => {
    this.PeriodoForm.reset();
    this.AlertExito()
  }, err => {
    console.log(err);
    this.AlertFracaso();
  })


}


//actualizar datos
upDate(){

}


  ////////////////////////Redirecciones ////////////////////

  RedirectCancel(): void {
    this.PeriodoForm.reset();
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
