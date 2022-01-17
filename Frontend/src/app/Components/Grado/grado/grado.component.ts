import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {
  //formGroup
  GradoForm: FormGroup;

  //titulo
  Titulo = 'GRADO: REGISTRO DE INFORMACIÓN';
  subnivel = 'REGISTRO DE DATOS';
  btn_nivel = true;
  name_n = 'AGREGAR GRADO:';
  id_n: string | null;


  public buscar: any = {
    dni: []
  }

  public buscar2: any = {
    dni: []
  }

  //Paralelo
  public P = [{ name: "Seleccionar opción" }];
  elegir2: string = "";

  //Nivel
  public N = [{ name: "Seleccionar opción" }];
  elegir1: string = "";
  elegir4: string = "";

  //Jornada
  public J = [{ name: "Seleccionar opción" }, { name: "MATUTINA" }, { name: "VESPERTINA" }];
  elegir3: string = "";
  elegir5: string = "";

  //nivel
  public niveles: any = {
    dni: []
  }

  //obtener por jornada
  public npj: any = {
    dni: []
  }

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.GradoForm = this.fb.group({
      //Nivel
      Nivel: ['', Validators.required],
      Paralelo: ['', Validators.required],
      Jornada: ['', Validators.required],
      BuscarJ: [''],
      BuscarN: ['']
    }),
      this.id_n = null


  }

  ngOnInit(): void {
    this.obtenerGrado();
    this.combo();
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

 async create() {
    const GRADO: any = {
      Nivel: this.GradoForm.get('Nivel')?.value,
      Paralelo: this.GradoForm.get('Paralelo')?.value,
      Jornada: this.GradoForm.get('Jornada')?.value
    }

    const sch = GRADO.Nivel+"-"+GRADO.Paralelo+"-"+GRADO.Jornada
    console.log(sch)
    const Obtener = new Promise(async (resolve, reject) => {
      await this.authService.obtenerNPJ(sch).subscribe(data => {
        resolve(data)
      })
    });

    this.npj = await Obtener.then(res => res);
    console.log(this.npj.dni)

    if(this.npj.dni.length===0){
      console.log(GRADO)
      this.authService.registerGrado(GRADO).subscribe(data => {
        this.AlertExito();
        this.obtenerGrado();
        this.GradoForm.reset();
  
      }, err => {
        console.log(err);
        this.AlertFracaso();
      })
    }else{
      this.AlertFracaso();
      this.npj = null;
    }
  }

  async obtenerGrado() {
    const Obtener = new Promise(async (resolve, reject) => {
      await this.authService.getGradoAll().subscribe(data => {
        resolve(data)
      })
    });

    this.niveles = await Obtener.then(res => res);
  }

  async obtenerEdit(id: string) {
    this.Titulo = 'ACTUALIZACIÓN DE INFORMACIÓN';
    this.subnivel = 'EDITOR DE DATOS';
    this.name_n = 'ACTUALIZACIÓN DE GRADO:'
    this.btn_nivel = false;
    this.id_n = id;


    this.authService.obtenerGradoId(id).subscribe(data => {
      this.GradoForm.controls['Nivel'].setValue(data.Nivel);
      this.GradoForm.controls['Paralelo'].setValue(data.Paralelo);
      this.GradoForm.controls['Jornada'].setValue(data.Jornada);
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

        const GRADO: any = {
          Nivel: this.GradoForm.get('Nivel')?.value,
          Paralelo: this.GradoForm.get('Paralelo')?.value,
          Jornada: this.GradoForm.get('Jornada')?.value
        }
        this.authService.updateGrado(id, GRADO).subscribe(data => {
          this.AlertExito2();
          this.obtenerGrado();

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

        this.authService.deleteGrado(id).subscribe(data => {
          this.obtenerGrado();
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

  nuevoGrado() {
    this.name_n = 'AGREGAR GRADO:'
    this.btn_nivel = true;
    this.id_n = null;
    this.GradoForm.reset();
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



    //obtener nivel para combobox
    const Obtener = new Promise(async (resolve, reject) => {
      await this.authService.getParaleloAll().subscribe(data => {
        resolve(data)
      })
    });

    this.buscar2 = await Obtener.then(res => res);
    this.buscar2.dni.forEach((element: any, index: any, array: any) => {
      this.P.push({ name: element.Paralelo });
    });
  }

  async Buscar() {
    const SEARCH: any = {
      jornada: this.GradoForm.get('BuscarJ')?.value,
      nivel: this.GradoForm.get('BuscarN')?.value
    }

    try {

      if (SEARCH.jornada !== "") {
        if(SEARCH.nivel!==""){
          const busqueda = SEARCH.jornada+"-"+SEARCH.nivel;
          console.log(busqueda);
        const Obtener = new Promise(async (resolve, reject) => {
          await this.authService.obtenerGradoporJornada(busqueda).subscribe(data => {
            resolve(data)   
          })
        });
        this.niveles = await Obtener.then(res => res);
       
      } else {
        this.AlertCamposVacios();
      }
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
