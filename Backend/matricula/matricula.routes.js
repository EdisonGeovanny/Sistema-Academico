const Users = require('./matricula.controller');
module.exports = (router)=> {
    router.post('/reg-matricula', Users.createMatricula);//registrar Grado
    router.get('/list-matricula',Users.listMatricula); //listar todo los grados
    router.get('/list-matricula/:id',Users.listID); // listar por id 
    router.delete('/delete-matricula/:id',Users.deleteMatricula);// eliminar por id
    router.put('/update-matricula/:id', Users.updateMatricula);//editar por id
    router.get('/searchma/:sch', Users.searchEstudiante);  //busqueda
    router.get('/est-per/:sch', Users.EstudiantePeriodo);  //busqueda matricula existente
    router.get('/schgrado/:sch', Users.Grado);
 
}