export class Ficha {
    id?:number;
    Estudiante:any;
    Representante: any;
    Nombre_padre: string;
    Nombre_madre: string;
    Convive: string;
    Numero_hermanos: string;
    Tipo_vivienda: string;
    Materia_vivienda: string;
    Servicios: any[];
    Nombre_emergente: string;
    Contacto_emergente: string;
    Observacion: string;
    Estado: string;

    constructor ( Estudiante:any, Representante: any, Nombre_padre: string, Nombre_madre: string,
        Convive: string, Numero_hermanos: string, Tipo_vivienda: string, Materia_vivienda: string,
        Servicios: any[], Nombre_emergente: string, Contacto_emergente: string, Observacion: string,
        Estado: string) {
            this.Estudiante =Estudiante;
            this.Representante = Representante;
            this.Nombre_padre = Nombre_padre;
            this.Nombre_madre = Nombre_madre;
            this.Convive = Convive;
            this.Numero_hermanos = Numero_hermanos;
            this.Tipo_vivienda = Tipo_vivienda;
            this.Materia_vivienda = Materia_vivienda;
            this.Servicios = Servicios;
            this.Nombre_emergente = Nombre_emergente;
            this.Contacto_emergente = Contacto_emergente;
            this.Observacion = Observacion;
            this.Estado = Estado;
    }
}