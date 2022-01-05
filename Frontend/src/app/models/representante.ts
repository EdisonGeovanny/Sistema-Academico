export class Representante {
    id?: number;
    Parentesco: string;
    DNI: string;
    Nombres: string;
    Apellidos: string;
    Fecha_nacimiento: Date;
    Direccion: string;
    Estado_civil: string;
    Profesion: string;
    Email: string;
    Telefono: string;
    Celular: string;
    Estado: boolean;
    Genero: string;
    Observacion: string;

    constructor(Parentesco: string, DNI: string, Nombres: string, Apellidos: string, Fecha_nacimiento: Date,
        Direccion: string, Estado_civil: string, Profesion: string, Email: string,
        Telefono: string, Celular: string, Estado: boolean, Genero: string, Observacion: string) {

        this.Parentesco = Parentesco;
        this.DNI = DNI;
        this.Nombres = Nombres;
        this.Apellidos = Apellidos;
        this.Fecha_nacimiento = Fecha_nacimiento;
        this.Direccion = Direccion;
        this.Estado_civil = Estado_civil;
        this.Profesion = Profesion;
        this.Email = Email;
        this.Telefono = Telefono;
        this.Celular = Celular;
        this.Estado = Estado;
        this.Genero = Genero;
        this.Observacion = Observacion;
    }

}
