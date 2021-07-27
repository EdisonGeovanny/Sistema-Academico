import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAdminI } from '../models/userAdmin';
import { JwtResponseAdminI } from '../models/jwt-responseAdmin';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubjet = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) { this.token=''; }

  register(user: UserAdminI): Observable<JwtResponseAdminI> {
    return this.httpClient.post<JwtResponseAdminI>(`${this.AUTH_SERVER}/registerAdmin`,
      user).pipe(tap(
        (res: JwtResponseAdminI) => {
          if (res) {
                // GUARDAR TOKEN
                this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }


  login(user: UserAdminI): Observable<JwtResponseAdminI> {
    return this.httpClient.post<JwtResponseAdminI>(`${this.AUTH_SERVER}/loginAdmin`,
      user).pipe(tap(
        (res: JwtResponseAdminI) => {
          if (res) {
                // GUARDAR TOKEN
                this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }


  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
     localStorage.setItem("EXPIRES_IN", expiresIn);
     this.token=token;    
  } 

  private getToken():string {
    if(!this.token){
      this.token=localStorage.getItem("ACCESS_TOKEN")!;
    }
    return this.token;
  }

}
