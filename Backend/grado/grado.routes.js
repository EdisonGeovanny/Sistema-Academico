const Users = require('./grado.controller');
module.exports = (router)=> {
    router.post('/reg-grado', Users.createGrado);//registrar Grado
    router.get('/list-grado',Users.listGrado); //listar todo los grados
    router.get('/list-grado/:id',Users.listID); // listar por id 
    router.delete('/delete-grado/:id',Users.deleteGrado);// eliminar por id
    router.put('/update-grado/:id', Users.updateGrado);//editar por id
    router.get('/searchg/:sch', Users.searchJornada);  //busqueda
    router.get('/searchg2/:sch', Users.searchNJP); 
 
}