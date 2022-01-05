import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAdminI } from '../../models/userAdmin';
import { Profesor } from '../../models/profesor'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pag-inicio',
  templateUrl: './pag-inicio.component.html',
  styleUrls: ['./pag-inicio.component.css']
})
export class PagInicioComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private toastr: ToastrService, private aRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }
  Redirect1(): void {
    this.router.navigateByUrl('/app/log-admin');
  }
  Redirect2(): void {
    this.router.navigateByUrl('/app/log-prof');
  }
  Redirect3(): void {
    this.router.navigateByUrl('/app/log-est');
  }
}
