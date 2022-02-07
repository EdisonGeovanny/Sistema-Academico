const Users = require('./notas.controller');
module.exports = (router)=> {
    router.post('/reg-nota', Users.createNota);//registrar Nota
    router.get('/list-nota',Users.listNota); //listar todo los nota
    router.get('/list-nota/:id',Users.listID); // listar por id 
    router.put('/update-nota/:id', Users.updateNota);//editar por id
    router.get('/nota-sch/:sch', Users.searchNota);  //busqueda
    router.get('/nota/:sch', Users.NotaAlumno);  //Notas de alumnos
 
}