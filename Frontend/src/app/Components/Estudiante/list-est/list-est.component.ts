import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-est',
  templateUrl: './list-est.component.html',
  styleUrls: ['./list-est.component.css']
})
export class ListEstComponent implements OnInit {

 estudiantes: any = {
    user : []
  }


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }
 
  Redirect(): void {
    this.router.navigateByUrl('/app/reg-admin');
  }

  //listar
  async obtenerEstudiantes() {
    const ObtenerEstudiante = new Promise(async (resolve, reject) => {
      await this.authService.getEstAll().subscribe(data => {
        resolve(data)
      })
    });

    this.estudiantes = await ObtenerEstudiante.then(res=>res);

  }

//borrar
  deleteEst(id: any){
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

        this.authService.deleteEst(id).subscribe(data => {
          this.obtenerEstudiantes();
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

  /////////  métodos /////////////////////////

  updateEst(id: any) {
    this.router.navigateByUrl('/app/edit-est/'+id);
  }

  viewEst(id: any) {
    this.router.navigateByUrl('/app/view-est/'+id);
  }

////////////// Alertas ///////////////////////////
AlertGuardar(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
}

AlertEliminar(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } 
  })
}


}
