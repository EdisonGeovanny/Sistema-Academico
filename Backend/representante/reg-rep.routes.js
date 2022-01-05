const Users = require('./reg-rep.controller');
module.exports = (router)=> {
    router.post('/reg-rep', Users.regRep); //registrar Representante
    router.get('/list-rep',Users.listRep); //listar todo los Representantes
    router.get('/list-rep/:id',Users.listID); // listar por id los Representantes
    router.put('/update-rep/:id',Users.updateRep);// actualizar datos por id
    router.delete('/delete-rep/:id',Users.deleteRep);// eliminar por id

    router.get('/searchr1/:sch', Users.searchDNI);  //busqueda
    router.get('/searchr2/:sch', Users.searchNombre); // de 
    router.get('/searchr3/:sch', Users.searchApellido); // Representante
}