import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-list-prof',
  templateUrl: './list-prof.component.html',
  styleUrls: ['./list-prof.component.css']
})
export class ListProfComponent implements OnInit {
  profesores: any = {
    user : []
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProfesores();
  }

  
//listar
  async obtenerProfesores() {
    const ObtenerProfesor = new Promise(async (resolve, reject) => {
      await this.authService.getProfAll().subscribe(data => {
        resolve(data)
      })
    });

    this.profesores = await ObtenerProfesor.then(res=>res);

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
    this.router.navigateByUrl('/app/reg-prof');
  }

  updateProf(id: any) {
    this.router.navigateByUrl('/app/edit-prof/'+id);
  }

  viewProf(id: any) {
    this.router.navigateByUrl('/app/view-prof/'+id);
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
