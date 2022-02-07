const Users = require('./distributivo.controller');
module.exports = (router)=> {
    router.post('/reg-dist', Users.createDistributivo);//registrar distributivo
    router.get('/list-dist',Users.listDistributivo); //listar todo los distributivos
    router.get('/list-dist/:id',Users.listID); // listar por id 
    router.delete('/delete-dist/:id',Users.deleteDistributivo);// eliminar por id
    router.put('/update-dist/:id', Users.updateDistributivo);//editar por id
    router.get('/search-dist/:sch', Users.searchDocente);  //busqueda
    router.get('/search2-dist/:sch', Users.searchExitente);  //busqueda
    router.get('/dist/:sch', Users.searchDocentePeriodo)//busqueda docente periodo
    router.get('/distributivo/:sch', Users.searchPorPeriodoNivelParalelo)//busqueda docente periodo
}