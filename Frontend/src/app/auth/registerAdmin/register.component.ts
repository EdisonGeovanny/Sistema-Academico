import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAdminI } from '../../models/userAdmin';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 //Nombramiento
  Nombramiento=[{name:"Nombramiento Provisional"},
{name:"Nombramiento Definitivo"},{name:"Contrato"}];
elegido1:string= "";

  //Genero
  Genero=[{name:"Masculino"},{name:"Femenino"}];
elegido2:string= "";

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  onRegister(form:any):void{
   console.log(form.value);

   this.authService.register(form.value).subscribe(res => {
    this.router.navigateByUrl('/auth/registerAdmin');
  });
  }

}
