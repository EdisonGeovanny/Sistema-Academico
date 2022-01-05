export class UserAccesoI {
    id?:number;
    Rol:string;
    Usuario: string;
    Contraseña: string;

    constructor (  Rol:string, Usuario:string, Contraseña:string) {
        this.Rol = Rol;
        this.Usuario = Usuario;
        this.Contraseña = Contraseña;
    }
}
