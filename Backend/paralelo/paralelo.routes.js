const Users = require('./paralelo.controller');
module.exports = (router)=> {
    router.post('/reg-par', Users.createParalelo);//registrar paralelo
    router.get('/list-par',Users.listParalelo); //listar todo los paralelo
    router.get('/list-par/:id',Users.listID); // listar por id 
    router.delete('/delete-par/:id',Users.deleteParalelo);// eliminar por id
    router.put('/update-par/:id', Users.updateParalelo);//editar por id
    router.get('/searchpar/:sch', Users.searchParalelo);  //busqueda
 
}