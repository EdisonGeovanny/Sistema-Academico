import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-list-periodo',
  templateUrl: './list-periodo.component.html',
  styleUrls: ['./list-periodo.component.css']
})
export class ListPeriodoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Redirect(): void {
    this.router.navigateByUrl('/app/reg-admin');
  }

}
