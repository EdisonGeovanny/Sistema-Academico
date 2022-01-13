const Users = require('./periodo.controller');
module.exports = (router)=> {
    router.post('/reg-per', Users.createPeriodo);//registrar Periodo_lectivo
    router.get('/list-per',Users.listPeriodo); //listar todo los estudiantes
    router.get('/list-per/:id',Users.listID); // listar por id 
    router.delete('/delete-per/:id',Users.deletePeriodo);// eliminar por id
    router.put('/update-per/:id', Users.updatePeriodo);//editar por id
    router.get('/searcha/:sch', Users.searchCodigo);  //busqueda
 
}