import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {UserRegAcceso } from 'src/app/models/user-reg-acceso';
import { Buscador } from 'src/app/models/buscador';
import { Ficha } from 'src/app/models/ficha-estudiantil';

@Component({
  selector: 'app-reg-ficha',
  templateUrl: './reg-ficha.component.html',
  styleUrls: ['./reg-ficha.component.css']
})
export class RegFichaComponent implements OnInit {
 //para buscador
 public isloading = false;
 public src: string | undefined;
 public datae$: any = {
   dni: []
 }

 public data$: any = {
  dni: []
}


  //formGroup
  FichaForm: FormGroup;

  //arreglo de Docentes
  fichas: any = {
    user: []
  }

  estudiante: any = {
 
  }

  representante: any = {
 
  }

  //titulo
  Titulo = 'Registro de Ficha - Estudiantil';
  ide: string | null;
  idr: string | null;
  estado: string | null;

//Tipo_vivienda
Rol = [{ name: "propia" },{ name: "arriendo" },
{ name: "familiar" }, { name:"prestada"}];
elegido1: string = "";

//Convive
//Tipo_vivienda
Convive = [{ name: "Padres" },{ name: "Abuelos" },
{ name: "Tíos" }, { name:"Primos"}, {name:"Otros"}];
elegido4: string = "";

  //Tenencia_vivienda
  Tipo_vivienda = [{ name: "Propietario" },{ name: "Arrendatario" },
                  { name: "Allegado" }, { name:"Usufructuario"}];
  elegido3: string = "";


  //Nombramiento
  Buscar = [{ name: "N° identificación" },
  { name: "Apellidos" }, { name: "Nombres" }];
  elegido2: string = "";

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    //formGroup
    this.FichaForm = this.fb.group({
      Usuario: ['', Validators.required],
      Contraseña: ['', Validators.required],
      Rol: ['', Validators.required],
      Search: ['', Validators.required],
      Combo: ['', Validators.required],
      Searche: ['', Validators.required],
      Comboe: ['', Validators.required]
    }),

    //mapeo de url con atributo
    this.estado = "",
    this.ide = this.aRouter.snapshot.paramMap.get('id'),
    this.idr = this.aRouter.snapshot.paramMap.get('id')
    console.log("id estudiante: "+this.ide)
    console.log("id representante: "+this.idr)
  }

  ngOnInit(): void {
    this.ObtenerRepresentante();
    this.ObtenerEstudiante();
  }
  //editar para guardar usuario
  saveData() {

    const FICHA: Ficha = {
      Estudiante: this.ide,
      Representante: this.idr,
      Nombre_padre: this.FichaForm.get('Nombre_padre')?.value,
      Nombre_madre : this.FichaForm.get('Nombre_madre')?.value,
      Convive: this.FichaForm.get('Convive')?.value,
      Numero_hermanos: this.FichaForm.get('Numero_hermanos')?.value,
      Tipo_vivienda: this.FichaForm.get('Tipo_vivienda')?.value,
      Materia_vivienda: this.FichaForm.get('Material_vivienda')?.value,
      Servicios: this.FichaForm.get('Servicios')?.value,   
      Nombre_emergente: this.FichaForm.get('Nombre_emergente')?.value,
      Contacto_emergente: this.FichaForm.get('Contacto_emergente')?.value,
      Observacion: this.FichaForm.get('Observacion')?.value,
      Estado: this.FichaForm.get('Estado')?.value,

    }
    console.log(FICHA);
    this.authService.registerFicha(FICHA).subscribe(data => {
      this.AlertExito()
      
    }, err => {
      console.log(err);
      this.AlertFracaso();
    })


  }

  

  ///////////////////////////// busqueda dinámica Estudiante//////////////////////
  async searchEst() {
    const SCH: Buscador = {
      Search: this.FichaForm.get('Searche')?.value,
      Combo: this.FichaForm.get('Comboe')?.value,
    }
    console.log(SCH);

    if (SCH.Search) {
      if (SCH.Combo == "N° identificación" || SCH.Combo == "elegido2" || SCH.Combo == "" ) {
        this.searchDniEst();
      }
       if (SCH.Combo == "Nombres") {
        this.searchNombreEst();
      }
      if (SCH.Combo == "Apellidos") {
        this.searchApellidoEst();
      }

    } else {
      this.AlertCamposVacios();
    }


  }

  async searchApellidoEst() {
    const SCH: Buscador = {
      Search: this.FichaForm.get('Searche')?.value,
      Combo: this.FichaForm.get('Buscare')?.value,
    }

    if (SCH.Search) {
      const ObtenerApellidos = new Promise(async (resolve, reject) => {
        await this.authService.obtenerEstudianteApellido(SCH.Search).subscribe(data => {
          resolve(data)
        })
      });
      this.datae$ = await ObtenerApellidos.then(res => res);
     
      if(this.datae$.dni.length == 0){
        this.AlertNoEncotrado();
    }
    } 
  }

  async searchNombreEst() {
    const SCH: Buscador = {
      Search: this.FichaForm.get('Searche')?.value,
      Combo: this.FichaForm.get('Buscare')?.value,
    }

    if (SCH.Search) {
      const ObtenerNombres = new Promise(async (resolve, reject) => {
        await this.authService.obtenerEstudianteNombres(SCH.Search).subscribe(data => {
          resolve(data)
        })
      });
      this.datae$ = await ObtenerNombres.then(res => res);

      if(this.datae$.dni.length == 0){
        this.AlertNoEncotrado();
    }
    }

  }

  async searchDniEst() {
    const SCH: Buscador = {
      Search: this.FichaForm.get('Searche')?.value,
      Combo: this.FichaForm.get('Buscare')?.value,
    }

    if (SCH.Search) {
      const ObtenerDni = new Promise(async (resolve, reject) => {
        await this.authService.obtenerEstudianteDni(SCH.Search).subscribe(data => {
          resolve(data)
        })
      });
      this.datae$ = await ObtenerDni.then(res => res);
     
      if(this.datae$.dni.length == 0){
        this.AlertNoEncotrado();
    }
    }

  }
  // capturar id al buscar
  viewEst(id: any) {
  this.ide = id;
  console.log("id :"+this.ide)
  this.ObtenerEstudiante();
  }

  //metodo de editar
async ObtenerEstudiante() {
  if (this.ide !== null) {

    this.authService.obtenerEstudianteId(this.ide).subscribe(data => {
      
      if(data.Estado){
         this.estado = "habilitado";
        }else{ this.estado = "deshabilitado";}

        this.estudiante = {
          Codigo: data.Codigo,
          DNI: data.DNI,
          Apellidos:data.Apellidos,
          Nombres: data.Nombres,
          Fecha_nacimiento: data.Fecha_nacimiento,
          Direccion: data.Direccion,
          Estado: this.estado,
          Genero: data.Genero,
          Observacion: data.Observacion
        }
    })

  }
}



///////////////////////// busqueda dinámica Representante///////////////
async search() {
  const SCH: Buscador = {
    Search: this.FichaForm.get('Search')?.value,
    Combo: this.FichaForm.get('Combo')?.value,
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
    Search: this.FichaForm.get('Search')?.value,
    Combo: this.FichaForm.get('Buscar')?.value,
  }

  if (SCH.Search) {
    const ObtenerApellidos = new Promise(async (resolve, reject) => {
      await this.authService.obtenerRepresentanteApellido(SCH.Search).subscribe(data => {
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
    Search: this.FichaForm.get('Search')?.value,
    Combo: this.FichaForm.get('Buscar')?.value,
  }

  if (SCH.Search) {
    const ObtenerNombres = new Promise(async (resolve, reject) => {
      await this.authService.obtenerRepresentanteNombres(SCH.Search).subscribe(data => {
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
    Search: this.FichaForm.get('Search')?.value,
    Combo: this.FichaForm.get('Buscar')?.value,
  }

  if (SCH.Search) {
    const ObtenerDni = new Promise(async (resolve, reject) => {
      await this.authService.obtenerRepresentanteDni(SCH.Search).subscribe(data => {
        resolve(data)
      })
    });
    this.data$ = await ObtenerDni.then(res => res);
   
    if(this.data$.dni.length == 0){
      this.AlertNoEncotrado();
  }
  }

}
// capturar id al buscar
viewRep(id: any) {
this.idr = id;
console.log("id :"+this.idr)
this.ObtenerRepresentante();
}

//metodo de editar
async ObtenerRepresentante() {
  if (this.idr !== null) {

    this.authService.obtenerRepresentanteId(this.idr).subscribe(data => {
      
      if(data.Estado){
         this.estado = "habilitado";
        }else{ this.estado = "deshabilitado";}

        this.representante = {
          Parentesco: data.Parentesco,
          DNI: data.DNI,
          Nombres: data.Nombres,
          Apellidos: data.Apellidos,
          Fecha_nacimiento: data.Fecha_nacimiento,
          Direccion: data.Direccion,
          Estado_civil: data.Estado_civil,
          Profesion: data.Profesion,
          Email: data.Email,
          Telefono: data.Telefono,
          Celular: data.Celular,
          Estado: this.estado,
          Genero: data.Genero,
          Observacion: data.Observacion
        }
    })

  }
}


  ////////////// Alertas ///////////////////////////


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

  AlertAcceso(): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops no lograste acceder...',
      text: '¡Algo salió mal!',
      footer: '<p>Intenta nuevamente, ingresa los datos <b>correctos</b> </p>'
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
    this.FichaForm.reset();
  }



}
