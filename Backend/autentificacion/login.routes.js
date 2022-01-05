const Users = require('./login.controller');
module.exports = (router)=> {
    router.post('/reg-aut', Users.createAut); //registrar usuario de acceso
    router.post('/aut', Users.loginAut); //ingresar con ususario de acceso
    router.get('/list-aut', Users.getAut); /*listar todos los usuarios*/
}