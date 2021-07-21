const Users = require('./auth.controller');
module.exports = (router)=> {
    router.post('/registerAdmin', Users.createUser);
    router.post('/loginAdmin', Users.loginUser); 
}