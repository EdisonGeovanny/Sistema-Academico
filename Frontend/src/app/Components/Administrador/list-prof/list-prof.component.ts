import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-list-prof',
  templateUrl: './list-prof.component.html',
  styleUrls: ['./list-prof.component.css']
})
export class ListProfComponent implements OnInit {
  profesores: any = {
    dni : []
  }
  AccesoForm: FormGroup;

  nombre : string | null;
  usuario: string | null;


  //para buscador
  public isloading = false;
  public src: string | undefined;
  

   //Nombramiento
   Buscar = [{ name: "N° identificación" },
   { name: "Apellidos" }, { name: "Nombres" }];
   elegido2: string = "";
   
  //titulo
  Titulo = 'LISTA DE REGISTROS';
  subnivel = 'REGISTRO DE DATOS';

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    //formGroup
    this.AccesoForm = this.fb.group({
      Search: ['', Validators.required],
      Combo: ['', Validators.required]
    }),
    this.nombre = '';
    this.usuario = '';
  }

  ngOnInit(): void {
    this.obtenerProfesores();
    this.loginData();
  }

  
//listar
  async obtenerProfesores() {
    const ObtenerProfesor = new Promise(async (resolve, reject) => {
      await this.authService.getProfAll().subscribe(data => {
        resolve(data)
        console.log(data)
      })
    });

    this.profesores = await ObtenerProfesor.then(res=>res);

  }

// busqueda dinámica 
async search() {
  const SCH: any = {
    Search: this.AccesoForm.get('Search')?.value,
    Combo: this.AccesoForm.get('Combo')?.value,
  }
  console.log(SCH);

  if (SCH.Search) {
    if (SCH.Combo == "N° identificación" || SCH.Combo == "elegido2" || SCH.Combo == "" ) {
      this.searchDni();
    }
     if (SCH.Combo == "Nombres") {
      this.searchNombre();
    }
    if (SCH.Combo == "Apellidos") {
      this.searchApellido();
    }

  } else {
    this.AlertCamposVacios();
  }


}

async searchApellido() {
  const SCH: any = {
    Search: this.AccesoForm.get('Search')?.value,
    Combo: this.AccesoForm.get('Buscar')?.value,
  }

  if (SCH.Search) {
    const ObtenerApellidos = new Promise(async (resolve, reject) => {
      await this.authService.obtenerProfesorApellido(SCH.Search).subscribe(data => {
        resolve(data)
      })
    });
    this.profesores = await ObtenerApellidos.then(res => res);
   
    if(this.profesores.dni.length == 0){
      this.AlertNoEncotrado();
  }
  } 
}

async searchNombre() {
  const SCH: any = {
    Search: this.AccesoForm.get('Search')?.value,
    Combo: this.AccesoForm.get('Buscar')?.value,
  }

  if (SCH.Search) {
    const ObtenerNombres = new Promise(async (resolve, reject) => {
      await this.authService.obtenerProfesorNombres(SCH.Search).subscribe(data => {
        resolve(data)
      })
    });
    this.profesores = await ObtenerNombres.then(res => res);

    if(this.profesores.dni.length == 0){
      this.AlertNoEncotrado();
  }
  }

}

async searchDni() {
  const SCH: any = {
    Search: this.AccesoForm.get('Search')?.value,
    Combo: this.AccesoForm.get('Buscar')?.value,
  }

  if (SCH.Search) {
    const ObtenerProfesorDni = new Promise(async (resolve, reject) => {
      await this.authService.obtenerProfesorDni(SCH.Search).subscribe(data => {
        resolve(data)
      })
    });
    this.profesores = await ObtenerProfesorDni.then(res => res);
   
    if(this.profesores.user.length == 0){
      this.AlertNoEncotrado();
  }
  }

}



//borrar
  deleteProfesor(id: any){
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

        this.authService.deleteProfesor(id).subscribe(data => {
          this.obtenerProfesores();
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

  /////////  Redireccion /////////////////////////
  Redirect(): void {
    this.router.navigateByUrl('/admin/reg-prof');
  }

  updateProf(id: any) {
    this.router.navigateByUrl('/admin/edit-prof/'+id);
  }

  viewProf(id: any) {
    this.router.navigateByUrl('/admin/view-prof/'+id);
  }


  // datos de usuario para
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

////////////// Alertas ///////////////////////////

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
