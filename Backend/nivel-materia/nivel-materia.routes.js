const Users = require('./nivel-materia.controller');
module.exports = (router)=> {
    router.post('/reg-nv', Users.createNv);//registrar Grado
    router.get('/list-nv',Users.listNv); //listar todo los grados
    router.get('/list-nv/:id',Users.listID); // listar por id 
    router.delete('/delete-nv/:id',Users.deleteNv);// eliminar por id
    router.put('/update-nv/:id', Users.updateNv);//editar por id
    router.get('/searchnv/:sch', Users.searchNv);  //busqueda
 
}