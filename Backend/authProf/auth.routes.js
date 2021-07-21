const Users = require('./auth.controller');
module.exports = (router)=> {
    router.post('/registerProf', Users.createUser);
    router.post('/loginProf', Users.loginUser); 
}