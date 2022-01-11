const User = require('./reg-ficha.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SECRET_KEY = 'secretkey1234';



//registrar Ficha-Estiduantil
exports.regFicha = (req, res, next) => {
    const newUser = {
        Estudiante: req.body.Estudiante,
        Representante: req.body.Representante,
        Nombre_madre: req.body.Nombre_madre,
        Nombre_padre: req.body.Nombre_padre,
        Convive: req.body.Convive,      
        Numero_hermanos: req.body.Numero_hermanos,
        Nombre_hermanos: req.body.Nombre_hermanos,
        Numero_en_institucion: req.body.Numero_en_institucion,
        En_institucion: req.body.En_institucion,
        Tipo_vivienda: req.body.Tipo_vivienda,
        Material_vivienda: req.body.Material_vivienda,
        Servicios_basicos: req.body.Servicios_basicos,
        Propiedades: req.body.Propiedades,
        Nombre_emergente: req.body.Nombre_emergente,
        Contacto_emergente: req.body.Contacto_emergente,
        Observacion: req.body.Observacion,
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('El registro ya existe');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                    Id: user.id,
                    Nombre_padre: user.Nombre_padre,
                    Nombre_madre: user.Nombre_madre,
                    Convive : user.Convive
                }
        
                //Response
                res.send({dataUser});
            });
}

//Listar datos de Ficha-Estudiantil por paginada (paginate cambiar por find)
exports.listFicha = (req, res, next) => {

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

//update de registros de Ficha-Estiduantil
exports.updateFicha  = async (req, res) => {
    try{
        const { Estudiante, Representante, Nombre_madre, Nombre_padre,
            Convive, Numero_hermanos, Nombre_hermanos, Numero_en_institucion,
            En_institucion, Tipo_vivienda, Material_vivienda,
            Servicios_basicos, Propiedades, Nombre_emergente, Contacto_emergente,
            Observacion} = req.body;
            let ficha = await User.findById(req.params.id);

            if(!ficha) {
                res.status(404).json({msg: 'No existe el registro'})
            } 
            ficha.Estudiante = Estudiante;
            ficha.Representante = Representante;
            ficha.Nombre_madre = Nombre_madre;
            ficha.Nombre_padre = Nombre_padre;
            ficha.Convive = Convive;
            ficha.Numero_hermanos = Numero_hermanos;
            ficha.Nombre_hermanos = Nombre_hermanos;
            ficha.Numero_en_institucion = Numero_en_institucion;
            ficha.En_institucion = En_institucion;
            ficha.Tipo_vivienda = Tipo_vivienda;
            ficha.Material_vivienda = Material_vivienda;
            ficha.Servicios_basicos = Servicios_basicos;
            ficha.Propiedades = Propiedades;
            ficha.Nombre_emergente = Nombre_emergente;
            ficha.Contacto_emergente = Contacto_emergente;
            ficha.Observacion = Observacion;

           ficha = await User.findOneAndUpdate({_id: req.params.id}, ficha, {new:true})
            res.json(ficha);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete de registros de Ficha-Estiduantil
exports.deleteFicha = async (req, res) => {
    try{
        let ficha = await User.findById(req.params.id);

        if(!ficha) {
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
            let ficha = await User.findById(req.params.id);

            if(!ficha) {
                res.status(404).json({msg: 'No existe el registro'})
            }

                 res.json(ficha);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//Search - buscador  OBSERVAR DETENIDAMENTE EL FORMATO DE BUSQUEDA
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





