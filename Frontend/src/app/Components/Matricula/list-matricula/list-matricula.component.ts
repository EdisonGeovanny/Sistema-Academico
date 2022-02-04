import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-matricula',
  templateUrl: './list-matricula.component.html',
  styleUrls: ['./list-matricula.component.css']
})
export class ListMatriculaComponent implements OnInit {
  public datam$: any = {
    dni: []
  }

  public datam2$: any = {
    dni: []
  }

  public matriculas: any = {
    dni: []
  }

  public estudiantes: any = {
    dni: []
  }

  public busqueda: any = {
    dni: []
  }

  //formGroup
  AccesoForm: FormGroup;

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
   
//titulo
Titulo = 'MATRICULAS';
id: string | null;

//combobox grado
public buscar: any = {
  dni: []
}

public buscar2: any = {
  dni: []
}

public buscar3: any = {
  dni:[]
}

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

  }),
  this.nombre = null,
  this.usuario = null,
//mapeo de url con atributo
this.id = null
}


  ngOnInit(): void {
    this.ObtenerMatricula();
    this.comboNivel();
    this.comboPeriodo();
    this.comboParalelo();
    this.loginData();
  }

  
  //Obtener datos para Editar
  async ObtenerMatricula() {
    const eliminados = this.datam$.dni.splice(0, this.datam$.dni.length + 1);
    const eliminados3 = this.datam2$.dni.splice(0, this.datam2$.dni.length + 1);
    const eliminados2 = this.busqueda.dni.splice(0, this.busqueda.dni.length + 1);

    const Obtenerm = new Promise(async (resolve, reject) => {
      await this.authService.getMatriculaAll().subscribe(data => {
        resolve(data)
      })
    });

    this.matriculas = await Obtenerm.then(res => res);


    const Obtenere = new Promise(async (resolve, reject) => {
      await this.authService.getEstAll().subscribe(data => {
        resolve(data)
      })
    });

    this.estudiantes = await Obtenere.then(res => res);
    
    this.matriculas.dni.forEach((matricula: any, index: any, array: any) => {
      this.estudiantes.dni.forEach((estudiante: any, index: any, array: any) => {
        if (matricula.Estudiante[0] == estudiante._id) {

          this.datam$.dni.push({
            _id: matricula._id,
            Estudiante:estudiante._id,
            Nombres: estudiante.Nombres,
            Apellidos: estudiante.Apellidos,
            DNI: estudiante.DNI,
            Periodo: matricula.Periodo,
            Nivel: matricula.Nivel,
            Paralelo: matricula.Paralelo,
            Jornada: matricula.Jornada,
            Estado: matricula.Estado
          });

          this.datam2$.dni.push({
            _id: matricula._id,
            Estudiante:estudiante._id,
            Nombres: estudiante.Nombres,
            Apellidos: estudiante.Apellidos,
            DNI: estudiante.DNI,
            Periodo: matricula.Periodo,
            Nivel: matricula.Nivel,
            Paralelo: matricula.Paralelo,
            Jornada: matricula.Jornada,
            Estado: matricula.Estado
          });

          this.busqueda.dni.push({
            _id: matricula._id,
            Estudiante:estudiante._id,
            Nombres: estudiante.Nombres,
            Apellidos: estudiante.Apellidos,
            DNI: estudiante.DNI,
            Periodo: matricula.Periodo,
            Nivel: matricula.Nivel,
            Paralelo: matricula.Paralelo,
            Jornada: matricula.Jornada,
            Estado: matricula.Estado
          });
        }

      });
    });

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

  // busqueda dinámica 
  async search() {
    const SCH: any = {
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
    const SCH: any = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }
    const eliminados = this.datam$.dni.splice(0, this.datam$.dni.length + 1);

    this.busqueda.dni.forEach((estudiante: any, index: any, array: any) => {
      if (estudiante.Apellidos == SCH.Search) {
        this.datam$.dni.push(estudiante);

      }

    });
   
  }

  async searchNombre() {
    const SCH: any = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }

    const eliminados = this.datam$.dni.splice(0, this.datam$.dni.length + 1);

    this.busqueda.dni.forEach((estudiante: any, index: any, array: any) => {
      if (estudiante.Nombres == SCH.Search) {
        this.datam$.dni.push(estudiante);

      }

    });
   
  }

  async searchDni() {
    const SCH: any = {
      Search: this.AccesoForm.get('Search')?.value,
      Combo: this.AccesoForm.get('Buscar')?.value,
    }
    const eliminados = this.datam$.dni.splice(0, this.datam$.dni.length + 1);

    this.busqueda.dni.forEach((estudiante: any, index: any, array: any) => {
      if (estudiante.DNI == SCH.Search) {
        this.datam$.dni.push(estudiante);

      }

    });
   
  }

  BuscarMatriculas(){
    const SCH: any = {
      Nivel: this.AccesoForm.get('Nivel')?.value,
      Paralelo: this.AccesoForm.get('Paralelo')?.value,
      Periodo: this.AccesoForm.get('Periodo')?.value,
      Jornada: this.AccesoForm.get('Jornada')?.value
    }
    const eliminados = this.datam2$.dni.splice(0, this.datam2$.dni.length + 1);

    this.busqueda.dni.forEach((estudiante: any, index: any, array: any) => {
      if (estudiante.Nivel == SCH.Nivel) {
       if(estudiante.Paralelo == SCH.Paralelo){
        if(estudiante.Periodo == SCH.Periodo){
          if(estudiante.Jornada == SCH.Jornada){
            this.datam2$.dni.push(estudiante);
          }
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

  view() {
    const id = localStorage.getItem('id');
    this.router.navigateByUrl('/admin/view-prof/' + id);
  }

  //Matricula
  View(id: any) {
    this.router.navigateByUrl('/admin/view-matricula/'+id);
    
    }
  
    Update(id: any) {
      console.log(id);
      this.router.navigateByUrl('/admin/edit-matricula/'+id);
      }
  
    //borrar
  Delete(id: any){
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

        this.authService.deleteMatricula(id).subscribe(data => {
          this.ObtenerMatricula();
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
