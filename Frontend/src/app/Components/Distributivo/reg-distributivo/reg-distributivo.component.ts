import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reg-distributivo',
  templateUrl: './reg-distributivo.component.html',
  styleUrls: ['./reg-distributivo.component.css']
})
export class RegDistributivoComponent implements OnInit {
  //objeto docentes
  public data$: any = {
    dni: []
  }

  //objeto materias
  public datam$: any = {
    dni: []
  }

  //objeto horarios
  public horario: any = {
    dato: []
  }



  //formGroup
  AccesoForm: FormGroup;

  //objeto de docente
  docente: any = {

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

  public b: any = {
    dni: []
  }

  public num : boolean | null;

  //titulo
  Titulo = 'REGISTRO DE DISTRIBUTIVO';
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

  //periodo
  public Per = [{ name: "Seleccionar opción" }];
  elegir4: string = "";

  //Jornada
  public dia = [{ name: "Seleccionar opción" }, { name: "LUNES" }, { name: "MARTES" }, { name: "MIÉRCOLES" },
  { name: "JUEVES" }, { name: "VIERNES" }];
  elegir5: string = "";


  //Buscar Docente
  Buscar = [{ name: "N° identificación" },
  { name: "Apellidos" }, { name: "Nombres" }];
  elegido2: string = "";

  nombre: string | null;
  usuario: string | null;


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
      Area: ['', Validators.required],
      Asignatura: ['', Validators.required],
      Dia: [''],
      Hora_inicio: [''],
      Hora_fin: [''],
      Estado: ['', Validators.required]
    }),
      this.nombre = null,
      this.usuario = null,
      //mapeo de url con atributo
      this.estado = "",
      this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.idm = "",
      this.a = this.aRouter.snapshot.paramMap.get('id'),
      this.num =false
  }

  ngOnInit(): void {
    this.comboNivel();
    this.comboPeriodo();
    this.comboParalelo();
    this.esEditar();
    this.loginData();
  }


  repetido(DIS: any): void {
    this.num = false;

    this.authService.getDistributivoAll().subscribe(data => {
      this.b = data;   
    });
    
    this.b.dni.forEach((element: any, index: any, array: any) => {
      if(element.Docente[0]==DIS.Docente){
        if(element.Periodo==DIS.Periodo){
          if(element.Nivel == DIS.Nivel){
            if(element.Paralelo == DIS.Paralelo){
              if(element.Jornada == DIS.Jornada){
                if(element.Area == DIS.Area){
                  if(element.Asignatura == DIS.Asignatura){
                    this.num = true;
                  }
                }
              }
            }
          }
        }
      }
    })
  }

  //agregar datos o actualizar datos
  saveData() {
    if (this.a !== null) {
      this.upDate();
    } else {
      this.create();
    }
  }
  //editar para guardar usuario
  create() {
    if (this.docente._id !== undefined) {
      const DIS: any = {
        Docente: this.docente._id,
        Periodo: this.AccesoForm.get('Periodo')?.value,
        Nivel: this.AccesoForm.get('Nivel')?.value,
        Paralelo: this.AccesoForm.get('Paralelo')?.value,
        Jornada: this.AccesoForm.get('Jornada')?.value,
        Area: this.AccesoForm.get('Area')?.value,
        Asignatura: this.AccesoForm.get('Asignatura')?.value,
        Horario: this.horario.dato,
        Estado: this.AccesoForm.get('Estado')?.value
      }

      this.repetido(DIS);

      if (this.num==false) {
        this.authService.registerDistributivo(DIS).subscribe(data => {
          this.AlertExito();
           this.AccesoForm.reset();
        }, err => {
          console.log(err);
          this.AlertFracaso();
          //this.ProfesoresForm.reset();
        })
      }else{
        this.AlertFracaso();
      
      }
    }else{
      this.AlertCamposVacios();
    }

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
      this.N.push({ name: element.Nivel });
    });
  }

  async comboParalelo() {
    //obtener paralelo para combobox
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

  async comboPeriodo() {
    //obtener periodo lectivo para combobox
    const Obtenerper = new Promise(async (resolve, reject) => {
      await this.authService.getPeriodoAll().subscribe(data => {
        resolve(data)
      })
    });

    this.buscar3 = await Obtenerper.then(res => res);
    this.buscar3.dni.forEach((element: any, index: any, array: any) => {
      this.Per.push({ name: element.Codigo });
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
          const DIS: any = {
            Docente: this.docente._id,
            Periodo: this.AccesoForm.get('Periodo')?.value,
            Nivel: this.AccesoForm.get('Nivel')?.value,
            Paralelo: this.AccesoForm.get('Paralelo')?.value,
            Jornada: this.AccesoForm.get('Jornada')?.value,
            Area: this.AccesoForm.get('Area')?.value,
            Asignatura: this.AccesoForm.get('Asignatura')?.value,
            Horario: this.horario.dato,
            Estado: this.AccesoForm.get('Estado')?.value
          }

          this.authService.updateDistributivo(this.id, DIS).subscribe(data => {
            swalWithBootstrapButtons.fire(
              'Actualizado!',
              'Tu registro fue actualizado.',
              'success'
            )

          }, err => {
            console.log(err);
            this.AlertFracaso();
            //this.ProfesoresForm.reset();
          })
        }

       
      }
    })

  }

  // busqueda dinámica 
  async search() {
    const SCH: any = {
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
    const SCH: any = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }

    if (SCH.Search) {
      const ObtenerApellidos = new Promise(async (resolve, reject) => {
        await this.authService.obtenerProfesorApellido(SCH.Search).subscribe(data => {
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
    const SCH: any = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }

    if (SCH.Search) {
      const ObtenerNombres = new Promise(async (resolve, reject) => {
        await this.authService.obtenerProfesorNombres(SCH.Search).subscribe(data => {
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
    const SCH: any = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }

    if (SCH.Search) {
      const ObtenerProfesorDni = new Promise(async (resolve, reject) => {
        await this.authService.obtenerProfesorDni(SCH.Search).subscribe(data => {
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
       this.Titulo = 'ACTUALIZACIÓN DE DISTRIBUTIVO';
       this.authService.obtenerDistributivoId(this.id).subscribe(data => {
       this.AccesoForm.controls['Periodo'].setValue(data.Periodo);
        this.AccesoForm.controls['Nivel'].setValue(data.Nivel);
        this.AccesoForm.controls['Paralelo'].setValue(data.Paralelo);
        this.AccesoForm.controls['Jornada'].setValue(data.Jornada);
        this.AccesoForm.controls['Estado'].setValue(data.Estado);
        this.AccesoForm.controls['Area'].setValue(data.Area);
        this.AccesoForm.controls['Asignatura'].setValue(data.Asignatura);
        this.horario.dato = data.Horario;
         this.view(data.Docente);
      });
     
    }

  }

  // editar para agregar a _id de Profesor
  view(id: any) {

    this.authService.obtenerPorfesorId(id).subscribe(data => {
      this.docente = {
        _id: data._id,
        DNI: data.DNI,
        Nombres: data.Nombres + " " + data.Apellidos,
        Fecha_nacimiento: data.Fecha_nacimiento,
      }

    });

  }

  //dinamic combobox
  onSelect(event: any) {
    const nivel = event.target.value;
    if (nivel !== null) {
      this.authService.obtenerNVPorNivel(nivel).subscribe(data => {
        this.datam$ = data;
      });
    }

  }

  //seleccionar materia
  viewAsig(area: any, asignatura: any) {
    this.AccesoForm.controls['Area'].setValue(area);
    this.AccesoForm.controls['Asignatura'].setValue(asignatura);
  }

  //agragar horario
  agregar() {

    const HORARIO: any = {
      Dia: this.AccesoForm.get('Dia')?.value,
      Hora_inicio: this.AccesoForm.get('Hora_inicio')?.value,
      Hora_fin: this.AccesoForm.get('Hora_fin')?.value
    }


    this.horario.dato.push({
      Dia: HORARIO.Dia,
      Hora_inicio: HORARIO.Hora_inicio,
      Hora_fin: HORARIO.Hora_fin
    });
  }


  //borrar horario
  borrar(h: any) {
    this.horario.dato.forEach((element: any, index: any, array: any) => {
      if (element.Dia === h.Dia) {
        if (element.Hora_inicio === h.Hora_inicio) {
          if (element.Hora_fin === h.Hora_fin) {
            this.horario.dato.splice(index, 1);
          }
        }
      }
    });

  }


  logOut() {
    this.authService.logoutA();
    this.router.navigateByUrl('/app/log-admin')
  }


  loginData() {
    this.usuario = localStorage.getItem('user');
    const id = localStorage.getItem('id');
    if (id != null) {
      this.authService.obtenerPorfesorId(id).subscribe(data => {
        this.nombre = data.Apellidos + " " + data.Nombres;
      }, error => {
        console.log(error);
      });
    }


  }

  view2() {
    const id = localStorage.getItem('id');
    this.router.navigateByUrl('/admin/view-prof/' + id);
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
    
    const eliminadoh = this.horario.dato.splice(0, this.horario.dato.length+1);
    console.log(eliminadoh)

    const eliminadom = this.datam$.dni.splice(0, this.datam$.dni.length+1);
    console.log(eliminadom)

    this.esEditar();
    this.router.navigateByUrl('/admin/reg-dist');

  }


}
