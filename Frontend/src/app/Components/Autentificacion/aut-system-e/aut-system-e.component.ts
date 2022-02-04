import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Buscador } from 'src/app/models/buscador';


@Component({
  selector: 'app-aut-system-e',
  templateUrl: './aut-system-e.component.html',
  styleUrls: ['./aut-system-e.component.css']
})
export class AutSystemEComponent implements OnInit {
   //para buscador
  // public isloading = false;
   public src: string | undefined;
   public data$: any = {
     dni: []
   }
 
   //formGroup
   AccesoForm: FormGroup;
 
   //objeto de estudiante
   estudiante: any = {
  
   }
 
   //titulo
   Titulo = 'CREACIÓN DE USUARIOS';
   id: string | null;
   aux: string | null;
   estado: string | null;
 
   //Nombramiento
   Rol = [{ name: "Administrador" },
   { name: "Docente" }];
   elegido1: string = "";
 
   //Nombramiento
   Buscar = [{ name: "N° identificación" },
   { name: "Apellidos" }, { name: "Nombres" }];
   elegido2: string = "";

   nombre : string | null;
   usuario: string | null;
 
 
   constructor(private authService: AuthService, private router: Router,
     private fb: FormBuilder, private aRouter: ActivatedRoute) {
     //formGroup
     this.AccesoForm = this.fb.group({
       Usuario: ['', Validators.required],
       Contraseña: ['', Validators.required],
       Search: [''],
       Combo: ['']
     }),
     this.nombre = null;
     this.usuario = null;
     //mapeo de url con atributo
     this.estado = "",
     this.aux = this.aRouter.snapshot.paramMap.get('id'),
    this.id = null
      console.log(this.aux)
   }
 
  ngOnInit(): void {
    this.Obtener();
    this.loginData();
  }


  //agregar datos o actualizar datos
  saveData() {
    if (this.aux !== null) {
      this.upDate();
    } else {
      this.create();
    }
  }
   //editar para guardar usuario
   create() {
    const CUENTA: any = {
      Usuario: this.AccesoForm.get('Usuario')?.value,
      Contraseña: this.AccesoForm.get('Contraseña')?.value,
      Pass_temp:this.AccesoForm.get('Contraseña')?.value,
      Rol: "Estudiante",
      Vinculo: this.id
    }
    console.log(CUENTA);
    this.authService.registerAcceso(CUENTA).subscribe(data => {
      this.AlertExito();
      this.AccesoForm.reset();
    }, err => {
      console.log(err);
      this.AlertFracaso();
      //this.ProfesoresForm.reset();
    })


  }

   //Obtener datos para Editar
   async Obtener() {
    if (this.aux !== null) {

      this.authService.obtenerAccesoId(this.aux).subscribe(data => {
        this.AccesoForm.controls['Usuario'].setValue(data.Usuario);
        this.AccesoForm.controls['Contraseña'].setValue(data.Pass_temp);
        this.id = data.Vinculo[0];
       
        if (this.id !== null) {
          this.authService.obtenerEstudianteId(this.id).subscribe(data => {
            this.estudiante = {
              DNI: data.DNI,
              Nombres: data.Nombres + " " + data.Apellidos,
              Fecha_nacimiento: data.Fecha_nacimiento,

            }
          })

        }


      })

    }

  }


    //editar
  upDate() {

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

        if (this.aux !== null) {

           const CUENTA: any = {
            Usuario: this.AccesoForm.get('Usuario')?.value,
            Contraseña: this.AccesoForm.get('Contraseña')?.value,
            Pass_temp:this.AccesoForm.get('Contraseña')?.value,  
            Rol: "Estudiante"
          }
          console.log(CUENTA);
          this.authService.updateAcceso(this.aux,CUENTA).subscribe(data => {
            this.AlertExito()
      
          }, err => {
            console.log(err);
            this.AlertFracaso();
            //this.ProfesoresForm.reset();
          })
      
      
        }

        swalWithBootstrapButtons.fire(
          'Actualizado!',
          'Tu registro fue actualizado.',
          'success'
        )
      }
    })

  }



  // busqueda dinámica 
  async search() {
    const SCH: Buscador = {
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
    const SCH: Buscador = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }

    if (SCH.Search) {
      const ObtenerApellidos = new Promise(async (resolve, reject) => {
        await this.authService.obtenerEstudianteApellido(SCH.Search).subscribe(data => {
          resolve(data)
        })
      });
      this.data$ = await ObtenerApellidos.then(res => res);
     
      if(this.data$.dni.length == 0){
        this.AlertNoEncotrado();
    }
    } 
  }

  async searchNombre() {
    const SCH: Buscador = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }

    if (SCH.Search) {
      const ObtenerNombres = new Promise(async (resolve, reject) => {
        await this.authService.obtenerEstudianteNombres(SCH.Search).subscribe(data => {
          resolve(data)
        })
      });
      this.data$ = await ObtenerNombres.then(res => res);

      if(this.data$.dni.length == 0){
        this.AlertNoEncotrado();
    }
    }

  }

  async searchDni() {
    const SCH: Buscador = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }

    if (SCH.Search) {
      const ObtenerProfesorDni = new Promise(async (resolve, reject) => {
        await this.authService.obtenerEstudianteDni(SCH.Search).subscribe(data => {
          resolve(data)
        })
      });
      this.data$ = await ObtenerProfesorDni.then(res => res);
     
      if(this.data$.dni.length == 0){
        this.AlertNoEncotrado();
    }
    }

  }

  async esEditar() {
    if (this.id !== null) {

      this.authService.obtenerEstudianteId(this.id).subscribe(data => {

        this.estudiante = {
          DNI: data.DNI,
          Nombres: data.Nombres +" "+ data.Apellidos,
          Fecha_nacimiento: data.Fecha_nacimiento,
        }

      })

    }
  }

  // editar para agregar a _id de Profesor
  viewProf(id: any) {
  this.id = id;
  this.esEditar();
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
  

  ////////////// Alertas ///////////////////////////
  AlertGuardar() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  AlertEliminar() {
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


  ////////////////////////Redirecciones ////////////////////

  RedirectCancel(): void {
    this.AccesoForm.reset();
    this.router.navigateByUrl('/admin/aut-system-e');
    this.id="";
    this.aux= this.aRouter.snapshot.paramMap.get('id');


  }


}
