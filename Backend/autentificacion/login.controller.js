const User = require('./login.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'SGA1234';

// Autentificacion 3 Roles
exports.createAut = (req, res, next) => {
    const newUser = {
        Usuario: req.body.Usuario,
        Pass_temp: req.body.Contraseña,
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
                const data = {
                    id: user.id,
                    Usuario: user.Usuario,
                    Rol: user.Rol,
                    Vinculo: user.Vinculo[0],
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({data});
            } else {
                //password wrong
                res.status(409).send({ message: 'algo esta mal con el logeo' });
            }
        }
    })
}

exports.ListAut = (req, res, next)=> {
    
    User.find({}, (err, dni)=>{
        if (err) return res. status(500).send('Server error!');
        if(!dni) {
            //email does not exist
            res.status(484).send({ message: 'El elemento no existe'});
        }else {
            
                res.send({dni});
            
        }
    })
}

//update de registros de docentes
exports.updateAut  = async (req, res) => {
    try{
        const { Contraseña, Usuario, Rol, Vinculo} = req.body;
            let user = await User.findById(req.params.id);

            if(!user) {
                res.status(404).json({msg: 'No existe el producto'})
            } 
            user.Pass_temp = Contraseña;
            user.Usuario = Usuario;
            user.Contraseña =  bcrypt.hashSync(Contraseña);
            user.Rol = Rol;
            user.Vinculo = Vinculo;
            

            user = await User.findOneAndUpdate({_id: req.params.id}, user, {new:true})
            res.json(user);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete de registros de docentes
exports.deleteAut = async (req, res) => {
    try{
        let user = await User.findById(req.params.id);

        if(!user) {
            res.status(404).json({msg: 'No existe el registro'})
        }
        await User.findByIdAndDelete({_id: req.params.id})
        res.json({msg:'registro eliminado con exito!'});


}catch(err){
    console.log(err);
    res.status(500).send('Hubo un error')

}
}

//Listar por ID
exports.listID = async (req, res) => {
    try{
            let user = await User.findById(req.params.id);

            if(!user) {
                res.status(404).json({msg: 'No existe el registro'})
            }

                 res.json(user);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//Search - buscador
exports.UsuarioId = async (req, res) => {
    try{
        let dni = await User.find({Vinculo:req.params.sch});
        if(!dni){
                    res.status(404).json({msg: 'La busqueda no existe'})
        } res.json({dni});
            
    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}



