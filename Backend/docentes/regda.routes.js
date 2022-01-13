const Users = require('./regda.controller');
module.exports = (router)=> {
    router.post('/reg-da', Users.regDA); //registrar Docente/administrador
    router.get('/list-da',Users.listDA); //listar todo los docentes
    router.get('/list-da/:id',Users.listID); // listar por id  - NO ESTA UTILIZANDO
    router.get('/prof-da/:id',Users.ProfesorID); //Autentificacion
    
    router.put('/update-da/:id',Users.updateDA);// actualizar datos por id
    router.delete('/delete-da/:id',Users.deleteDA);// eliminar por id
    router.get('/get-da', Users.getDA); // FALLAS
    router.get('/get-da/:id', Users.getDAid);//FALLAS

    router.get('/search1/:sch', Users.searchDNI);  //busqueda
    router.get('/search2/:sch', Users.searchNombre); // de 
    router.get('/search3/:sch', Users.searchApellido); // docentes
}