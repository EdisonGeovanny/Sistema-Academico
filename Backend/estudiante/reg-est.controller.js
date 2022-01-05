const User = require('./reg-est.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Estudiante
exports.createEst = (req, res, next)=> {
    const newUser = { 
        Codigo: req.body.Codigo,
        DNI: req.body.DNI,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Fecha_nacimiento: req.body.Fecha_nacimiento,
        Genero: req.body.Genero,
        Direccion: req.body.Direccion,
        Estado: req.body.Estado,
        Observacion: req.body.Observacion
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('Email already exists');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                    Nombres: user.Nombres,
                   Apellidos: user.Apellidos
                }
        
                //Response
                res.send({dataUser});
            });
}

//update de registros de estudiantes
exports.updateEst  = async (req, res) => {
    try{
        const { Codigo, DNI, Nombres, Apellidos, Fecha_nacimiento, Direccion,
                 Estado, Genero, Observacion} = req.body;
            let estudiante = await User.findById(req.params.id);

            if(!estudiante) {
                res.status(404).json({msg: 'No existe el registro'})
            } 
            
            estudiante.Codigo = Codigo;
            estudiante.DNI = DNI;
            estudiante.Nombres = Nombres;
            estudiante.Apellidos = Apellidos;
            estudiante.Fecha_nacimiento = Fecha_nacimiento;
            estudiante.Direccion = Direccion;
            estudiante.Estado = Estado;
            estudiante.Genero = Genero;
            estudiante.Observacion = Observacion;

            estudiante = await User.findOneAndUpdate({_id: req.params.id}, estudiante, {new:true})
            res.json(estudiante);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete de registros de docentes
exports.deleteEst = async (req, res) => {
    try{
        let estudiante = await User.findById(req.params.id);

        if(!estudiante) {
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
            let estudiante = await User.findById(req.params.id);

            if(!estudiante) {
                res.status(404).json({msg: 'No existe el producto'})
            }

                 res.json(estudiante);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//Search - buscador
exports.searchDNI = async (req, res) => {
    try{
        let dni = await User.find({DNI:req.params.sch});
        if(!dni){
                    res.status(404).json({msg: 'La busqueda no existe'})
        } res.json({dni});
            
    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

exports.searchNombre = async (req, res) => {
    try{
        let dni = await User.find({Nombres:req.params.sch});
        if(!dni){
                    res.status(404).json({msg: 'La busqueda no existe'})
        } res.json({dni});
            
    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

exports.searchApellido = async (req, res) => {
    try{
        let dni = await User.find({Apellidos:req.params.sch});
        if(!dni){
                    res.status(404).json({msg: 'La busqueda no existe'})
        } res.json({dni});
            
    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


//Listar datos de Estudiante 
exports.listEst = (req, res, next) => {

    User.find({}, (err, user)=>{
        if (err) return res. status(500).send('Server error!');
        if(!user) {
            //email does not exist
            res.status(484).send({ message: 'No existen productos'});
        }else {
            
                res.send({user});
            
        }
    })
}


// mirar codigo por si a caso 
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