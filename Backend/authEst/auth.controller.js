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
        Fecha_ingreso_magisterio: req.body.Fecha_ingreso_magisterio,
        Fecha_ingreso_institucion: req.body.Fecha_ingreso_institucion,
        Titulo_profesional: req.body.Titulo_profesional,
        Años_servicio: req.body.Años_servicio,
        Condicion_laboral: req.body.Condicion_laboral,
        Fecha_nacimiento: req.body.Fecha_nacimiento,
        Direccion: req.body.Direccion,
        Email: req.body.Email,
        Telefono: req.body.Telefono,
        Celular: req.body.Celular,
        Foto:req.body.Foto,
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