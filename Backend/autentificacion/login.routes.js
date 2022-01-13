const Users = require('./login.controller');
module.exports = (router)=> {
    router.post('/reg-aut', Users.createAut); //registrar usuario de acceso
    router.post('/aut', Users.loginAut); //ingresar con ususario de acceso
    router.get('/list-aut', Users.ListAut); /*listar todos los usuarios*/
    router.get('/list-aut/:id',Users.listID); // listar por id 
    router.put('/update-aut/:id',Users.updateAut);// actualizar datos por id
    router.delete('/delete-aut/:id',Users.deleteAut);// eliminar por id
}