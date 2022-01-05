export class JwtResDocneteI {
     
    id?:number;
    Rol: string;
    Usuario: string;
    accessToken: string;
     expiresIn: string

     constructor(Rol: string,Usuario:string,accessToken: string,expiresIn:string){
this.accessToken = accessToken;
this.expiresIn = expiresIn;
this.Rol = Rol;
this.Usuario = Usuario;
     }
}