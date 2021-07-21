const Users = require('./auth.controller');
module.exports = (router)=> {
    router.post('/registerEst', Users.createUser);
    router.post('/loginEst', Users.loginUser); 
}