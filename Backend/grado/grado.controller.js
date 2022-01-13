const User = require('./grado.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Periodo
exports.createGrado = (req, res, next)=> {
    const newUser = { 
        Jornada:req.body.Jornada,
        Nivel:req.body.Nivel,
        Paralelo:req.body.Paralelo
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('Email already exists');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                    Jornada: user.Jornada,
                  Nivel: user.Nivel,
                  Paralelo: user.Paralelo
                }
        
                //Response
                res.send(dataUser);
            });
}

//Listar datos de Estudiante 
exports.listGrado = (req, res, next) => {

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
            let grado = await User.findById(req.params.id);

            if(!grado) {
                res.status(404).json({msg: 'No existe el producto'})
            }
                 res.json(grado);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete de registros de docentes
exports.deleteGrado = async (req, res) => {
    try{
        let grado = await User.findById(req.params.id);

        if(!grado) {
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
exports.updateGrado  = async (req, res) => {
    try{
        const { Jornada, Paralelo, Nivel} = req.body;
            let grado = await User.findById(req.params.id);
         if(!grado) {
                res.status(404).json({msg: 'No existe el registro'})
            } 
            grado.Jornada = Jornada;
            grado.Paralelo = Paralelo;
            grado.Nivel = Nivel;

            grado = await User.findOneAndUpdate({_id: req.params.id}, grado, {new:true})
            res.json(grado);

    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchJornada = async (req, res) => {
    try{
        let dni = await User.find({Jornada:req.params.sch});
        if(!dni){
                    res.status(404).json({msg: 'La busqueda no existe'})
        } res.json({dni});
            
    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}
