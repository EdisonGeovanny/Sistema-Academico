import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-rep',
  templateUrl: './list-rep.component.html',
  styleUrls: ['./list-rep.component.css']
})
export class ListRepComponent implements OnInit {

  representantes: any = {
    user : []
  }
  
  constructor(private authService: AuthService, private router: Router) { }

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
