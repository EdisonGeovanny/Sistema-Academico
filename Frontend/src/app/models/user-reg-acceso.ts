export class UserRegAcceso {
    id?:number;
    Rol:string;
    Usuario: string;
    Contraseña: string;
    Vinculo : any;

    constructor (  Vinculo: any, Rol:string, Usuario:string, Contraseña:string) {
        this.Vinculo = Vinculo;
        this.Rol = Rol;
        this.Usuario = Usuario;
        this.Contraseña = Contraseña;
    }
}