import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-reg-periodo',
  templateUrl: './reg-periodo.component.html',
  styleUrls: ['./reg-periodo.component.css']
})
export class RegPeriodoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Redirect(): void {
    this.router.navigateByUrl('/app/reg-admin');
  }

}
