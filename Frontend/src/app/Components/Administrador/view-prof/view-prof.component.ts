import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-view-prof',
  templateUrl: './view-prof.component.html',
  styleUrls: ['./view-prof.component.css']
})
export class ViewProfComponent implements OnInit {
 // Idioma
 idioma : string | null;

// traducido 
institucion = "Unidad Educativa Comunitaria Intercultural Bilingüe 'Benito Juárez'";
tfecha = "Fecha: ";
thora = "Hora: ";
tdatosdocente = "DATOS DE DOCENTE";
ttipodedni = "Tipo de identificación: "
tnumidentificacion = "Número de identificación: ";
tnombre = "Nombre: ";
tgenero = "Género: ";
testado_civil = "Estado civil: ";
tfecha_naci = "Fecha de nacimiento: ";
tLugar_naci = "Lugar de nacimiento: ";
tnacionalidad = "Nacionalidad: ";
tetnia = "Etnia: ";
//-------------------------------------------------
tdescriptionprof = "ESPECIFICACIÓN PROFESIONAL";
tnivel_edu = "Nivel de educación: ";
tnombre_inst = "Nombre de la institución: ";
tlugar_inst = "Lugar de la institución: ";
ttipo_inst = "Tipo de institución: ";
ttitulo_prof = "Titulo profesional: ";
//tnota_grado = "Nota de graduación: ";
tfecha_grado = "Fecha de graduación: ";
tfecha_mag = "Ingreso al magisterio: ";
tfecha_inst = "Ingreso a la institución: ";
tcondicion_lab = "Condición laboral: ";
//--------------------------------------------
tcont_ubi = "DATOS DE CONTACTO Y UBICACIÓN"
tlugar_res = "Lugar de residencia: ";
tdireccion = "Dirección: ";
tref_dom = "Referencia de domicilio: ";
ttelf = "Teléfono: ";
tcel = "Celular: ";
temail = "Correo electrónico: ";
tnom_emerg = "Nombre de contacto emergente: ";
tnum_emerg = "Número de contacto emergente: ";

//-----------------------------------------------
tinfo_salud = "INFORMACIÓN DE SALUD";
tgrupo_sang = "Grupo sanguineo: ";
ttipo_disc = "Tipo de discapacidad: ";
tporcen = "Porcentaje de discapacidad: ";
tcarnet = "Carnet de discapacidad: ";
tob_med = "Observación medica: ";

//----------------------------------------------
tinfo_us = "INFORMACIÓN DE USUARIO";
tusuario = "Usuario";
tperfil = "Estado de perfil: ";
tobservacion = "Observaciones adicionales: ";

tespecialidad = "Especialidad: ";
 
  //Objeto
  profesor: any = {
 
  }
  //id
  id: string | null;
  Hora:Date | null;
  estado: string | null;

  nombre : string | null;
  usuario: string | null;



  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    
    this.id = this.aRouter.snapshot.paramMap.get('id'),
    this.Hora = new Date(),
    this.estado = "",
    this.nombre = '';
    this.usuario = '';
    this.idioma = "Español";
  }

  
  ngOnInit(): void {
    this.esEditar();
    this.loginData();
  }


  //Obtener datos para Editar
 async esEditar() {
    if (this.id !== null) {

      this.authService.obtenerPorfesorId(this.id).subscribe(data => {
        
        if(data.Estado){
           this.estado = "Activo";
          }else{ this.estado = "Suspendido";}

        this.profesor = {
          Tipo_documento: data.Tipo_documento,
          DNI: data.DNI,
          Nombres: data.Nombres +" "+ data.Apellidos,
          Genero: data.Genero,
          Estado_civil : data.Estado_civil,
          Fecha_nacimiento: data.Fecha_nacimiento,
          Lugar_nacimiento: data.Lugar_nacimiento,
          Etnia : data.Etnia,
          Nacionalidad : data.Nacionalidad,
          Grupo_sanguineo: data.Grupo_sanguineo,
          Tipo_discapacidad: data.Tipo_discapacidad,
          Carnet_discapacidad: data.Carnet_discapacidad,
          Porcentaje_discapacidad: data.Porcentaje_discapacidad,
          Observacion_medica: data.Observacion_medica,
          Nivel_educacion: data.Nivel_educacion,
          Institucion: data.Institucion,
          Lugar_institucion: data.Lugar_institucion,
          Tipo_institucion: data.Tipo_institucion,
          Especialidad: data.Especialidad,
          Nota_grado: data.Nota_grado,
          Fecha_grado: data.Fecha_grado,
          Fecha_ingreso_magisterio: data.Fecha_ingreso_magisterio,
          Fecha_ingreso_institucion: data.Fecha_ingreso_institucion,
          servicio: data.Años_servicio,
          Condicion_laboral: data.Condicion_laboral,
          Direccion: data.Direccion,
          Sector_domicilio: data.Sector_domicilio,
          Referencia_domicilio: data.Referencia_domicilio,
          Nombre_emergente: data.Nombre_emergente,
          Contacto_emergente: data.Contacto_emergente,
          Email: data.Email,
          Telefono: data.Telefono,
          Celular: data.Celular,
          Estado: this.estado,
          Observacion: data.Observacion
        }
      })

    }
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
  this.institucion = "Ishkay Shimipi Ayllucunapak Yachana Wasi 'Benito Juárez'";
  this.tfecha = "Punllacuna: ";
  this.thora = "Pacha: ";
  this.tdatosdocente = "YACHACHICPAK SHUTICUNA: ";
  this.ttipodedni = "Imashna ricsina: "
  this.tnumidentificacion = "Paypak yapaycuna: ";
  this.tnombre = "Shuti: ";
  this.tgenero = "Warmichu: ";
  this.testado_civil = "Sawarisncachu: ";
  this.tfecha_naci = "Paipa wacharirca: ";
  this.tLugar_naci = "Maipita wacharirca: ";
  this.tnacionalidad = "Ima markapi: ";
  this.tetnia = "Ima runata can: ";
  //-------------------------------------------------
  this.tdescriptionprof = "PAIPA YACHAJUSHCARUNA";
  this.tnivel_edu = "Ima nikaiman yachashka: ";
  this.tnombre_inst = "Yachana wasipa shuti: ";
  this.tlugar_inst = "Maipita yachana wasik: ";
  this.ttipo_inst = "Imashnata yachanawasipa: ";
  this.ttitulo_prof = "Ima yachascata charin: ";
  //this.tnota_grado = "Nota de graduación: ";
  this.tfecha_grado = "Ima punllapi yachanata: ";
  this.tfecha_mag = "yachachingapak yaicushco: ";
  this.tfecha_inst = "yachajungapak yaicushco: ";
  this.tcondicion_lab = "Imashnata llancajun: ";
//--------------------------------------------
  this.tcont_ubi = "MAIPI CAWSAJUN"
  this.tlugar_res = "Maipita kawsan: ";
  this.tdireccion = "Manja nambita kawsan: ";
  this.tref_dom = "Imashnata wasita: ";
  this.ttelf = "Williwill: ";
  this.tcel = "Williwill: ";
  this.temail = "Ñawi fanga: ";
  this.tnom_emerg = "Piman ñapash cayana: ";
  this.tnum_emerg = "ima yupaiman ñapish cayana: ";

  //-----------------------------------------------
  this.tinfo_salud = "PAIPAC AICHAPI IMASHNATA";
  this.tgrupo_sang = "Ima tandanajuipita yawar: ";
  this.ttipo_disc = "Ima unguita charin: ";
  this.tporcen = "Ima camanda uninguika: ";
  this.tcarnet = "Paipa unguita riksina: ";
  this.tob_med = "Paipac unguita ricujunllu: ";
  
  //----------------------------------------------
  this.tinfo_us = "PAIPAK YACHANACUNA";
  this.tusuario = "Chasquijuc";
  this.tperfil = "Paika alichu: ";
  this.tobservacion = "Ashtawan yachana: ";

  this.tespecialidad = "Paypa yachashka: "


}

Castellano(){
  //traducido 
  this.idioma = "Español";
  this.institucion = "Unidad Educativa Comunitaria Intercultural Bilingüe 'Benito Juárez'";
  this.tfecha = "Fecha: ";
  this.thora = "Hora: ";
  this.tdatosdocente = "DATOS DE DOCENTE";
  this.ttipodedni = "Tipo de identificación: "
  this.tnumidentificacion = "Número de identificación: ";
  this.tnombre = "Nombre: ";
  this.tgenero = "Género: ";
  this.testado_civil = "Estado civil: ";
  this.tfecha_naci = "Fecha de nacimiento: ";
  this.tLugar_naci = "Lugar de nacimiento: ";
  this.tnacionalidad = "Nacionalidad: ";
  this.tetnia = "Etnia: ";
  //-------------------------------------------------
  this.tdescriptionprof = "ESPECIFICACIÓN PROFESIONAL";
  this.tnivel_edu = "Nivel de educación: ";
  this.tnombre_inst = "Nombre de la institución: ";
  this.tlugar_inst = "Lugar de la institución: ";
  this.ttipo_inst = "Tipo de institución: ";
  this.ttitulo_prof = "Titulo profesional: ";
 // this.tnota_grado = "Nota de graduación: ";
  this.tfecha_grado = "Fecha de graduación: ";
  this.tfecha_mag = "Ingreso al magisterio: ";
  this.tfecha_inst = "Ingreso a la institución: ";
  this.tcondicion_lab = "Condición laboral: ";
//--------------------------------------------
  this.tcont_ubi = "DATOS DE CONTACTO Y UBICACIÓN"
  this.tlugar_res = "Lugar de residencia: ";
  this.tdireccion = "Dirección: ";
  this.tref_dom = "Referencia de domicilio: ";
  this.ttelf = "Teléfono: ";
  this.tcel = "Celular: ";
  this.temail = "Correo electrónico: ";
  this.tnom_emerg = "Nombre de contacto emergente: ";
  this.tnum_emerg = "Número de contacto emergente: ";

  //-----------------------------------------------
  this.tinfo_salud = "INFORMACIÓN DE SALUD";
  this.tgrupo_sang = "Grupo sanguineo: ";
  this.ttipo_disc = "Tipo de discapacidad: ";
  this.tporcen = "Porcentaje de discapacidad: ";
  this.tcarnet = "Carnet de discapacidad: ";
  this.tob_med = "Observación medica: ";
  
  //----------------------------------------------
  this.tinfo_us = "INFORMACIÓN DE USUARIO";
  this.tusuario = "Usuario";
  this.tperfil = "Estado de perfil: ";
  this.tobservacion = "Observaciones adicionales: ";

  this.tespecialidad = "Especialidad: ";
}

}
