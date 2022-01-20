import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-distributivo',
  templateUrl: './list-distributivo.component.html',
  styleUrls: ['./list-distributivo.component.css']
})
export class ListDistributivoComponent implements OnInit {
  public datam$: any = {
    dni: []
  }

  public distributivos: any = {
    dni: []
  }

  public docentes: any = {
    dni: []
  }

  public busqueda: any = {
    dni: []
  }

  //formGroup
  AccesoForm: FormGroup;


     //Nombramiento
   Buscar = [{ name: "N° identificación" },
   { name: "Apellidos" }, { name: "Nombres" }];
   elegido2: string = "";
   
//titulo
Titulo = 'DISTRIBUTIVO DOCENCIAL';
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

constructor(private authService: AuthService, private router: Router,
  private fb: FormBuilder, private aRouter: ActivatedRoute) {
  //formGroup
  this.AccesoForm = this.fb.group({
    Search: [''],
    Combo: [''],

  }),
//mapeo de url con atributo
this.id = null
}


  ngOnInit(): void {
    this.ObtenerDistributivo();
  }
  
   
  //Obtener datos para Editar
  async ObtenerDistributivo() {
    const eliminados = this.datam$.dni.splice(0, this.datam$.dni.length + 1);
    const eliminados2 = this.busqueda.dni.splice(0, this.busqueda.dni.length + 1);

    const Obtenerm = new Promise(async (resolve, reject) => {
      await this.authService.getDistributivoAll().subscribe(data => {
        resolve(data)
      })
    });

    this.distributivos = await Obtenerm.then(res => res);
    console.log(this.distributivos)

    const Obtenere = new Promise(async (resolve, reject) => {
      await this.authService.getProfAll().subscribe(data => {
        resolve(data)
      })
    });

    this.docentes = await Obtenere.then(res => res);
    console.log(this.docentes)


    this.distributivos.dni.forEach((d: any, index: any, array: any) => {
      this.docentes.dni.forEach((p: any, index: any, array: any) => {
        if (d.Docente[0] == p._id) {

          this.datam$.dni.push({
            _id: d._id,
            Docente:p._id,
            Nombres: p.Nombres,
            Apellidos: p.Apellidos,
            DNI: p.DNI,
            Periodo: d.Periodo,
            Nivel: d.Nivel,
            Paralelo: d.Paralelo,
            Jornada: d.Jornada,
            Area:d.Area,
            Asignatura: d.Asignatura,
            Estado: d.Estado
          });

          this.busqueda.dni.push({
            _id: d._id,
            Docente:p._id,
            Nombres: p.Nombres,
            Apellidos: p.Apellidos,
            DNI: p.DNI,
            Periodo: d.Periodo,
            Nivel:d.Nivel,
            Paralelo: d.Paralelo,
            Jornada:d.Jornada,
            Area:d.Area,
            Asignatura: d.Asignatura,
            Estado: d.Estado
          });
        }

      });
    });


console.log(this.datam$)
console.log(this.busqueda)

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

  //Matricula
  View(id: any) {
    this.router.navigateByUrl('/app/view-dist/'+id);
    
    }
  
    Update(id: any) {
      console.log(id);
      this.router.navigateByUrl('/app/edit-dist/'+id);
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

        this.authService.deleteDistributivo(id).subscribe(data => {
          this.ObtenerDistributivo();
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
