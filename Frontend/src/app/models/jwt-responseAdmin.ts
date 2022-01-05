export interface JwtResponseAdminI {
  dataUser:{ 
    id:number,
    Nombres: string,
    Apellidos: string,
    accessToken: string,
     expiresIn: string
    }
}
