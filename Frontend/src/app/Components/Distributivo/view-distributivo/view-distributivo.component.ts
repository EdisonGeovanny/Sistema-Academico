import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-view-distributivo',
  templateUrl: './view-distributivo.component.html',
  styleUrls: ['./view-distributivo.component.css']
})
export class ViewDistributivoComponent implements OnInit {
  

  //idioma 
  idioma: string | null;

  //traducido 
  tinstitucion = "Unidad Educativa Comunitaria Intercultural Bilingüe 'Benito Juárez'";
  tfecha = "Fecha: ";
  thora = "Hora: ";
  
   //estudiante
   tdatosest = "DATOS DE DOCENTE";
   ttitulo_prof = "Especialidad: ";
   tnumidentificacion = "Número de identificación: ";
   tfecha_naci = "Fecha de nacimiento: ";
   tnombre = "Nombre: ";
  
   //Matricula
   tinfo_matricula = "MATRICULADO EN";
   toeriodo = "Periodo Lectivo: ";
   tjornada = "Jornada: ";
   tnivel = "Nivel: ";
   tparalelo = "Paralelo: ";
   tasig = "ASIGNATURA: ";
   tarea = "ÁREA: ";
  tmaterias = "MATERIAS ASIGNADAS: "
  tinicio= "Inicio";
  tfin =" Fin";
  tdia = "Día";
  tsubtitulo = "LISTA DE ESTUDIANTES";

  nombre: string | null;
  usuario: string | null;

  materias: any = { dato: [] }
  Horario: any = { dato: [] }

  //Objeto
  docente: any = {

  }

  //id
  id: string | null;
  Hora: Date | null;
  estado: string | null;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.nombre = null,
      this.usuario = null,
      this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.Hora = new Date(),
      this.estado = "",
      this.idioma = "Español"
  }

  ngOnInit(): void {
    this.loginData();
    this.esEditar();
  }

  //Obtener datos para Editar
  async esEditar() {
    if (this.id !== null) {

      this.authService.obtenerDistributivoId(this.id).subscribe(data => {

        this.authService.obtenerProfId(data.Docente[0]).subscribe(data => {
          this.docente = {
            id: data.dni._id,
            Nombre: data.dni.Apellidos + " " + data.dni.Nombres,
            DNI: data.dni.DNI,
            Celular: data.dni.Celular,
            Telefono: data.dni.Telefono,
            Email: data.dni.Email,
            Especialidad: data.dni.Especialidad
          }
        });

        this.authService.obtenerDistributivoxDocentePeriodo(data.Docente[0] + "," + data.Periodo).subscribe(data => {
          this.materias.dato = data;
       

          this.materias.dato.forEach((element: any, index: any, array: any) => {
            this.materias.dato[index].Horario.forEach((item: any, index: any, array: any) => {

              this.Horario.dato.push({
                id: element._id,
                Periodo: element.Periodo,
                Jornada: element.Jornada,
                Nivel: element.Nivel,
                Paralelo: element.Paralelo,
                Area: element.Area,
                Asignatura: element.Asignatura,
                Dia: item.Dia,
                Inicio: item.Hora_inicio,
                Fin: item.Hora_fin
              });

            });
          });

        });

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


  viewDoc(id: any) {
    this.router.navigateByUrl('/admin/view-prof/' + id);
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
    this.ttitulo_prof = "Ima yachascata charin: ";
    this.tnumidentificacion = "Paypak yapaycuna: ";
    this.tfecha_naci = "Wacharishca punlla: ";
    this.tnombre = "Shuti: ";

    //Matricula
    this.tinfo_matricula = "MAIPI KILLCARISHKA";
    this.toeriodo = "Ima watacunapi: ";
    this.tjornada = "Ima pachapi: ";
    this.tnivel = "Ima niki: ";
    this.tparalelo = "Ima tandanajuipi: ";
    this.tasig = "IMA YACHAIPI";
    this.tarea = "Ima UCU";
   this.tmaterias = "IMA YACHASHKATA CHASQUICHISHKA: "
   this.tinicio= "Callari";
   this.tfin ="Tucuchik";
   this.tdia = "Punlla";
    this.tsubtitulo = "RIKCHAQ SINRI";



  }
  
  Castellano(){
    this.idioma = "Español";
    //traducido 
    this.tinstitucion = "Unidad Educativa Comunitaria Intercultural Bilingüe 'Benito Juárez'";
    this.tfecha = "Fecha: ";
    this.thora = "Hora: ";

     //estudiante
     this.tdatosest = "DATOS DE DOCENTE";
     this.ttitulo_prof = "Ima yachascata charin: ";
     this.tnumidentificacion = "Número de identificación: ";
     this.tfecha_naci = "Fecha de nacimiento: ";
     this.tnombre = "Nombre: ";
 
     //Matricula
     this.tinfo_matricula = "MATRICULADO EN";
     this.toeriodo = "Periodo Lectivo: ";
     this.tjornada = "Jornada: ";
     this.tnivel = "Nivel: ";
     this.tparalelo = "Paralelo: ";
     this.tasig = "ASIGNATURA: ";
     this.tarea = "ÁREA: ";
    this.tmaterias = "MATERIAS ASIGNADAS: "
    this.tinicio= "Inicio";
    this.tfin =" Fin";
    this.tdia = "Día";
    this.tsubtitulo = "LISTA DE ESTUDIANTES";
  }
}
