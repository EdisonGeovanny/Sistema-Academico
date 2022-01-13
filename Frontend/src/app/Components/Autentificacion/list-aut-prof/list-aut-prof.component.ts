import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-list-aut-prof',
  templateUrl: './list-aut-prof.component.html',
  styleUrls: ['./list-aut-prof.component.css']
})
export class ListAutProfComponent implements OnInit {

  docentes: any = {
    dni: []
  }

  acceso: any = {
    dni: []
  }

  busqueda: any = {
    dni: []
  }

  lista: any = {
    dni: []
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
    this.obtenerAcceso();
  }

  //listar
  async obtenerAcceso() {
    const eliminados = this.lista.dni.splice(0, this.lista.dni.length + 1);
    const eliminados2 = this.busqueda.dni.splice(0, this.busqueda.dni.length + 1);

    //obtener datos de ficha
    const Acceso = new Promise(async (resolve, reject) => {
      await this.authService.getAccesoAll().subscribe(data => {
        resolve(data)
      })
    });
    this.acceso = await Acceso.then(res => res);
    // console.log(this.acceso)



    //obtener datos de Docente
    const Docente = new Promise(async (resolve, reject) => {
      await this.authService.getProfAll().subscribe(data => {
        resolve(data)
      })
    });
    this.docentes = await Docente.then(res => res);
    //console.log(this.docentes)


    this.acceso.dni.forEach((acceso: any, index: any, array: any) => {
      this.docentes.dni.forEach((docente: any, index: any, array: any) => {
        if (acceso.Vinculo[0] == docente._id) {

          this.lista.dni.push({
            _id: acceso._id,
            Docente: docente._id,
            Vinculo: docente._id,
            Nombres: docente.Nombres,
            Apellidos: docente.Apellidos,
            DNI: docente.DNI,
            Usuario: acceso.Usuario,
            Rol: acceso.Rol
          });

          this.busqueda.dni.push({
            _id: acceso._id,
            Docente: docente._id,
            Vinculo: docente._id,
            Nombres: docente.Nombres,
            Apellidos: docente.Apellidos,
            DNI: docente.DNI,
            Usuario: acceso.Usuario,
            Rol: acceso.Rol
          })
        }

      });
    });

    console.log(this.acceso);
    console.log(this.docentes);
    console.log(this.lista);
    //console.log(this.docentes)

  }

  // busqueda dinámica 
  async search() {
    // console.log(eliminados);

    const SCH: any = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Combo')?.value,
    }


    if (SCH.Search) {
      const eliminados = this.lista.dni.splice(0, this.lista.dni.length + 1);

      if (SCH.Combo == "N° identificación" || SCH.Combo == "elegido2" || SCH.Combo == "") {
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
      Combo: this.AccesoForm.get('Combo')?.value,
    }

    console.log(SCH)

    if (SCH.Search) {
      console.log(this.busqueda.dni)
      console.log(this.lista)
      this.busqueda.dni.forEach((element: any, index: any, array: any) => {
        console.log(element.Apellidos)
        if (element.Apellidos == SCH.Search) {
          this.lista.dni.push(element);
        }
      });
      if (this.lista.dni.length == 0) {
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
      this.busqueda.dni.forEach((element: any, index: any, array: any) => {
        if (element.Nombres == SCH.Search) {
          this.lista.dni.push(element);
        }
      });

      console.log(this.busqueda)


      if (this.lista.dni.length == 0) {
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

      this.busqueda.dni.forEach((element: any, index: any, array: any) => {
        if (element.DNI == SCH.Search) {
          this.lista.dni.push(element);
        }
      });

      if (this.lista.dni.length == 0) {
        this.AlertNoEncotrado();
      }

    }

  }

  //borrar
  deleteAut(id: any) {
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

        this.authService.deleteAcceso(id).subscribe(data => {
          this.obtenerAcceso();
        } , error => {
            console.log(error);
          });


        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Tu registro fue eliminado.',
          'success'
        )
      }
    })
  }

  /////////  métodos /////////////////////////

  updateAut(id: any) {
    this.router.navigateByUrl('/app/edit-aut/' + id);

  }

  viewAut(id: any) {
    this.router.navigateByUrl('/app/view-prof/' + id);
  }

  /////Alertas/////////////////////////
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
