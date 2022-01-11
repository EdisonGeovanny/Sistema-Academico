const User = require('./reg-rep.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SECRET_KEY = 'secretkey1234';



//registrar Representante
exports.regRep = (req, res, next) => {
    const newUser = {
        Parentesco: req.body.Parentesco,
        Tipo_documento: req.body.Tipo_documento,
        DNI: req.body.DNI,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Genero: req.body.Genero,
        Estado_civil: req.body.Estado_civil,
        Fecha_nacimiento: req.body.Fecha_nacimiento,
        Lugar_nacimiento: req.body.Lugar_nacimiento,
        Nacionalidad: req.body.Nacionalidad,
        Etnia: req.body.Etnia,
        Grupo_sanguineo: req.body.Grupo_sanguineo,
        Nivel_educacion: req.body.Nivel_educacion,
        Actividad: req.body.Actividad,
        Area: req.body.Area,
        Observacion_medica: req.body.Observacion_medica,
        Tipo_discapacidad: req.body.Tipo_discapacidad,
        Carnet_discapacidad :req.body.Carnet_discapacidad,
        Porcentaje_discapacidad: req.body.Porcentaje_discapacidad,
        Direccion: req.body.Direccion,
        Sector_domicilio: req.body.Sector_domicilio,
        Referencia_domicilio: req.body.Referencia_domicilio,
        Email: req.body.Email,
        Telefono: req.body.Telefono,
        Celular: req.body.Celular,
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
                    Actividad: user.Actividad,
                }
        
                //Response
                res.send({dataUser});
            });
}

//Listar datos de Estudiantes por paginada (paginate cambiar por find)
exports.listRep = (req, res, next) => {

    User.find({}, (err, dni)=>{
        if (err) return res. status(500).send('Server error!');
        if(!dni) {
            //email does not exist
            res.status(484).send({ message: 'No existen productos'});
        }else {
            
                res.send({dni});
            
        }
    })
}

//update de registros de representantes
exports.updateRep  = async (req, res) => {
    try{
        const { Parentesco, Tipo_documento, DNI,  Apellidos, Nombres, Genero, Estado_civil, Fecha_nacimiento,
            Lugar_nacimiento, Nacionalidad,  Etnia, Grupo_sanguineo, Nivel_educacion, Actividad,
            Area, Observacion_medica, Tipo_discapacidad, Carnet_discapacidad, Porcentaje_discapacidad,
            Direccion, Sector_domicilio, Referencia_domicilio, Telefono, Celular,
            Email, Observacion} = req.body;
            let representante = await User.findById(req.params.id);

            if(!representante) {
                res.status(404).json({msg: 'No existe el producto'})
            } 

            representante.Parentesco = Parentesco;
            representante.Tipo_documento= Tipo_documento;
            representante.DNI = DNI;
            representante.Nombres = Nombres;
            representante.Apellidos = Apellidos;
            representante.Genero = Genero;
            representante.Estado_civil = Estado_civil;
            representante.Fecha_nacimiento = Fecha_nacimiento;
            representante.Lugar_nacimiento= Lugar_nacimiento;
            representante.Nacionalidad= Nacionalidad;
            representante.Etnia= Etnia;
            representante.Grupo_sanguineo= Grupo_sanguineo;
            representante.Nivel_educacion= Nivel_educacion;
            representante.Actividad= Actividad;
            representante.Area= Area;
            representante.Observacion_medica= Observacion_medica;
            representante.Tipo_discapacidad= Tipo_discapacidad;
            representante.Carnet_discapacidad= Carnet_discapacidad;
            representante.Porcentaje_discapacidad= Porcentaje_discapacidad;
            representante.Direccion = Direccion;
            representante.Sector_domicilio= Sector_domicilio;
            representante.Referencia_domicilio= Referencia_domicilio;
            representante.Email = Email;
            representante.Telefono = Telefono;
            representante.Celular =  Celular; 
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



