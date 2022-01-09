import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-rep',
  templateUrl: './list-rep.component.html',
  styleUrls: ['./list-rep.component.css']
})
export class ListRepComponent implements OnInit {

  representantes: any = {
    dni : []
  }

  AccesoForm: FormGroup;


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
    })
  }

  ngOnInit(): void {
    this.obtenerRepresentantes();
  }

  //listar
  async obtenerRepresentantes() {
    const ObtenerRepresentante = new Promise(async (resolve, reject) => {
      await this.authService.getRepAll().subscribe(data => {
        resolve(data)
      })
    });

    this.representantes = await ObtenerRepresentante.then(res=>res);

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
      await this.authService.obtenerRepresentanteApellido(SCH.Search).subscribe(data => {
        resolve(data)
      })
    });
    this.representantes = await ObtenerApellidos.then(res => res);
   
    if(this.representantes.dni.length == 0){
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
      await this.authService.obtenerRepresentanteNombres(SCH.Search).subscribe(data => {
        resolve(data)
      })
    });
    this.representantes = await ObtenerNombres.then(res => res);

    if(this.representantes.dni.length == 0){
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
      await this.authService.obtenerRepresentanteDni(SCH.Search).subscribe(data => {
        resolve(data)
      })
    });
    this.representantes = await ObtenerProfesorDni.then(res => res);
   
    if(this.representantes.user.length == 0){
      this.AlertNoEncotrado();
  }
  }

}


//borrar
  deleteRep(id: any){
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

        this.authService.deleteRepresentante(id).subscribe(data => {
          this.obtenerRepresentantes();
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
    this.router.navigateByUrl('/app/reg-rep');
  }

  updateRep(id: any) {
    this.router.navigateByUrl('/app/edit-rep/'+id);
  }

  viewRep(id: any) {
    this.router.navigateByUrl('/app/view-rep/'+id);
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
