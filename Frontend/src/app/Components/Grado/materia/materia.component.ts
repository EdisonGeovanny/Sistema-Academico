import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  //formGroup
  GradoForm: FormGroup;

  //titulo
  Titulo = 'ASIGNATURA: REGISTRO DE INFORMACIÓN';
  subnivel = 'REGISTRO DE DATOS';
  btn_nivel = true;
  rep = false;
  name_n = 'AGREGAR ASIGNATURAS:';
  id_n: string | null;


  //Nombramiento
  public N = [{ name: "Seleccionar opción" }];
  elegir1: string = "";
  elegir2 : string = "";


  public buscar: any = {
    dni: []
  }

  public search: any = {
    dni: []
  }

  //nivel
  public asignaturas: any = {
    dni: []
  }

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.GradoForm = this.fb.group({
      //Nivel
      Nivel: ['', Validators.required],
      Area: ['', Validators.required],
      Asignatura: ['', Validators.required],
      Buscar: [''],


    }),
      this.id_n = null
  }


  ngOnInit(): void {
    this.obtenerAsignaturas();
    this.combo();
  }

  async combo() {
    //obtener nivel para combobox
    const Obtenern = new Promise(async (resolve, reject) => {
      await this.authService.getNivelAll().subscribe(data => {
        resolve(data)
      })
    });

    this.buscar = await Obtenern.then(res => res);
    this.buscar.dni.forEach((element: any, index: any, array: any) => {
      this.N.push({ name: element.Nivel });
    });

  }

  saveData() {
    if (this.btn_nivel) {
      this.create();
    } else {
      if (this.id_n !== null) {
        this.upDate(this.id_n);
      }
    }
  }

  create() {
    const MATERIA: any = {
      Nivel: this.GradoForm.get('Nivel')?.value,
      Area: this.GradoForm.get('Area')?.value,
      Asignatura: this.GradoForm.get('Asignatura')?.value
    }

    try {
      this.search.dni.forEach((element: any) => {
        if (element.Nivel === MATERIA.Nivel && element.Asignatura === MATERIA.Asignatura) {
          this.rep = true;
        }
      });
    } catch (e) {
      console.log(e)
    }


    if (!this.rep) {
      this.authService.registerNV(MATERIA).subscribe(data => {
        this.AlertExito();
        this.obtenerAsignaturas();
        this.GradoForm.reset();
        this.rep = false;

      }, err => {
        console.log(err);
        this.AlertFracaso();
        this.rep = false;
      })
    } else {
      this.AlertFracaso();
      this.rep = false;
    }

  }

  async obtenerAsignaturas() {
    //obtener asignatura
    const Obtener = new Promise(async (resolve, reject) => {
      await this.authService.getNVAll().subscribe(data => {
        resolve(data)
      })
    });

    this.asignaturas = await Obtener.then(res => res);



     //obtener asignatura
     const Obtener2 = new Promise(async (resolve, reject) => {
      await this.authService.getNVAll().subscribe(data => {
        resolve(data)
      })
    });

    this.search = await Obtener2.then(res => res);
  }

  async obtenerEdit(id: string) {
    this.Titulo = 'ASIGNATURA: ACTUALIZACIÓN DE INFORMACIÓN';
    this.subnivel = 'EDITOR DE DATOS';
    this.name_n = 'ACTUALIZACIÓN DE ASIGNATURA:'
    this.btn_nivel = false;
    this.id_n = id;


    this.authService.obtenerNVId(id).subscribe(data => {
      this.GradoForm.controls['Nivel'].setValue(data.Nivel);
      this.GradoForm.controls['Area'].setValue(data.Area);
      this.GradoForm.controls['Asignatura'].setValue(data.Asignatura);
    })
  }

  //actualizar
  upDate(id: string): void {

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

        const MATERIA: any = {
          Nivel: this.GradoForm.get('Nivel')?.value,
          Area: this.GradoForm.get('Area')?.value,
          Asignatura: this.GradoForm.get('Asignatura')?.value
        }
        this.authService.updateNV(id, MATERIA).subscribe(data => {
          this.AlertExito2();
          this.obtenerAsignaturas();

        }, err => {
          console.log(err);
          this.AlertFracaso();
        })


        swalWithBootstrapButtons.fire(
          'Actualizado!',
          'Tu registro fue actualizado.',
          'success'
        )
      }
    })
  }

  //borrar
  delete(id: any) {
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

        this.authService.deleteNV(id).subscribe(data => {
          this.obtenerAsignaturas();
        }, error => {
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

  nuevo() {
    this.Titulo = 'PARALELO: REGISTRO DE INFORMACIÓN';
    this.name_n = 'AGREGAR PARALELO:'
    this.btn_nivel = true;
    this.id_n = null;
    this.GradoForm.reset();
  }

  async Buscar() {
    const SEARCH: any = {
      nivel: this.GradoForm.get('Buscar')?.value
    }

    console.log(SEARCH);

    try {

      if (SEARCH.nivel !== "") {
        //obtener asignatura
        const Obtener = new Promise(async (resolve, reject) => {
          await this.authService.obtenerNVPorNivel( SEARCH.nivel).subscribe(data => {
            resolve(data)
          })
        });
        this.asignaturas = await Obtener.then(res => res);
 
      }else{ 
        this.AlertCamposVacios();
      }
    } catch (e) {
      console.log(e)
    }


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
