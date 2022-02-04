import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {

   //formGroup
   GradoForm: FormGroup;

//titulo
Titulo = 'NIVEL: REGISTRO DE INFORMACIÓN';
subnivel = 'REGISTRO DE DATOS';
btn_nivel = true;
name_n = 'AGREGAR NIVEL:';
id_n: string| null;


//nivel
public niveles: any = {
  dni: [] 
}


nombre : string | null;
usuario: string | null;

constructor(private authService: AuthService, private router: Router,
  private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.GradoForm = this.fb.group({
      //Nivel
      Nivel: ['', Validators.required],
      
    }),
    this.nombre = null,
    this.usuario = null,
    this.id_n=null


   }


  ngOnInit(): void {
    this.obtenerNivel();
    this.loginData();
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
      const NIVEL: any = {
        Nivel:this.GradoForm.get('Nivel')?.value
      }
      this.authService.registerNivel(NIVEL).subscribe(data => {
        this.AlertExito();
        this.obtenerNivel();
        this.GradoForm.reset();
        
      }, err => {
        console.log(err);
        this.AlertFracaso();
      })
    
  }

  async obtenerNivel(){
    const Obtener = new Promise(async (resolve, reject) => {
      await this.authService.getNivelAll().subscribe(data => {
        resolve(data)
       // console.log(data)
      })
    });
  
    this.niveles = await Obtener.then(res => res);
  }

  async obtenerEdit(id: string){
    this.Titulo = 'NIVEL: ACTUALIZACIÓN DE INFORMACIÓN';
    this.subnivel = 'EDITOR DE DATOS';
    this.name_n = 'ACTUALIZACIÓN DE NIVEL:'
    this.btn_nivel = false;
    this.id_n = id;


    this.authService.obtenerNivelId(id).subscribe(data => {   
     this.GradoForm.controls['Nivel'].setValue(data.Nivel);
    })
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

        const NIVEL: any = {
          Nivel:this.GradoForm.get('Nivel')?.value
        }
        this.authService.updateNivel(id,NIVEL).subscribe(data => {
          this.AlertExito2();
          this.obtenerNivel();
          
        }, err => {
          console.log(err);
          this.AlertFracaso();
        })


        swalWithBootstrapButtons.fire(
          'Eliminado!',
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

      this.authService.deleteNivel(id).subscribe(data => {
        this.obtenerNivel();
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
    this.Titulo = 'NIVEL: REGISTRO DE INFORMACIÓN';
    this.name_n='AGREGAR NIVEL:'
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
