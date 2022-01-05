export interface UserAdminI {
    id:number,
    DNI: string,
    Nombres: string,
    Apellidos: string,
    Fecha_ingreso_magisterio: Date,
    Fecha_ingreso_institucion: Date,
    Titulo_profesional: string,
    Años_servicio: string,
    Condicion_laboral: string,
    Fecha_nacimiento: Date,
    Direccion: string,
    Email:string,
    Telefono: string,
    Celular: string,
    Estado:boolean,
    Genero:string,
    Observacion:string
}
