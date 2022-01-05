export class Estudiante {
    id?:number;
    Codigo:string;
    DNI: string;
    Nombres: string;
    Apellidos: string;
    Fecha_nacimiento: Date;
    Direccion: string;
    Estado:boolean;
    Genero:string;
    Observacion: string

    constructor(Nombres: string, Apellidos: string, Codigo: string, Fecha_nacimiento: Date,
        DNI:string, Direccion:string, Estado:boolean, Genero:string, Observacion:string){
           this.Codigo =Codigo;
            this.DNI = DNI;
            this.Nombres = Nombres;
            this.Apellidos= Apellidos;
            this.Fecha_nacimiento= Fecha_nacimiento;
            this.Direccion= Direccion;
            this.Estado =Estado;
            this.Genero=Genero;
            this.Observacion= Observacion;
        }
   
}
