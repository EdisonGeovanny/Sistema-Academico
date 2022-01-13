const Users = require('./materia.controller');
module.exports = (router)=> {
    router.post('/reg-asig', Users.createMateria);//registrar Grado
    router.get('/list-asig',Users.listMateria); //listar todo los grados
    router.get('/list-asig/:id',Users.listID); // listar por id 
    router.delete('/delete-asig/:id',Users.deleteMateria);// eliminar por id
    router.put('/update-asig/:id', Users.updateMateria);//editar por id
    router.get('/searchasig/:sch', Users.searchMateria);  //busqueda
 
}