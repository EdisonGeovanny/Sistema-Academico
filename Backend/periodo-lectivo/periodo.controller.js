const User = require('./periodo.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Periodo
exports.createPeriodo = (req, res, next)=> {
    const newUser = { 
          Codigo:req.body.Codigo,
          Descripcion:req.body.Descripcion,
          Fecha_inicio:req.body.Fecha_inicio,
          Fecha_fin:req.body.Fecha_fin,
          Nota_maxima:req.body.Nota_maxima,
          Nota_base:req.body.Nota_base,
          Faltas_maximas:req.body.Faltas_maximas,
          Numero_alumnos:req.body.Numero_alumnos,
          Estado: req.body.Estado
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('Email already exists');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                    Codigo: user.Codigo,
                   Descripcion: user.Descripcion
                }
        
                //Response
                res.send({dataUser});
            });
}

//Listar datos de Estudiante 
exports.listPeriodo = (req, res, next) => {

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

//Listar por ID
exports.listID = async (req, res) => {
    try{
            let periodo = await User.findById(req.params.id);

            if(!periodo) {
                res.status(404).json({msg: 'No existe el producto'})
            }
                 res.json(periodo);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete de registros de docentes
exports.deletePeriodo = async (req, res) => {
    try{
        let periodo = await User.findById(req.params.id);

        if(!periodo) {
            res.status(404).json({msg: 'No existe el registro'})
        }
        await User.findByIdAndDelete({_id: req.params.id})
        res.json({msg:'registro eliminado con exito!'});


}catch(err){
    console.log(err);
    res.status(500).send('Hubo un error')

}
}


//update de registros de estudiantes
exports.updatePeriodo  = async (req, res) => {
    try{
        const { Codigo, Descripcion, Fecha_inicio, Fecha_fin,Nota_maxima, Nota_base,
            Faltas_maximas, Numero_alumnos, Estado} = req.body;
            let periodo = await User.findById(req.params.id);

            if(!periodo) {
                res.status(404).json({msg: 'No existe el registro'})
            } 
            periodo.Codigo = Codigo;
            periodo.Descripcion = Descripcion;
            periodo.Fecha_inicio = Fecha_inicio;
            periodo.Fecha_fin= Fecha_fin;
            periodo.Nota_maxima = Nota_maxima;
            periodo.Nota_base = Nota_base;
            periodo.Faltas_maximas = Faltas_maximas;
            periodo.Numero_alumnos = Numero_alumnos;
            periodo.Estado = Estado

            periodo = await User.findOneAndUpdate({_id: req.params.id}, periodo, {new:true})
            res.json(periodo);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchCodigo = async (req, res) => {
    try{
        let dni = await User.find({Codigo:req.params.sch});
        if(!dni){
                    res.status(404).json({msg: 'La busqueda no existe'})
        } res.json({dni});
            
    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}
