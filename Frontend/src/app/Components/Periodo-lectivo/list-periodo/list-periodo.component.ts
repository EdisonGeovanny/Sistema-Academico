import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-periodo',
  templateUrl: './list-periodo.component.html',
  styleUrls: ['./list-periodo.component.css']
})
export class ListPeriodoComponent implements OnInit {

  PeriodoForm: FormGroup;

  //titulo
  Titulo = 'LISTA DE INFORMACIÓN';
  subnivel = 'ACÁDEMICO';
  id: string | null;
  estado: string | null;

  //listar periodos
  periodos: any = {
    dni: []
  }

  //visualizar busqueda
  periodo: any = {
 
  }

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.PeriodoForm = this.fb.group({
      Search: ['']

    })
    this.id = this.aRouter.snapshot.paramMap.get('id'),
    this.estado=""
    //  console.log(this.id)
  }


  ngOnInit(): void {
    this.obtenerPeriodos()
  }

  

 //listar
 async obtenerPeriodos() {
  const Obtener = new Promise(async (resolve, reject) => {
    await this.authService.getPeriodoAll().subscribe(data => {
      resolve(data)
      console.log(data)
    })
  });

  this.periodos = await Obtener.then(res => res);

}


//Obtener datos para Editar
esEditar() {
  if (this.id !== null ) {
    this.Titulo = 'ACTUALIZACIÓN DE INFORMACIÓN';
    this.subnivel = 'EDITOR DE DATOS';

    this.authService.obtenerPeriodoId(this.id).subscribe(data => {   
     this.PeriodoForm.controls['Codigo'].setValue(data.Codigo);
     this.PeriodoForm.controls['Descripcion'].setValue(data.Descripcion);
     this.PeriodoForm.controls['Fecha_inicio'].setValue(data.Fecha_inicio);
     this.PeriodoForm.controls['Fecha_fin'].setValue(data.Fecha_fin);
     this.PeriodoForm.controls['Nota_base'].setValue(data.Nota_base);
     this.PeriodoForm.controls['Nota_maxima'].setValue(data.Nota_maxima);
     this.PeriodoForm.controls['Faltas_maximas'].setValue(data.Faltas_maximas);
     this.PeriodoForm.controls['Numero_alumnos'].setValue(data.Numero_alumnos);
     this.PeriodoForm.controls['Estado'].setValue(data.Estado);
    })


  }
}


 
async search() {
  const SCH: any = {
    Search: this.PeriodoForm.get('Search')?.value,
  }

  if (SCH.Search) {
    const Obtener = new Promise(async (resolve, reject) => {
      await this.authService.obtenerPeridoCodigo(SCH.Search).subscribe(data => {
        resolve(data)
      })
    });
    this.periodos = await Obtener.then(res => res);

    if (this.periodos.dni.length == 0) {
      this.AlertNoEncotrado();
    }
  }else{ this.AlertCamposVacios();}
}
////////////////////////Redirecciones ////////////////////


//borrar
deletePer(id: any){
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

      this.authService.deletePeriodo(id).subscribe(data => {
        this.obtenerPeriodos();
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

/////////  métodos /////////////////////////

updatePer(id: any) {
  this.router.navigateByUrl('/app/edit-periodo/'+id);
}

viewPer(id: any) {
  if (id !== null) {

    this.authService.obtenerPeriodoId(id).subscribe(data => {
      
      if(data.Estado){
         this.estado = "habilitado";
        }else{ this.estado = "deshabilitado";}

        this.periodo = {
          Codigo: data.Codigo,
          Descripcion: data.Descripcion,
          Fecha_inicio: data.Fecha_inicio,
          Fecha_fin: data.Fecha_fin,
          Nota_base: data.Nota_base,
          Nota_maxima: data.Nota_maxima,
          Faltas_maximas: data.Faltas_maximas,
          Numero_alumnos: data.Numero_alumnos,
          Estado: this.estado
        }

    })

  }

}

///////////   ventanas de alerta    ///////////////////
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
    title: 'Conficto..!<br>' +
      'Existe un registro con el mismo número de identificación',
    showConfirmButton: false,
    timer: 2500
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
