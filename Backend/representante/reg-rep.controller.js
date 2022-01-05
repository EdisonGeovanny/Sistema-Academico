const User = require('./reg-rep.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SECRET_KEY = 'secretkey1234';



//registrar Representante
exports.regRep = (req, res, next) => {
    const newUser = {
        Parentesco: req.body.Parentesco,
        DNI: req.body.DNI,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Fecha_nacimiento: req.body.Fecha_nacimiento,
        Direccion: req.body.Direccion,
        Genero: req.body.Genero,
        Estado_civil: req.body.Estado_civil,
        Profesion: req.body.Profesion,
        Email: req.body.Email,
        Telefono: req.body.Telefono,
        Celular: req.body.Celular,
        Estado: req.body.Estado,
        Observacion: req.body.Observacion
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('El email ya existe');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                    Id: user.id,
                    Parentesco: user.Parentesco,
                    Nombres: user.Nombres,
                   Apellidos: user.Apellidos,
                    Profesion: user.Profesion
                }
        
                //Response
                res.send({dataUser});
            });
}

//Listar datos de Estudiantes por paginada (paginate cambiar por find)
exports.listRep = (req, res, next) => {

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

//update de registros de representantes
exports.updateRep  = async (req, res) => {
    try{
        const { Parentesco, DNI, Nombres, Apellidos, Fecha_nacimiento, Direccion, Genero,
            Estado_civil, Profesion, Email, Telefono, Celular, Estado, Observacion} = req.body;
            let representante = await User.findById(req.params.id);

            if(!representante) {
                res.status(404).json({msg: 'No existe el producto'})
            } 
            representante.Parentesco = Parentesco;
            representante.DNI = DNI;
            representante.Nombres = Nombres;
            representante.Apellidos = Apellidos;
            representante.Fecha_nacimiento = Fecha_nacimiento;
            representante.Estado_civil = Estado_civil;
            representante.Profesion = Profesion;
            representante.Direccion = Direccion;
            representante.Email = Email;
            representante.Telefono = Telefono;
            representante.Celular =  Celular;
            representante.Estado = Estado;
            representante.Genero = Genero;
            representante.Observacion = Observacion;

            representante = await User.findOneAndUpdate({_id: req.params.id}, representante, {new:true})
            res.json(representante);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete de registros de docentes
exports.deleteRep = async (req, res) => {
    try{
        let representante = await User.findById(req.params.id);

        if(!representante) {
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
            let representante = await User.findById(req.params.id);

            if(!representante) {
                res.status(404).json({msg: 'No existe el producto'})
            }

                 res.json(representante);


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

//Crear referencias o relaciones entre documentos
// 1 - el modelo padre es Docentes

exports.getDA = async (req,res) => {

    try{
        const docente = await User.aggregate(
            [
                {
                    $lookup: { // unir tablas
                        from: "autentificacions", //2 - modelo hijo - Autentificacion
                        localField: "Autentificacion",  // campo local de modelo Docentes
                        foreignField: "_id", //campo id de modelo Autentificacion
                        as: "acceso"
                    }
                },
                { $unwind: "$acceso" }

            ],
        )
       // console.log('*************** Resultados *************', docente);
        res.send({ docente });

    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }

}

//Crear referencias o relaciones entre documentos
// 1 - consulta por ID el modelo padre es Autentificación

exports.getDAid = async (req,res) => {

    try{
        const resultado = await User.aggregate(
            [
                {
                    $lookup: { // unir tablas
                        from: "docentes", //2 - modelo hijo - Docentes
                        localField: "Vilculo",  // campo local de modelo Autentificacion
                        foreignField: "_id", //campo id de modelo Docentes
                        as: "acceso"
                    }
                },
                { $unwind: "$acceso" },
                { $match: { id: req.params._id } }

            ],
        )
       // console.log('*************** Resultados *************', resultado);
       res.send({ resultado });

    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }

}



