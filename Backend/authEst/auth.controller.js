const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';


exports.createUser = (req, res, next)=> {
    const newUser = { 
        Codigo: req.body.Codigo,
        DNI: req.body.DNI,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Tutor: req.body.Tutor,
        Fecha_nacimiento: req.body.Fecha_nacimiento,
        Genero: req.body.Genero,
        Discapacidad: req.body.Discapacidad,
        Email: req.body.Email,
        Telefono: req.body.Telefono,
        Celular: req.body.Celular,
        Direccion: req.body.Direccion,
        Estado: req.body.Estado,
        Foto:req.body.Foto,
        Grado: req.body.Grado,
        Paralelo: req.body.Paralelo,
        Usuario: req.body.Usuario,
        Contraseña: bcrypt.hashSync(req.body.Contraseña)
    }

User.create (newUser, (err,user)=> {
if( err && err.code == 11000) return res.status(409).send('Email already exists');

    if (err) return res.status(500).send('Server error');
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({id: user.id},
        SECRET_KEY, {
            expiresIn: expiresIn
        });
        const dataUser = {
            Nombres: user.Nombres,
            Usuario: user.Usuario,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        //Response
        res.send({dataUser});
    });
}


exports.loginUser = (req, res, next)=> {
    const userData = {
        Usuario: req.body.Usuario,
        Contraseña: req.body.Contraseña
    }
    User.findOne({Usuario: userData.Usuario}, (err, user)=>{
        if (err) return res. status(500).send('Server error!');
        if(!user) {
            //email does not exist
            res.status(409).send({ message: 'Something is wrong'});
        }else {
            const resultPassword = bcrypt.compareSync(userData.Contraseña, user.Contraseña)
            if(resultPassword){
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});
                const dataUser = {
                    Nombres: user.Nombres,
                    Usuario: user.Usuario,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({dataUser});
            }else {
                //password wrong
                res.status(409).send({ message: 'Something is wrong'});
            }
        }
    })
}