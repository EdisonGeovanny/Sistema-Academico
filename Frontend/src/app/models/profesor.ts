export class Profesor {
    id?:number;
    DNI: string;
    Nombres: string;
    Apellidos: string;
    Fecha_ingreso_magisterio: Date;
    Fecha_ingreso_institucion: Date;
    Titulo_profesional: string;
    Años_servicio: string;
    Condicion_laboral: string;
    Fecha_nacimiento: Date;
    Direccion: string;
    Email:string;
    Telefono: string;
    Celular: string;
    Estado:boolean;
    Genero:string;
    Observacion: string

    constructor(Nombres: string, Apellidos: string,Fecha_ingreso_magisterio: Date, Fecha_ingreso_institucion:Date,
        DNI:string, Titulo_profesional:string, Años_servicio:string, Condicion_laboral:string, Fecha_nacimiento:Date,
        Direccion:string, Email:string, Telefono:string, Celular:string, Estado:boolean, Genero:string, Autentificacion:string, Observacion:string){
            this.DNI = DNI;
            this.Nombres = Nombres;
            this.Apellidos= Apellidos;
            this.Fecha_ingreso_magisterio= Fecha_ingreso_magisterio;
            this.Fecha_ingreso_institucion= Fecha_ingreso_institucion;
            this.Titulo_profesional= Titulo_profesional;
            this.Años_servicio= Años_servicio;
            this.Condicion_laboral= Condicion_laboral;
            this.Fecha_nacimiento= Fecha_nacimiento;
            this.Direccion= Direccion;
            this.Email= Email;
            this.Telefono=  Telefono;
            this.Celular= Celular;
            this.Estado =Estado;
            this.Genero=Genero;
            this.Observacion= Observacion;
        }
   
}
