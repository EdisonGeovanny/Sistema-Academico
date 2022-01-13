const Users = require('./nivel.controller');
module.exports = (router)=> {
    router.post('/reg-nivel', Users.createNivel);//registrar nivel
    router.get('/list-nivel',Users.listNivel); //listar todo los nivel
    router.get('/list-nivel/:id',Users.listID); // listar por id 
    router.delete('/delete-nivel/:id',Users.deleteNivel);// eliminar por id
    router.put('/update-nivel/:id', Users.updateNivel);//editar por id
    router.get('/searchniv/:sch', Users.searchNivel);  //busqueda
 
}