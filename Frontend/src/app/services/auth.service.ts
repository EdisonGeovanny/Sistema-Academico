import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAdminI } from '../models/userAdmin';
import { JwtResponseAdminI } from '../models/jwt-responseAdmin';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AutentificacionI } from '../models/autentificacion';
import { JwtResponseAutI } from '../models/jwt-responseAut';
import { UserDocenteI } from '../models/userDocente';
import { JwtResponseI } from '../models/jwt-response';
import { UserRegAcceso } from '../models/user-reg-acceso';
import { Estudiante } from '../models/estudiante';
import { Representante } from '../models/representante';
import { Ficha } from '../models/ficha-estudiantil';

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubjet = new BehaviorSubject(false);
  private token: string;


  constructor(private httpClient: HttpClient) { this.token = ''; }



   //////////////////////// Periodo //////////////////////

  //registrarPeriodo lectivo
  registerPeriodo(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/reg-per`,
      user).pipe(tap(
        (res: any) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
      );
  }

  //obtener todos los Docentes
  getPeriodoAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/list-per`);
  }

   //obtener Docente por id
   obtenerPeriodoId(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/list-per/${id}`)
  }


  //eliminiar Docente por id
  deletePeriodo(id: string): Observable<any> {
    return this.httpClient.delete(`${this.AUTH_SERVER}/delete-per/${id}`)
  }

  //actualizar datos
  updatePeriodo(id: string, user: any): Observable<any> {
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/update-per/${id}`,
      user).pipe(tap(
        (res: any) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
        );
      }

//obtener Docente por Nombres
obtenerPeridoCodigo(sch: string): Observable<any> {
  return this.httpClient.get(`${this.AUTH_SERVER}/searcha/${sch}`)
}


  
  ////////////////////////  Autentificacion //////////////////////

  //registrar autentificacion de acceso DA
  registerAcceso(user: UserRegAcceso): Observable<JwtResponseAutI> {
    return this.httpClient.post<JwtResponseAutI>(`${this.AUTH_SERVER}/reg-aut`,
      user).pipe(tap(
        (res: JwtResponseAutI) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
      );
  }

   //obtener Docente por id
   obtenerAccesoId(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/list-aut/${id}`)
  }

  //obtener todos los Docentes
  getAccesoAll(): Observable<UserAdminI[]> {
    return this.httpClient.get<UserAdminI[]>(`${this.AUTH_SERVER}/list-aut`);
  }

  //eliminiar Docente por id
  deleteAcceso(id: string): Observable<any> {
    return this.httpClient.delete(`${this.AUTH_SERVER}/delete-aut/${id}`)
  }

  //actualizar datos
  updateAcceso(id: string, user: any): Observable<any> {
    return this.httpClient.put<JwtResponseI>(`${this.AUTH_SERVER}/update-aut/${id}`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
        );
      }



  //acceso a Usuarios
  loginA(user: AutentificacionI): Observable<JwtResponseAdminI> {
    return this.httpClient.post<JwtResponseAdminI>(`${this.AUTH_SERVER}/aut`,
      user).pipe(tap(
        (res: JwtResponseAdminI) => {
          if (res) {
            // GUARDAR TOKEN
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }
  //cerrar sesión
  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }


  ///////////////////////// Docente ////////////////////////////
  //registrar Docente
  registerDA(user: UserDocenteI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/reg-da`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
      );
  }

  //obtener Docente por id
  obtenerPorfesorId(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/list-da/${id}`)
  }

  //obtener Docente por id
  obtenerProfId(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/prof-da/${id}`)
  }

  //obtener Docente por dni
  obtenerProfesorDni(sch: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/search1/${sch}`)
  }

//obtener Docente por Nombres
obtenerProfesorNombres(sch: string): Observable<any> {
  return this.httpClient.get(`${this.AUTH_SERVER}/search2/${sch}`)
}

  //obtener Docente por Apellido
  obtenerProfesorApellido(sch: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/search3/${sch}`)
  }


  //obtener todos los Docentes
  getProfAll(): Observable<UserAdminI[]> {
    return this.httpClient.get<UserAdminI[]>(`${this.AUTH_SERVER}/list-da`);
  }

  //eliminiar Docente por id
  deleteProfesor(id: string): Observable<any> {
    return this.httpClient.delete(`${this.AUTH_SERVER}/delete-da/${id}`)
  }

  //actualizar datos
  updateDocente(id: string, user: UserDocenteI): Observable<JwtResponseI> {
    return this.httpClient.put<JwtResponseI>(`${this.AUTH_SERVER}/update-da/${id}`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
        );
      }


  ///////////////// Otros metodos //////////////////////////////////
  //guardar access token
  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }
  //devolvar access token
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")!;
    }
    return this.token;
  }



  ////////////////////////////////////////////////////////////////////////////////////////////
  login(user: UserAdminI): Observable<JwtResponseAdminI> {
    return this.httpClient.post<JwtResponseAdminI>(`${this.AUTH_SERVER}/loginAdmin`,
      user).pipe(tap(
        (res: JwtResponseAdminI) => {
          if (res) {
            // GUARDAR TOKEN
            // this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }


  ListAllAdmin(): Observable<UserAdminI[]> {
    return this.httpClient.get<UserAdminI[]>(`${this.AUTH_SERVER}/listAdmin`);
  }



  //**************************************Estudiante*******************************************

 

 ///////////////////////// Estudiantes////////////////////////////
  //registrar Estudiante
  registerEst(user: Estudiante): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/reg-est`,
      user).pipe(tap(
        (res: any) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
      );
  }

   //obtener todos los Estudiantes
   getEstAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/list-est`);
  }

//eliminiar Docente por id
deleteEst(id: string): Observable<any> {
  return this.httpClient.delete(`${this.AUTH_SERVER}/delete-est/${id}`)
}

//Autentificacion
  AutentificacionE(user: AutentificacionI): Observable<JwtResponseAutI> {
    return this.httpClient.post<JwtResponseAutI>(`${this.AUTH_SERVER}/aut`,
      user).pipe(tap(
        (res: JwtResponseAutI) => {
          if (res) {
            // GUARDAR TOKEN
            // this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

   //actualizar datos
   updateEst(id: string, user: Estudiante): Observable<any> {
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/update-est/${id}`,
      user).pipe(tap(
        (res: any) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
        );
      }

       //obtener Docente por id
  obtenerEstudianteId(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/list-est/${id}`)
  }

  //obtener Docente por dni
  obtenerEstudianteDni(sch: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/searche1/${sch}`)
  }

//obtener Docente por Nombres
obtenerEstudianteNombres(sch: string): Observable<any> {
  return this.httpClient.get(`${this.AUTH_SERVER}/searche2/${sch}`)
}

  //obtener Docente por Apellido
  obtenerEstudianteApellido(sch: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/searche3/${sch}`)
  }


///////////////////////// Representantes ////////////////////////////
  //registrar Representante
  registerRep(user: Representante): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/reg-rep`,
      user).pipe(tap(
        (res: any) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
      );
  }

  //obtener Representante por id
  obtenerRepresentanteId(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/list-rep/${id}`)
  }

  //obtener Representante por dni
  obtenerRepresentanteDni(sch: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/searchr1/${sch}`)
  }

//obtener Representante por Nombres
obtenerRepresentanteNombres(sch: string): Observable<any> {
  return this.httpClient.get(`${this.AUTH_SERVER}/searchr2/${sch}`)
}

  //obtener Representante por Apellido
  obtenerRepresentanteApellido(sch: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/searchr3/${sch}`)
  }


  //obtener todos los Representante
  getRepAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/list-rep`);
  }

  //eliminiar Representante por id
  deleteRepresentante(id: string): Observable<any> {
    return this.httpClient.delete(`${this.AUTH_SERVER}/delete-rep/${id}`)
  }

  //actualizar datos
  updateRepresentante(id: string, user: Representante): Observable<any> {
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/update-rep/${id}`,
      user).pipe(tap(
        (res: any) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
        );
      }


      ///////////////////////// Ficha////////////////////////////
  //registrar Estudiante
  registerFicha(user: Ficha): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/reg-ficha`,
      user).pipe(tap(
        (res: any) => {
          if (res) {
            // GUARDAR TOKEN
            console.log(res.dataUser);
          }
        })
      );
  }

   //obtener todos los Estudiantes
   getFichaAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/list-ficha`);
  }

//eliminiar Docente por id
deleteFicha(id: string): Observable<any> {
  return this.httpClient.delete(`${this.AUTH_SERVER}/delete-ficha/${id}`)
}

   //actualizar datos
   updateFicha(id: string, user: Ficha): Observable<any> {
    return this.httpClient.put<any>(`${this.AUTH_SERVER}/update-ficha/${id}`,
      user).pipe(tap(
        (res: any) => {
          if (res) {
            console.log(res.dataUser);
          }
        })
        );
      }

       //obtener Docente por id
  obtenerFichaId(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/list-ficha/${id}`)
  }

  //obtener Docente por dni
  obtenerFichaDni(sch: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/searchf1/${sch}`)
  }

//obtener Docente por Nombres
obtenerFichaNombres(sch: string): Observable<any> {
  return this.httpClient.get(`${this.AUTH_SERVER}/searchf2/${sch}`)
}

  //obtener Docente por Apellido
  obtenerFichaApellido(sch: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/searchf3/${sch}`)
  }


}


