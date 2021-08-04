import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './loginAdmin/login.component';
import { RegisterComponent } from './registerAdmin/register.component';

const routes: Routes = [
    {path: 'registerAdmin', component: RegisterComponent},
    {path:'loginAdmin', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
