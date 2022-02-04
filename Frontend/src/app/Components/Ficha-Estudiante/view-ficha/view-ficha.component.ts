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
  Print() {
    printJS({
      printable: 'PrintForm1',
      type: 'html',
      targetStyles: ['*'],
      ignoreElements: ['ignore'],
      header: '<h2>Unidad Educativa Comunitaria Intercultural Bilingüe "Benito Juárez"</h2>'
    })
  }

}




