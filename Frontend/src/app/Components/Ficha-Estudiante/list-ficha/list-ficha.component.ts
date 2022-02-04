import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-ficha',
  templateUrl: './list-ficha.component.html',
  styleUrls: ['./list-ficha.component.css']
})
export class ListFichaComponent implements OnInit {

  estudiantes: any = {
    dni: []
  }

  fichas: any = {
    dni: []
  }

  busqueda: any = {
    dni: []
  }

  lista: any = {
    dni: []
  }

  aux: any = {
    dni: []
  }

  AccesoForm: FormGroup;


  //para buscador
  public isloading = false;
  public src: string | undefined;

  nombre : string | null;
  usuario: string | null;


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
    this.nombre = null;
    this.usuario = null;
  }


  ngOnInit(): void {
    this.obtenerEstudiantes();
    this.loginData();
  }



  Redirect(): void {
    this.router.navigateByUrl('/admin/reg-admin');
  }

  //listar
  async obtenerEstudiantes() {
    const eliminados =  this.lista.dni.splice(0, this.lista.dni.length+1);
    const eliminados2 = this.busqueda.dni.splice(0, this.busqueda.dni.length + 1);

    //obtener datos de ficha
    const FichaEstudiante = new Promise(async (resolve, reject) => {
      await this.authService.getFichaAll().subscribe(data => {
        resolve(data)
      })
    });
    this.fichas = await FichaEstudiante.then(res => res);
    //console.log(this.fichas)



    //obtener datos de estudiante
    const ObtenerEstudiante = new Promise(async (resolve, reject) => {
      await this.authService.getEstAll().subscribe(data => {
        resolve(data)
      })
    });
    this.estudiantes = await ObtenerEstudiante.then(res => res);
    //console.log(this.estudiantes)

    this.fichas.dni.forEach((ficha: any, index: any, array: any) => {
      this.estudiantes.dni.forEach((estudiante: any, index: any, array: any) => {
        if (ficha.Estudiante == estudiante._id) {
          this.lista.dni.push({
            _id: ficha._id,
            Estudiante: estudiante._id,
            Nombres: estudiante.Nombres,
            Apellidos: estudiante.Apellidos,
            DNI: estudiante.DNI,
            Codigo: estudiante.Codigo
          });

          this.busqueda.dni.push({
            _id: ficha._id,
            Estudiante: estudiante._id,
            Nombres: estudiante.Nombres,
            Apellidos: estudiante.Apellidos,
            DNI: estudiante.DNI,
            Codigo: estudiante.Codigo
          })
        }
      });
    });

  }

  // busqueda dinámica 
  async search() {
    // console.log(eliminados);

    const SCH: any = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Combo')?.value,
    }
    console.log(SCH);


    if (SCH.Search) {
      const eliminados =  this.lista.dni.splice(0, this.lista.dni.length+1);

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
      Combo: this.AccesoForm.get('Buscar')?.value,
    }

    if (SCH.Search) {
      this.busqueda.dni.forEach((element: any, index: any, array: any) => {
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
  deleteEst(id: any) {
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

        this.authService.deleteFicha(id).subscribe(data => {
          this.obtenerEstudiantes();

        }, error => {
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

  updateEst(id: any) {
    this.router.navigateByUrl('/admin/edit-ficha/' + id);
  }

  viewEst(id: any) {
    this.router.navigateByUrl('/admin/view-ficha/' + id);
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
