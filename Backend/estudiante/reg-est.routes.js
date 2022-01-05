const Users = require('./reg-est.controller');
module.exports = (router)=> {
    router.post('/reg-est', Users.createEst);//registrar Estudiante
    router.put('/update-est/:id', Users.updateEst);//editar por id
    router.get('/list-est',Users.listEst); //listar todo los estudiantes
    router.get('/list-est/:id',Users.listID); // listar por id  - NO ESTA UTILIZANDO
    router.delete('/delete-est/:id',Users.deleteEst);// eliminar por id

    router.get('/searche1/:sch', Users.searchDNI);  //busqueda
    router.get('/searche2/:sch', Users.searchNombre); // de 
    router.get('/searche3/:sch', Users.searchApellido); // docentes
}