const User = require('./regda.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SECRET_KEY = 'secretkey1234';



//registrar Docentes y administradores
exports.regDA = (req, res, next) => {
    const newUser = {

        Tipo_documento: req.body.Tipo_documento,
        DNI:req.body.DNI,
        Apellidos:req.body.Apellidos,
        Nombres:req.body.Nombres,
        Genero:req.body.Genero,
        Estado_civil:req.body.Estado_civil,
        Fecha_nacimiento:req.body.Fecha_nacimiento,
        Lugar_nacimiento:req.body.Lugar_nacimiento,
        Nacionalidad:req.body.Nacionalidad,
        Etnia:req.body.Etnia,
        Grupo_sanguineo:req.body.Grupo_sanguineo,
        Telefono:req.body.Telefono,
        Celular:req.body.Celular,
        Email:req.body.Email,
        Observacion_medica:req.body.Observacion_medica,
        Tipo_discapacidad:req.body.Tipo_discapacidad,
        Carnet_discapacidad:req.body.Carnet_discapacidad,
        Porcentaje_discapacidad:req.body.Porcentaje_discapacidad,
        Direccion:req.body.Direccion,
        Sector_domicilio:req.body.Sector_domicilio,
        Referencia_domicilio:req.body.Referencia_domicilio,
        Nombre_emergente:req.body.Nombre_emergente,
        Contacto_emergente:req.body.Contacto_emergente,
        Nivel_educacion:req.body.Nivel_educacion,
        Institucion:req.body.Institucion,
        Lugar_institucion:req.body.Lugar_institucion,
        Tipo_institucion:req.body.Tipo_institucion,
        Especialidad:req.body.Especialidad,
        Fecha_grado:req.body.Fecha_grado,
        Nota_grado:req.body.Nota_grado,
        Otros_titulos:req.body.Otros_titulos,
        Fecha_ingreso_magisterio:req.body.Fecha_ingreso_magisterio,
        Fecha_ingreso_institucion:req.body.Fecha_ingreso_institucion, 
        Años_servicio:req.body.Años_servicio,
        Condicion_laboral:req.body.Condicion_laboral,
        Observacion: req.body.Observacion,
        Estado:req.body.Estado,

    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('Email already exists');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                    Id: user.id,
                    Nombres: user.Nombres,
                    Apellidos: user.Apellidos,
                    Especialidad: user.Especialidad,
                }
        
                //Response
                res.send({dataUser});
            });
}

//Listar datos de docentes paginada (paginate cambiar por find)
exports.listDA = (req, res, next) => {

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

//update de registros de docentes
exports.updateDA  = async (req, res) => {
    try{
        const {  Tipo_documento, DNI, Apellidos, Nombres, Genero, Estado_civil, Fecha_nacimiento,
            Lugar_nacimiento, Nacionalidad, Etnia, Grupo_sanguineo, Telefono, Celular, Email,
            Observacion_medica, Tipo_discapacidad, Carnet_discapacidad, Porcentaje_discapacidad,
            Direccion, Sector_domicilio, Referencia_domicilio,  Nombre_emergente, Contacto_emergente,
            Nivel_educacion, Institucion, Lugar_institucion, Tipo_institucion, Especialidad, 
            Fecha_grado, Nota_grado, Otros_titulos, Fecha_ingreso_magisterio, Fecha_ingreso_institucion,
            Años_servicio, Condicion_laboral, Observacion, Estado} = req.body;
            let profesor = await User.findById(req.params.id);

            if(!profesor) {
                res.status(404).json({msg: 'No existe el producto'})
            } 
            profesor.Tipo_documento = Tipo_documento;
            profesor.DNI = DNI;
            profesor.Nombres = Nombres;
            profesor.Apellidos = Apellidos;
            profesor.Genero = Genero;
            profesor.Estado_civil = Estado_civil;
            profesor.Fecha_nacimiento = Fecha_nacimiento;
            profesor.Lugar_nacimiento = Lugar_nacimiento;
            profesor.Nacionalidad = Nacionalidad;
            profesor.Etnia = Etnia;
            profesor.Grupo_sanguineo = Grupo_sanguineo;
            profesor.Email = Email;
            profesor.Telefono = Telefono;
            profesor.Celular =  Celular;
            profesor.Observacion_medica = Observacion_medica;
            profesor.Tipo_discapacidad = Tipo_discapacidad;
            profesor.Carnet_discapacidad = Carnet_discapacidad;
            profesor.Porcentaje_discapacidad = Porcentaje_discapacidad;
            profesor.Direccion = Direccion;
            profesor.Sector_domicilio = Sector_domicilio;
            profesor.Referencia_domicilio = Referencia_domicilio;
            profesor.Nombre_emergente = Nombre_emergente;
            profesor.Contacto_emergente = Contacto_emergente;
            profesor.Nivel_educacion = Nivel_educacion; 
            profesor.Institucion = Institucion; 
            profesor.Lugar_institucion = Lugar_institucion; 
            profesor.Tipo_institucion = Tipo_institucion;
            profesor.Especialidad = Especialidad; 
            profesor.Fecha_grado = Fecha_grado;
            profesor.Nota_grado = Nota_grado;
            profesor.Otros_titulos = Otros_titulos;
            profesor.Fecha_ingreso_magisterio = Fecha_ingreso_magisterio;
            profesor.Fecha_ingreso_institucion = Fecha_ingreso_institucion;
            profesor.Años_servicio = Años_servicio;
            profesor.Condicion_laboral = Condicion_laboral;
            profesor.Estado = Estado;
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
            let docente = await User.findById(req.params.id);

            if(!docente) {
                res.status(404).json({msg: 'No existe el registro'})
            }

                 res.json(docente);


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



