import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAdminI } from '../../models/userAdmin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form:any):void{
    //console.log('Login', form.value);
    this.authService.login(form.value).subscribe(res =>{
      this.router.navigateByUrl('/auth/register');
    });
  }

}
