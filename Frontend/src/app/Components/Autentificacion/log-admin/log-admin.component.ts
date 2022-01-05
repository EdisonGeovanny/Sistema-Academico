import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAccesoI } from '../../../models/userAcceso';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-log-admin',
  templateUrl: './log-admin.component.html',
  styleUrls: ['./log-admin.component.css']
})
export class LogAdminComponent implements OnInit {
  AutentificacionForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.AutentificacionForm = this.fb.group({
      Usuario: ['', Validators.required],
      Contraseña: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  Autentificar() {
    if(this.AutentificacionForm.valid){ 
      const ACCESO: UserAccesoI = {
       Usuario: this.AutentificacionForm.get('Usuario')?.value,
       Contraseña: this.AutentificacionForm.get('Contraseña')?.value,
       Rol: 'Administrador'
     }
     console.log(ACCESO);
     this.authService.loginA(ACCESO).subscribe(data => {
       this.router.navigateByUrl('/app/reg-prof');
     }, err => {
       console.log(err);
       this.AutentificacionForm.reset();
       this.AlertAcceso();
     })
   }else{
     this.requerido();
   }
 
   }
 
   requerido():void{
     if (this.AutentificacionForm.get('Contraseña')?.hasError('required') || this.AutentificacionForm.get('Contraseña')?.touched)
       this.AlertCamposVacios();
   }
 
 
 //////  Alertas ////////////////
   AlertAcceso(): void {
     Swal.fire({
       icon: 'error',
       title: 'Oops no lograste acceder...',
       text: '¡Algo salió mal!',
       footer: '<p>Intenta nuevamente, ingresa los datos <b>correctos</b> </p>'
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
       title: 'Existen campos vacíos '
     })
   }
 
   AlertProblema(): void {
     Swal.fire(
       '¿Quieres Recuperar tu cuenta?',
       'Comunicate con el Administrador del Sistema',
       'question'
     )
   }

}
