const Users = require('./reg-ficha.controller');
module.exports = (router)=> {
    router.post('/reg-ficha', Users.regFicha); //registrar Representante
    router.get('/list-ficha',Users.listFicha); //listar todo los Representantes
    router.get('/list-ficha/:id',Users.listID); // listar por id los Representantes
    router.put('/update-ficha/:id',Users.updateFicha);// actualizar datos por id
    router.delete('/delete-ficha/:id',Users.deleteFicha);// eliminar por id

    router.get('/searchf1/:sch', Users.searchDNI);  //busqueda
    router.get('/searchf2/:sch', Users.searchNombre); // de 
    router.get('/searchf3/:sch', Users.searchApellido); // Representante
}