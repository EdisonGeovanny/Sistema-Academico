import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Buscador } from 'src/app/models/buscador';

@Component({
  selector: 'app-reg-ficha',
  templateUrl: './reg-ficha.component.html',
  styleUrls: ['./reg-ficha.component.css']
})
export class RegFichaComponent implements OnInit {
 
//titulo
Titulo = 'FICHA ESTUDIANTIL: REGISTRO DE INFORMACIÓN';
subnivel = 'REGISTRO DE DATOS';
id: string | null;

 public src: string | undefined;
 public datae$: any = {
   dni: []
 }

 public data$: any = {
  dni: []
}

//objetos para agregar hermanos
  hermanos: any = { dato: [] }
  institucion: any = { dato: [] }
  i: any = []
  i2: any = []

  //objetos para agregar servicios
  servicios: any = { dato: [] }
 
  //formGroup
  FichaForm: FormGroup;

  //arreglo de Ficha
  ficha: any = {
    user: []
  }

  estudiante: any = {
 
  }

  representante: any = {
 
  }
  edit: any =  {

  }

  //variables de ides y estado
  ide: any | null;
  idr: any | null;
  estado: string | null;

//Material_vivienda
Material_vivienda = [{ name: "Seleccionar opción" },{ name: "Bloque" },{ name: "Ladrillo" },
{ name: "Madera" }, { name:"Mixto"}];
elegido1: string = "";

  //Tenencia_vivienda
  Tipo_vivienda = [{ name: "Seleccionar opción" },{ name: "Propietario" },{ name: "Arrendatario" },
                  { name: "Allegado" }, { name:"Usufructuario"}];
  elegido3: string = "";


  //Nombramiento
  Buscar = [{ name: "N° identificación" },
  { name: "Apellidos" }, { name: "Nombres" }];
  elegido2: string = "";


  nombre : string | null;
  usuario: string | null;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    //formGroup
    this.FichaForm = this.fb.group({
      //busquedas representante
      Search: [''],
      Combo: [''],

      //busqueda estudiante
      Searche: [''],
      Comboe: [''],
     
      // array hermanos 
      Nombre: [''],
      Edad: [''],
      Puesto: [''],

      //check servicios básicos
      agua: [''],
      luz: [''],
      telefono: [''],
      tv: [''],
      internet: [''],
      alcantarillado: [''],

      //Datos de almacenamiento
      Nombre_padre: ['', Validators.required],
      Nombre_madre : ['', Validators.required],
      Convive: ['', Validators.required],
      Numero_hermanos: ['', Validators.required],
      Numero_en_institucion:['', Validators.required],
      Tipo_vivienda: ['', Validators.required],
      Material_vivienda: ['', Validators.required],
      Propiedades: ['', Validators.required],   
      Nombre_emergente: ['', Validators.required],
      Contacto_emergente: ['', Validators.required],
      Observacion: ['', Validators.required],

    }),

    //mapeo de url con atributo
    this.estado = "",
    this.id = this.aRouter.snapshot.paramMap.get('id'),
    this.ide = null,
    this.idr = null,
    this.nombre = null;
    this.usuario = null;
  }

  ngOnInit(): void {
    this.ObtenerRepresentante();
    this.ObtenerEstudiante();
    this.esEditar();
    this.loginData();
  }



  //editar para guardar usuario
//agregar datos o actualizar datos
saveData(){
  if (this.id !== null) {
    this.upDate();
  }else{
    this.create();
  }
 }


  create() {
    const SERVICIOS: any = {
      agua: this.FichaForm.get('agua')?.value,
      luz: this.FichaForm.get('luz')?.value,
      telefono: this.FichaForm.get('telefono')?.value,
      tv: this.FichaForm.get('tv')?.value,
      internet: this.FichaForm.get('internet')?.value,
      alcantarillado: this.FichaForm.get('alcantarillado')?.value,
    }
    this.servicios.dato.push({
      agua: SERVICIOS.agua,
      luz: SERVICIOS.luz,
      telefono: SERVICIOS.telefono,
      tv: SERVICIOS.tv,
      internet: SERVICIOS.internet,
      alcantarillado: SERVICIOS.alcantarillado
    });


    const FICHA: any = {
      Estudiante: this.ide,
      Representante: this.idr,
      Nombre_padre: this.FichaForm.get('Nombre_padre')?.value,
      Nombre_madre : this.FichaForm.get('Nombre_madre')?.value,
      Convive: this.FichaForm.get('Convive')?.value,
      Numero_hermanos: this.FichaForm.get('Numero_hermanos')?.value,
      Nombre_hermanos: this.hermanos.dato,
      Numero_en_institucion:this.FichaForm.get('Numero_en_institucion')?.value,
      En_institucion: this.institucion.dato,
      Tipo_vivienda: this.FichaForm.get('Tipo_vivienda')?.value,
      Material_vivienda: this.FichaForm.get('Material_vivienda')?.value,
      Servicios_basicos: this.servicios.dato,   
      Propiedades: this.FichaForm.get('Propiedades')?.value,   
      Nombre_emergente: this.FichaForm.get('Nombre_emergente')?.value,
      Contacto_emergente: this.FichaForm.get('Contacto_emergente')?.value,
      Observacion: this.FichaForm.get('Observacion')?.value

    }

    console.log(FICHA);
    this.authService.registerFicha(FICHA).subscribe(data => {
      this.AlertExito()
      
    }, err => {
      console.log(err);
      this.AlertFracaso();
    })


  }


  //Obtener datos para Editar
  esEditar() {
    if (this.id !== null) {
      this.Titulo = 'FICHA - ESTUDIANTE: ACTUALIZACIÓN DE INFORMACIÓN';
      this.subnivel = 'EDITOR DE DATOS';

      this.authService.obtenerFichaId(this.id).subscribe(data => {  
       const Ficha : any = {
         Estudiante: data.Estudiante[0],
         Representante : data.Representante[0],
         Hermanos:data.Nombre_hermanos,
         En_institucion: data.En_institucion,
         Numero_hermanos: data.Numero_hermanos,
         Servicios_basicos: data.Servicios_basicos
       }
      

       this.ide = Ficha.Estudiante;
       this.idr = Ficha.Representante;
       this.hermanos.dato = Ficha.Hermanos;
       this.institucion.dato = Ficha.En_institucion;

       Ficha.Hermanos.forEach((element: any, index: any, array: any)=>{
        this.i.push(element.nombre);
        console.log(element)
       });

       Ficha.En_institucion.forEach((element: any, index: any, array: any)=>{
        this.i2.push(element.nombre);
       });

       console.log(this.i);
       console.log(this.i2);

       this.ObtenerEstudiante();
       this.ObtenerRepresentante();

       this.FichaForm.controls['Nombre_madre'].setValue(data.Nombre_madre);
       this.FichaForm.controls['Nombre_padre'].setValue(data.Nombre_padre);
       this.FichaForm.controls['Convive'].setValue(data.Convive);
       this.FichaForm.controls['Numero_hermanos'].setValue(data.Numero_hermanos);
       this.FichaForm.controls['Numero_en_institucion'].setValue(data.Numero_en_institucion);
       this.FichaForm.controls['Tipo_vivienda'].setValue(data.Tipo_vivienda);
       this.FichaForm.controls['Material_vivienda'].setValue(data.Material_vivienda);
       this.FichaForm.controls['Propiedades'].setValue(data.Propiedades);
       this.FichaForm.controls['Nombre_emergente'].setValue(data.Nombre_emergente);
       this.FichaForm.controls['Contacto_emergente'].setValue(data.Contacto_emergente);
       this.FichaForm.controls['Observacion'].setValue(data.Observacion);
       this.FichaForm.controls['agua'].setValue(Ficha.Servicios_basicos[0].agua);
       this.FichaForm.controls['luz'].setValue(Ficha.Servicios_basicos[0].luz);
       this.FichaForm.controls['telefono'].setValue(Ficha.Servicios_basicos[0].telefono);
       this.FichaForm.controls['tv'].setValue(Ficha.Servicios_basicos[0].tv);
       this.FichaForm.controls['internet'].setValue(Ficha.Servicios_basicos[0].internet);
       this.FichaForm.controls['alcantarillado'].setValue(Ficha.Servicios_basicos[0].alcantarillado);
       
     
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
      text: "¡Se modificará el registro con la infomación actual!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.id !== null) {
          const SERVICIOS: any = {
            agua: this.FichaForm.get('agua')?.value,
            luz: this.FichaForm.get('luz')?.value,
            telefono: this.FichaForm.get('telefono')?.value,
            tv: this.FichaForm.get('tv')?.value,
            internet: this.FichaForm.get('internet')?.value,
            alcantarillado: this.FichaForm.get('alcantarillado')?.value,
          }


          this.servicios.dato.push({
            agua: SERVICIOS.agua,
            luz: SERVICIOS.luz,
            telefono: SERVICIOS.telefono,
            tv: SERVICIOS.tv,
            internet: SERVICIOS.internet,
            alcantarillado: SERVICIOS.alcantarillado
          });
      
      
      
      
          console.log(SERVICIOS);
      
          const FICHA: any = {
            Estudiante: this.ide,
            Representante: this.idr,
            Nombre_padre: this.FichaForm.get('Nombre_padre')?.value,
            Nombre_madre : this.FichaForm.get('Nombre_madre')?.value,
            Convive: this.FichaForm.get('Convive')?.value,
            Numero_hermanos: this.FichaForm.get('Numero_hermanos')?.value,
            Nombre_hermanos: this.hermanos.dato,
            Numero_en_institucion:this.FichaForm.get('Numero_en_institucion')?.value,
            En_institucion: this.institucion.dato,
            Tipo_vivienda: this.FichaForm.get('Tipo_vivienda')?.value,
            Material_vivienda: this.FichaForm.get('Material_vivienda')?.value,
            Servicios_basicos: this.servicios.dato,   
            Propiedades: this.FichaForm.get('Propiedades')?.value,   
            Nombre_emergente: this.FichaForm.get('Nombre_emergente')?.value,
            Contacto_emergente: this.FichaForm.get('Contacto_emergente')?.value,
            Observacion: this.FichaForm.get('Observacion')?.value
      
          }


   
          console.log(FICHA);
          this.authService.updateFicha(this.id,FICHA).subscribe(data => {
            this.esEditar();
            this.AlertExito2();
          }, err => {
            console.log(err);
            this.AlertFracaso();
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


  /////////////////////////////////////////ARRAY//////////////////////////////////////////
  
  agregar() {

    const HERMANO: any = {
      Nombre: this.FichaForm.get('Nombre')?.value,
      Edad: this.FichaForm.get('Edad')?.value,
      Puesto: this.FichaForm.get('Puesto')?.value
    }


    this.hermanos.dato.push({
      nombre: HERMANO.Nombre,
      edad: HERMANO.Edad,
      puesto: HERMANO.Puesto
    });


    this.i.push(HERMANO.Nombre)

  }


  borrar(nombre: any) {
  
    this.i.forEach((element: any, index:any, array:any) => {
      if(nombre == element){
        this.hermanos.dato.splice(index, 1);
        this.i.splice(index, 1);

        console.log(this.hermanos)
        console.log(this.i)
      }
    });


  }


  //limpiar array
  limpiar() {
    this.hermanos.dato.splice(0, this.hermanos.dato.length)
    this.i.splice(0, this.hermanos.dato.length)
    console.log(this.hermanos);
    console.log(this.i);

  }

  enviar(nombre:any){

    this.i.forEach((element: any, index:any, array:any) => {
      if(nombre == element){
        console.log(this.hermanos.dato[index])
        this.institucion.dato.push(this.hermanos.dato[index])
        this.i2.push(element)
        console.log(this.institucion)
      }
    });


  }

  borrar2(nombre: any) {
   
      this.i2.forEach((element: any, index:any, array:any) => {
        this
        if(nombre == element){
          this.institucion.dato.splice(index, 1);
          this.i2.splice(index, 1);
  
          console.log(this.institucion)
          console.log(this.i2)
        }
      });
  
    }

    limpiar2() {
      this.institucion.dato.splice(0, this.institucion.dato.length)
      this.i2.splice(0, this.institucion.dato.length)
      console.log(this.institucion);
      console.log(this.i2);
  
    }


  

  ///////////////////////////// busqueda dinámica Estudiante/////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////// busqueda dinámica Representante/////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////// Alertas ////////////////////////////////////////


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
  
  

  ////////////////////////Redirecciones ////////////////////

  RedirectCancel(): void {
    this.FichaForm.reset();
    this.router.navigateByUrl('/admin/reg-ficha');
    this.id=null;
    this.ide = null;
    this.idr = null;
    this.i = null;
    this.i2 = null;
  }



}
