const User = require('./nivel.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Nivel
exports.createNivel = (req, res, next)=> {
    const newUser = { 
        Nivel:req.body.Nivel
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('Email already exists');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                  Nivel: user.Nivel
                }
        
                //Response
                res.send(dataUser);
            });
}

//Listar datos de nivel
exports.listNivel = (req, res, next) => {

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
            let nivel = await User.findById(req.params.id);

            if(!nivel) {
                res.status(404).json({msg: 'No existe el producto'})
            }
                 res.json(nivel);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete nivel
exports.deleteNivel = async (req, res) => {
    try{
        let nivel = await User.findById(req.params.id);

        if(!nivel) {
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
exports.updateNivel  = async (req, res) => {
    try{
        const {Nivel} = req.body;
            let nivel = await User.findById(req.params.id);
         if(!nivel) {
                res.status(404).json({msg: 'No existe el registro'})
            } 
            nivel.Nivel = Nivel;

            nivel = await User.findOneAndUpdate({_id: req.params.id}, nivel, {new:true})
            res.json(nivel);

    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchNivel = async (req, res) => {
    try{
        let dni = await User.find({Nivel:req.params.sch});
        if(!dni){
                    res.status(404).json({msg: 'La busqueda no existe'})
        } res.json({dni});
            
    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}
