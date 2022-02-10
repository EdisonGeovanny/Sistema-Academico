import { Component, OnInit } from '@angular/core';
//import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';


@Component({
  selector: 'app-view-ficha',
  templateUrl: './view-ficha.component.html',
  styleUrls: ['./view-ficha.component.css']
})

export class ViewFichaComponent implements OnInit {
  
//idioma 
idioma: string | null;

//traducido 
tinstitucion = "Unidad Educativa Comunitaria Intercultural Bilingüe 'Benito Juárez'";
tfecha = "Fecha: ";
thora = "Hora: ";

 //estudiante
 tdatosest = "DATOS DE ESTUDIANTE";
 tcodigo = "Código electrónico: ";
 tnumidentificacion = "Número de identificación: ";
 tfecha_naci = "Fecha de nacimiento: ";
 tnombre = "Nombre: ";

 //representante
 tdatosrep = "DATOS DE REPRESENTANTE";
 tparentesco = "Parentesco con el alumno: ";

 //matricula
 tinfo_fam = "DATOS DE GRUPO FAMILIAR";
 tnombre_pa = "Nombre de padre: ";
 tnombre_ma = "Nombre de madre: ";
 tconvive = "Convive con: ";
 thermanos = "Hermanos de grupo familiar: ";
 thermanos_ins= "Hermanos en la institución: ";
 tedad = "Edad";
 tpuesto = "Puesto"; 

 tinfo_casa = "INFORMACIÓN DE VIVIENDA";
 ttipo_casa = "Tipo de vivienda: ";
 tmaterial_casa = "Material de vivienda: ";
 tservicios = "Servicios básicos: ";
 
 tindo_otros = "OTROS DATOS";
 temer_nombre = "En caso de emergencia, Nombre: ";
 temer_contacto = "es caso de emergencia, Contacto: ";
 tobservacion = "Observaciones adicionales: "


  hermanos: any = { dato: [] }
  institucion: any = { dato: [] }
  servicios: any = { dato: [] }
  
  //Objeto
  ficha: any = {

  }
  //Objeto
  estudiante: any = {

  }
  //Objeto
  representante: any = {

  }
  //datos de Representate
  idRepsentante: string | null;
  idEstudiante: string | null;

  nombre: string | null;
  usuario: string | null;
  //id
  id: string | null;
  Hora: Date | null;
  estado: string | null;
 //formGroup
 FichaForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
      this.FichaForm = this.fb.group({
        //check servicios básicos
        agua: ['', Validators.required],
        luz: ['', Validators.required],
        telefono: ['', Validators.required],
        tv: ['', Validators.required],
        internet: ['', Validators.required],
        alcantarillado: ['', Validators.required],
        otros: ['', Validators.required]
      }),
    
    this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.nombre = null;
    this.usuario = null;
    this.Hora = new Date(),
      this.estado = null;
    this.idEstudiante = null;
    this.idRepsentante = null;
    this.idioma = "Español";
  }

  ngOnInit(): void {
    this.loginData();
    this.obtenerFichaId();
  }

desactivar(): boolean {
  return true;
}

  obtenerFichaId() {
    if (this.id !== null) {
      this.authService.obtenerFichaId(this.id).subscribe(data => {
        console.log(data)
        const idRepresentante = data.Representante[0];
        this.obtenerRepresentateId(idRepresentante);
        const idEstudiante = data.Estudiante[0];
        this.obtenerEstudianteId(idEstudiante);

        this.ficha = {
          _id: data._id,
          Nombre_madre: data.Nombre_madre,
          Nombre_padre: data.Nombre_padre,
          Convive: data.Convive,
          Numero_hermanos: data.Numero_hermanos,
          Numero_en_institucion: data.Numero_en_institucion,
          Tipo_vivienda: data.Tipo_vivienda,
          Material_vivienda: data.Material_vivienda,
          Propiedades: data.Propiedades,
          Nombre_emergente: data.Nombre_emergente,
          Contacto_emergente: data.Contacto_emergente,
          Observacion: data.Observacion
        }

        this.hermanos.dato = data.Nombre_hermanos;
        this.institucion.dato = data.En_institucion;

         if(data.Servicios_basicos[0].luz == true){
          this.servicios.dato.push({name: 'luz'})
         }
         if(data.Servicios_basicos[0].agua == true){
          this.servicios.dato.push({name: 'agua'})
         }
         if(data.Servicios_basicos[0].alcantarillado == true){
          this.servicios.dato.push({name: 'alcantarillado'})
         }
         if(data.Servicios_basicos[0].internet == true){
          this.servicios.dato.push({name: 'internet'})
         }
         if(data.Servicios_basicos[0].tv == true){
          this.servicios.
          dato.push({name: 'tv por cable'})
         }
         if(data.Servicios_basicos[0].telefono == true){
          this.servicios.dato.push({name: 'teléfono'})
         }

         console.log(this.servicios.dato)

      });
    }
  }

  obtenerEstudianteId(idEstudiante: any) {
    if (idEstudiante !== null) {
      this.authService.obtenerEstudianteId(idEstudiante).subscribe(data => {
        this.estudiante = {
          id: data._id,
          Codigo: data.Codigo,
          DNI: data.DNI,
          Nombre: data.Apellidos + " " + data.Nombres,
          Fecha_nacimiento: data.Fecha_nacimiento
        }
      });
    }
  }

  obtenerRepresentateId(idRepsentante: any) {
    if (idRepsentante !== null) {
      this.authService.obtenerRepresentanteId(idRepsentante).subscribe(data => {
        this.representante = {
          id: data._id,
          Parentesco: data.Parentesco,
          DNI: data.DNI,
          Nombre: data.Apellidos + " " + data.Nombres,
          Fecha_nacimiento: data.Fecha_nacimiento
        }

      });
    }
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

  viewEst(id: any) {
    this.router.navigateByUrl('/admin/view-est/' + id);
  }
  viewRep(id: any) {
    this.router.navigateByUrl('/admin/view-rep/' + id);
  }

   //imprimir
Print(){
  if(this.idioma == "Español"){
    printJS({
      printable:'PrintForm1',
      type: 'html',
      targetStyles: ['*'],
      ignoreElements:['ignore'],
      header: '<h2>Unidad Educativa Comunitaria Intercultural Bilingüe "Benito Juárez"</h2>'
    })
  }
  if(this.idioma == "Kichwa"){
    printJS({
      printable:'PrintForm1',
      type: 'html',
      targetStyles: ['*'],
      ignoreElements:['ignore'],
      header: '<h2>Ishkay Shimipi Ayllucunapak Yachana Wasi "Benito Juárez"</h2>'
    })
  }

}

  Kichwa(){
    this.idioma = "Kichwa";

    //titulo
    this.tinstitucion = "Ishkay Shimipi Ayllucunapak Yachana Wasi 'Benito Juárez'";
    this.tfecha = "Punllacuna: ";
    this.thora = "Pacha: ";

   //estudiante
    this.tdatosest = "YACHACHICPAK SHUTICUNA";
    this.tcodigo = "Paipaclla yupairuna: ";
    this.tnumidentificacion = "Paypak yapaycuna: ";
    this.tfecha_naci = "Wacharishca punlla: ";
    this.tnombre = "Shuti: ";

    //representante
    this.tdatosrep = "TAYTAPA SHUTICUNA ";
    this.tparentesco = "Maijambacta aillupura: ";
    this.tfecha_naci = "Wacharishca punlla: ";


    //matricula
    this.tinfo_fam = "AILLUCUNAPA SHUTICUNA";
    this.tnombre_pa = "Taitapa shuti: ";
    this.tnombre_ma = "Mamapa shuti: ";
    this.tconvive = "Piwandac kausan: ";
    this.thermanos = "Wawkicunapa aillucuna";
    this.thermanos_ins= "Yachana ucupi wawkicuna";
    this.tedad = "mashnawatata";
    this.tpuesto = "Kusca"; 

 
    this.tinfo_casa = "IMASHNA WASITACAN";
    this.ttipo_casa = "Imashnata wasi: ";
    this.tmaterial_casa = "Imaguanda shinashca paipawasi: ";
    this.tservicios = "Tucui mutourishcotachu charin: ";

    this.tindo_otros = "SHUK YACHANACUNA";
    this.temer_nombre = "Amashpapash: ";
    this.temer_contacto = "Cayana: ";
    this.tobservacion = "Ashtawan yachana: "


  }
  
  Castellano(){
    this.idioma = "Español";
    //traducido 
    this.tinstitucion = "Unidad Educativa Comunitaria Intercultural Bilingüe 'Benito Juárez'";
    this.tfecha = "Fecha: ";
    this.thora = "Hora: ";

     //estudiante
     this.tdatosest = "DATOS DE ESTUDIANTE";
     this.tcodigo = "Código electrónico: ";
     this.tnumidentificacion = "Número de identificación: ";
     this.tfecha_naci = "Fecha de nacimiento: ";
     this.tnombre = "Nombre: ";
 
     //representante
     this.tdatosrep = "DATOS DE REPRESENTANTE";
     this.tparentesco = "Parentesco con el alumno: ";
     this.tfecha_naci = "Fecha de nacimiento: ";
 
 
     //matricula
     this.tinfo_fam = "DATOS DE GRUPO FAMILIAR";
     this.tnombre_pa = "Nombre de padre: ";
     this.tnombre_ma = "Nombre de madre: ";
     this.tconvive = "Convive con: ";
     this.thermanos = "Hermanos de grupo familiar: ";
     this.thermanos_ins= "Hermanos en la institución: ";
     this.tedad = "Edad";
     this.tpuesto = "Puesto"; 

     this.tinfo_casa = "INFORMACIÓN DE VIVIENDA";
     this.ttipo_casa = "Tipo de vivienda: ";
     this.tmaterial_casa = "Material de vivienda: ";
     this.tservicios = "Servicios básicos: ";
 
     this.tindo_otros = "OTROS DATOS";
     this.temer_nombre = "En caso de emergencia, Nombre: ";
     this.temer_contacto = "es caso de emergencia, Contacto: ";
     this.tobservacion = "Observaciones adicionales: "
   
  }

}




