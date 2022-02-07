import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importar pdfmake-wrapper y las fuentes para usar 
import  {  PdfMakeWrapper  }  from  'pdfmake-wrapper' ; 
import  *  as  pdfFonts  from  "pdfmake/build/vfs_fonts" ;  // fuentes proporcionadas para pdfmake

// Si hay algún problema con la importación de fuentes anteriores. puede probar esto: 
// import pdfFonts from "pdfmake/build/vfs_fonts";

// Establecer las fuentes para usar 
PdfMakeWrapper . setFonts ( pdfFonts ) ;


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
