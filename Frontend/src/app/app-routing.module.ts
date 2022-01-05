import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'', redirectTo:'/app/pag-inicio',pathMatch:'full' },
  {path:'app', loadChildren: () => 
 import('src/app/Components/auth.module').then(m => m.AuthModule)},
  {path:'**', redirectTo:'/app/pag-inicio', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
