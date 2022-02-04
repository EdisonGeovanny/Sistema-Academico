import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RolAdminGuard implements CanActivateChild {
  private res = false;

  constructor(private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    if (token !== null) {
      if (rol === 'Administrador') {
        this.res = true;
      } else {
        this.res = false;
        this.router.navigate(['/', 'error']);
      }
    } else {
      this.res = false;
      this.router.navigate(['/', 'error']);
    }
    return this.res;
  }



}
