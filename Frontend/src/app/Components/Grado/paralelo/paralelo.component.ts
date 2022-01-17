import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paralelo',
  templateUrl: './paralelo.component.html',
  styleUrls: ['./paralelo.component.css']
})
export class ParaleloComponent implements OnInit {

  //formGroup
  GradoForm: FormGroup;

  //titulo
  Titulo = 'PARALELO: REGISTRO DE INFORMACIÓN';
  subnivel = 'REGISTRO DE DATOS';
  btn_nivel = true;
  name_n = 'AGREGAR PARALELO:';
  id_n: string| null;
  
  
  //nivel
  public paralelos: any = {
    dni: [] 
  }

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
      this.GradoForm = this.fb.group({
        //Nivel
        Paralelo: ['', Validators.required],
        
      }),
      this.id_n=null
  
  
     }

  ngOnInit(): void {
    this.obtenerParalelo();
  }

  saveData(){
    if (this.btn_nivel) {
      this.create();
    }else{
      if(this.id_n!==null){
        this.upDate(this.id_n);
      }
    }
  }

  create(){
      const PARALELO: any = {
        Paralelo:this.GradoForm.get('Paralelo')?.value
      }
      this.authService.registerParalelo(PARALELO).subscribe(data => {
        this.AlertExito();
        this.obtenerParalelo();
        this.GradoForm.reset();
        
      }, err => {
        console.log(err);
        this.AlertFracaso();
      })
    
  }

  async obtenerParalelo(){
    const Obtener = new Promise(async (resolve, reject) => {
      await this.authService.getParaleloAll().subscribe(data => {
        resolve(data)
        console.log(data)
      })
    });
  
    this.paralelos = await Obtener.then(res => res);
  }

  async obtenerEdit(id: string){
    this.Titulo = 'PARALELO: ACTUALIZACIÓN DE INFORMACIÓN';
    this.subnivel = 'EDITOR DE DATOS';
    this.name_n = 'ACTUALIZACIÓN DE PARALELO:'
    this.btn_nivel = false;
    this.id_n = id;


    this.authService.obtenerParaleloId(id).subscribe(data => {   
     this.GradoForm.controls['Paralelo'].setValue(data.Paralelo);
    })
  }

    //actualizar
  upDate(id:string): void {

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

        const PARALELO: any = {
          Paralelo:this.GradoForm.get('Paralelo')?.value
        }
        this.authService.updateParalelo(id,PARALELO).subscribe(data => {
          this.AlertExito2();
          this.obtenerParalelo();
          
        }, err => {
          console.log(err);
          this.AlertFracaso();
        })


        swalWithBootstrapButtons.fire(
          'Actualizado!',
          'Tu registro fue actualizado.',
          'success'
        )
      }   
    })
  }
  
  //borrar
delete(id: any){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      this.authService.deleteParalelo(id).subscribe(data => {
        this.obtenerParalelo();
      },error => {
        console.log(error);
      })

      swalWithBootstrapButtons.fire(
        'Eliminado!',
        'Tu registro fue eliminado.',
        'success'
      )
    }   
  })
}

nuevoNivel() {
  this.Titulo = 'PARALELO: REGISTRO DE INFORMACIÓN';
  this.name_n='AGREGAR PARALELO:'
this.btn_nivel = true;
this.id_n = null;
this.GradoForm.reset();
}

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
      title: 'Conflicto..!<br>' +
        'Existe un registro con el mismo nombre de <strong>usuario</strong>',
      showConfirmButton: false,
      timer: 2500
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
