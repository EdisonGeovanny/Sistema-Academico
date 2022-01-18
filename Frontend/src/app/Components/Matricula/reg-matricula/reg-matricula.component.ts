import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Buscador } from 'src/app/models/buscador';

@Component({
  selector: 'app-reg-matricula',
  templateUrl: './reg-matricula.component.html',
  styleUrls: ['./reg-matricula.component.css']
})
export class RegMatriculaComponent implements OnInit {
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

  //combobox grado
  public buscar: any = {
    dni: []
  }

  public buscar2: any = {
    dni: []
  }

  public buscar3: any = {
    dni: []
  }

  //titulo
  Titulo = 'MATRICULAS';
  id: string | null;
  a: string | null;
  idm: string | null;
  estado: string | null;

  //Paralelo
  public P = [{ name: "Seleccionar opción" }];
  elegir2: string = "";

  //Nivel
  public N = [{ name: "Seleccionar opción" }];
  elegir1: string = "";

  //Jornada
  public J = [{ name: "Seleccionar opción" }, { name: "MATUTINA" }, { name: "VESPERTINA" }];
  elegir3: string = "";
  //Jornada
  public Per = [{ name: "Seleccionar opción" }];
  elegir4: string = "";

  //Nombramiento
  Buscar = [{ name: "N° identificación" },
  { name: "Apellidos" }, { name: "Nombres" }];
  elegido2: string = "";

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    //formGroup
    this.AccesoForm = this.fb.group({
      Search: [''],
      Combo: [''],
      Periodo: ['', Validators.required],
      Paralelo: ['', Validators.required],
      Nivel: ['', Validators.required],
      Jornada: ['', Validators.required],
      Estado: ['', Validators.required]
    }),
      //mapeo de url con atributo
      this.estado = "",
      this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.idm = "",
      this.a = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.comboNivel();
    this.comboPeriodo();
    this.comboParalelo();
    this.esEditar();
  }

  //agregar datos o actualizar datos
  saveData() {
    if (this.a !== null) {
      console.log("id guardar: "+this.a)
      this.upDate();
    } else {
      this.create();
    }
  }
  //editar para guardar usuario
  create() {
    const MATRICULA: any = {
      Estudiante: this.id,
      Periodo: this.AccesoForm.get('Periodo')?.value,
      Nivel: this.AccesoForm.get('Nivel')?.value,
      Paralelo: this.AccesoForm.get('Paralelo')?.value,
      Jornada: this.AccesoForm.get('Jornada')?.value,
      Estado: this.AccesoForm.get('Estado')?.value
    }
    console.log(MATRICULA);
    this.authService.registerMatricula(MATRICULA).subscribe(data => {
      this.AlertExito();
      // this.AccesoForm.reset();
    }, err => {
      console.log(err);
      this.AlertFracaso();
      //this.ProfesoresForm.reset();
    })


  }

async comboNivel() {
    //obtener nivel para combobox
    const Obtenern = new Promise(async (resolve, reject) => {
      await this.authService.getNivelAll().subscribe(data => {
        resolve(data)
      })
    });

    this.buscar = await Obtenern.then(res => res);
    this.buscar.dni.forEach((element: any, index: any, array: any) => {
      this.N.push({name: element.Nivel});
    });
}

async comboParalelo(){
    //obtener paralelo para combobox
    const Obtener = new Promise(async (resolve, reject) => {
      await this.authService.getParaleloAll().subscribe(data => {
        resolve(data)
      })
    });

    this.buscar2 = await Obtener.then(res => res);
    this.buscar2.dni.forEach((element: any, index: any, array: any) => {
      this.P.push({name: element.Paralelo});
    });

}

  async comboPeriodo() {
 //obtener periodo lectivo para combobox
 const Obtenerper = new Promise(async (resolve, reject) => {
  await this.authService.getPeriodoAll().subscribe(data => {
    resolve(data)
  })
});

this.buscar3 = await Obtenerper.then(res => res);
this.buscar3.dni.forEach((element: any, index: any, array: any) => {
  this.Per.push({name: element.Codigo});
});

   
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

        if (this.id !== null) {
          this.authService.obtenerMatriculaporEstudiante(this.id).subscribe(data => {
            
            this.idm = data[0]._id;

            console.log("id matricula: "+this.idm)
            if (this.idm !== null) {
              const MATRICULA: any = {
                Estudiante: this.id,
                Periodo: this.AccesoForm.get('Periodo')?.value,
                Nivel: this.AccesoForm.get('Nivel')?.value,
                Paralelo: this.AccesoForm.get('Paralelo')?.value,
                Jornada: this.AccesoForm.get('Jornada')?.value,
                Estado: this.AccesoForm.get('Estado')?.value
              }
              this.authService.updateMatricula(this.idm, MATRICULA).subscribe(data => {
              
  
              }, err => {
                console.log(err);
                this.AlertFracaso();
                //this.ProfesoresForm.reset();
              })
  
            }

          }, err => {
            console.log(err);
            this.AlertFracaso();
            //this.ProfesoresForm.reset();
          });

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

      if (this.data$.dni.length == 0) {
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

      if (this.data$.dni.length == 0) {
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

      if (this.data$.dni.length == 0) {
        this.AlertNoEncotrado();
      }
    }

  }

  async esEditar() {
    if (this.id !== null) {

      this.authService.obtenerEstudianteId(this.id).subscribe(data => {

        this.estudiante = {
          DNI: data.DNI,
          Nombres: data.Nombres + " " + data.Apellidos,
          Fecha_nacimiento: data.Fecha_nacimiento,
        }

      });

      this.authService.obtenerMatriculaporEstudiante(this.id).subscribe(data => { 
        this.AccesoForm.controls['Periodo'].setValue(data[0].Periodo);
        this.AccesoForm.controls['Nivel'].setValue(data[0].Nivel);
        this.AccesoForm.controls['Paralelo'].setValue(data[0].Paralelo);
       this.AccesoForm.controls['Jornada'].setValue(data[0].Jornada);
       this.AccesoForm.controls['Estado'].setValue(data[0].Estado);

      });

    }
  }

  // editar para agregar a _id de Profesor
  viewProf(id: any) {
    this.id = id;
    this.esEditar();
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
    this.id = null;
    this.esEditar();
    this.router.navigateByUrl('/app/reg-matricula');

  }



}
