const Users = require('./uni-notas.controller');
module.exports = (router)=> {
    router.post('/reg-unidad', Users.createUnidad);//registrar notas
    router.get('/list-unidad',Users.listUnidad); //listar todo los notas
    router.get('/list-unidad/:id',Users.listID); // listar por id 
    router.put('/update-unidad/:id', Users.updateUnidad);//editar por id
    router.get('/nota-sch/:sch', Users.searchUnidad);  //busqueda
    router.get('/unidad/:sch', Users.UnidadAlumno);  // notas de alumnos
 
}