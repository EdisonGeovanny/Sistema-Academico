const Users = require('./estado-notas.controller');
module.exports = (router)=> {
    router.post('/reg-en', Users.createEN);//registrar Grado
    router.get('/list-en',Users.listEN); //listar todo los grados
    router.delete('/delete-en/:id',Users.deleteEN);// eliminar por id
    router.put('/update-en/:id', Users.updateEN);//editar por id
 
 
}