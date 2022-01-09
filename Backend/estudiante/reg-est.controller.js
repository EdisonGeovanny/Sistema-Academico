const User = require('./reg-est.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Estudiante
exports.createEst = (req, res, next)=> {
    const newUser = { 
        Codigo: req.body.Codigo,
        Tipo_documento: req.body.Tipo_documento,
        DNI: req.body.DNI,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Genero: req.body.Genero,
        Estado_civil: req.body.Estado_civil,
        Fecha_nacimiento: req.body.Fecha_nacimiento,
        Lugar_nacimiento:req.body.Lugar_nacimiento,
        Nacionalidad:req.body.Nacionalidad,
        Etnia:req.body.Etnia,
        Grupo_sanguineo:req.body.Grupo_sanguineo,
        Observacion_medica:req.body.Observacion_medica,
        Tipo_discapacidad:req.body.Tipo_discapacidad,
        Carnet_discapacidad:req.body.Carnet_discapacidad,
        Porcentaje_discapacidad:req.body.Porcentaje_discapacidad,
        Direccion: req.body.Direccion,
        Sector_domicilio:req.body.Sector_domicilio,
        Referencia_domicilio:req.body.Referencia_domicilio,
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
        const { Codigo, Tipo_documento,  DNI, Apellidos,  Nombres, Genero, Estado_civil,
            Fecha_nacimiento, Lugar_nacimiento, Nacionalidad, Etnia, Grupo_sanguineo,
            Observacion_medica, Tipo_discapacidad, Carnet_discapacidad, Porcentaje_discapacidad,
            Direccion, Sector_domicilio, Referencia_domicilio,
            Estado, Observacion} = req.body;
            let estudiante = await User.findById(req.params.id);

            if(!estudiante) {
                res.status(404).json({msg: 'No existe el registro'})
            } 
            estudiante.Tipo_documento = Tipo_documento;
            estudiante.Codigo = Codigo;
            estudiante.DNI = DNI;
            estudiante.Nombres = Nombres;
            estudiante.Apellidos = Apellidos;
            estudiante.Genero = Genero;
            estudiante.Estado_civil = Estado_civil;
            estudiante.Fecha_nacimiento = Fecha_nacimiento;
            estudiante.Lugar_nacimiento = Lugar_nacimiento;
            estudiante.Nacionalidad = Nacionalidad;
            estudiante.Etnia = Etnia;
            estudiante.Grupo_sanguineo = Grupo_sanguineo;
            estudiante.Observacion_medica = Observacion_medica;
            estudiante.Tipo_discapacidad = Tipo_discapacidad;
            estudiante.Carnet_discapacidad = Carnet_discapacidad;
            estudiante.Porcentaje_discapacidad = Porcentaje_discapacidad;
            estudiante.Direccion = Direccion;
            estudiante.Sector_domicilio = Sector_domicilio;
            estudiante.Referencia_domicilio = Referencia_domicilio;
            estudiante.Estado = Estado;
            
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

