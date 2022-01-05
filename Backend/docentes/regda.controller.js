const User = require('./regda.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SECRET_KEY = 'secretkey1234';



//registrar Docentes y administradores
exports.regDA = (req, res, next) => {
    const newUser = {
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
        Estado: req.body.Estado,
        Genero: req.body.Genero,
        Observacion: req.body.Observacion,
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('Email already exists');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                    Id: user.id,
                    Nombres: user.Nombres,
                   Apellidos: user.Apellidos,
                    Titulo_profesional: user.Titulo_profesional
                }
        
                //Response
                res.send({dataUser});
            });
}

//Listar datos de docentes paginada (paginate cambiar por find)
exports.listDA = (req, res, next) => {

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

//update de registros de docentes
exports.updateDA  = async (req, res) => {
    try{
        const { DNI, Nombres, Apellidos, Fecha_ingreso_magisterio, Fecha_ingreso_institucion,
            Titulo_profesional, Años_servicio, Condicion_laboral, Fecha_nacimiento, Direccion,
            Email, Telefono, Celular, Estado, Genero, Observacion} = req.body;
            let profesor = await User.findById(req.params.id);

            if(!profesor) {
                res.status(404).json({msg: 'No existe el producto'})
            } 
            profesor.DNI = DNI;
            profesor.Nombres = Nombres;
            profesor.Apellidos = Apellidos;
            profesor.Fecha_ingreso_magisterio = Fecha_ingreso_magisterio;
            profesor.Fecha_ingreso_institucion = Fecha_ingreso_institucion;
            profesor.Titulo_profesional = Titulo_profesional;
            profesor.Años_servicio = Años_servicio;
            profesor.Condicion_laboral = Condicion_laboral;
            profesor.Fecha_nacimiento = Fecha_nacimiento;
            profesor.Direccion = Direccion;
            profesor.Email = Email;
            profesor.Telefono = Telefono;
            profesor.Celular =  Celular;
            profesor.Estado = Estado;
            profesor.Genero = Genero;
            profesor.Observacion = Observacion;

            profesor = await User.findOneAndUpdate({_id: req.params.id}, profesor, {new:true})
            res.json(profesor);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete de registros de docentes
exports.deleteDA = async (req, res) => {
    try{
        let profesor = await User.findById(req.params.id);

        if(!profesor) {
            res.status(404).json({msg: 'No existe el producto'})
        }
        await User.findByIdAndDelete({_id: req.params.id})
        res.json({msg:'producto eliminado con exito!'});


}catch(err){
    console.log(err);
    res.status(500).send('Hubo un error')

}
}

//Listar por ID
exports.listID = async (req, res) => {
    try{
            let profesor = await User.findById(req.params.id);

            if(!profesor) {
                res.status(404).json({msg: 'No existe el producto'})
            }

                 res.json(profesor);


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



