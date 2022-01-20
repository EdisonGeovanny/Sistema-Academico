import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-active-notas',
  templateUrl: './active-notas.component.html',
  styleUrls: ['./active-notas.component.css']
})
export class ActiveNotasComponent implements OnInit {

  //formGroup
 ANForm: FormGroup;
 id: string | null;
  //titulo
Titulo = 'ESTADOS DE NOTAS: HABILITAR CAMPOS';
subnivel = 'REGISTRO DE NOTAS';
constructor(private authService: AuthService, private router: Router,
  private fb: FormBuilder, private aRouter: ActivatedRoute) {
  //formGroup
  this.ANForm = this.fb.group({
    //ACTIVAR NOTAS
   // Q1: ['', Validators.required],
    //Q2: ['', Validators.required],
    Q1P1: ['', Validators.required],
    Q1P2: ['', Validators.required],
    Q1EXAM: ['', Validators.required],
    Q2P1: ['', Validators.required],
    Q2P2: ['', Validators.required],
    Q2EXAM: ['', Validators.required],

  }),
  this.id = null
}

  ngOnInit(): void {
    this.ObtenerAN();
  }

  ObtenerAN(){

      this.authService.getANAll().subscribe(data => {
        this.id =data.dni[0]._id;
        this.ANForm.controls['Q1P1'].setValue(data.dni[0].Q1P1);
        this.ANForm.controls['Q1P2'].setValue(data.dni[0].Q1P2);
        this.ANForm.controls['Q1EXAM'].setValue(data.dni[0].Q1EXAM);
        this.ANForm.controls['Q2P1'].setValue(data.dni[0].Q2P1);
        this.ANForm.controls['Q2P2'].setValue(data.dni[0].Q2P2);
        this.ANForm.controls['Q2EXAM'].setValue(data.dni[0].Q2EXAM);
       
      })
  }

  //editar
  Update() {

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
      confirmButtonText: 'Si, activar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.id !== null) {
          const ACTIVAR: any = {
            Q1P1: this.ANForm.get('Q1P1')?.value,
            Q1P2: this.ANForm.get('Q1P2')?.value,
            Q1EXAM: this.ANForm.get('Q1EXAM')?.value,
            Q2P1: this.ANForm.get('Q2P1')?.value,
            Q2P2: this.ANForm.get('Q2P2')?.value,
            Q2EXAM:this.ANForm.get('Q2EXAM')?.value,
          }

          this.authService.updateAN(this.id,ACTIVAR).subscribe(data => {
            this.ObtenerAN();
          }, err => {
            console.log(err);
            this.AlertFracaso();
          })
      
      
        }

        swalWithBootstrapButtons.fire(
          'Exito!',
          'Sus campos fueron activados.',
          'success'
        )
      }   
    })
    
  }

  AlertFracaso(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Conflicto..!<br>' +
        'Existe un registro con el mismo nombre de <strong>usuario</strong>',
      showConfirmButton: false,
      timer: 2500
    })
  }

}
