const User = require('./login.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

// Autentificacion 3 Roles
exports.createAut = (req, res, next) => {
    const newUser = {
        Usuario: req.body.Usuario,
        Contraseña: bcrypt.hashSync(req.body.Contraseña),
        Rol: req.body.Rol,
        Vinculo: req.body.Vinculo
    }

    User.create(newUser, (err, user) => {
        if (err && err.code == 11000) return res.status(409).send('El email ya existe');

        if (err) return res.status(500).send('Server error');
        const acceso = {
            Id: user._id,
            Rol: user.Rol,
            Usuario: user.Usuario,
            Vinculo: user.Vinculo
        }

        //Response
        res.send({ acceso });
    });
}

exports.loginAut = (req, res, next) => {
    const userData = {
        Usuario: req.body.Usuario,
        Contraseña: req.body.Contraseña,
        Rol: req.body.Rol
    }
    User.findOne({ $and: [{Usuario:userData.Usuario}, {Rol:userData.Rol}] }, (err, user) => {
        if (err) return res.status(500).send('Server error!');
        if (!user) {
            //email does not exist
            res.status(409).send({ message: 'algo esta mal' });
        } else {
            const resultPassword = bcrypt.compareSync(userData.Contraseña, user.Contraseña)
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                const dataUser = {
                    Usuario: user.Usuario,
                    Rol: user.Rol,
                    Vinculo: user.Vinculo,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({ dataUser });
            } else {
                //password wrong
                res.status(409).send({ message: 'algo esta mal' });
            }
        }
    })
}

exports.getAut = (req, res, next)=> {
    
    User.find({}, (err, user)=>{
        if (err) return res. status(500).send('Server error!');
        if(!user) {
            //email does not exist
            res.status(484).send({ message: 'El elemento no existe'});
        }else {
            
                res.send({user});
            
        }
    })
}

