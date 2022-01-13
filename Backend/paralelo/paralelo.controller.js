const User = require('./paralelo.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Nivel
exports.createParalelo = (req, res, next)=> {
    const newUser = { 
        Paralelo:req.body.Paralelo
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('Email already exists');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                  Paralelo: user.Paralelo
                }
        
                //Response
                res.send(dataUser);
            });
}

//Listar datos de nivel
exports.listParalelo = (req, res, next) => {

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
            let par = await User.findById(req.params.id);

            if(!par) {
                res.status(404).json({msg: 'No existe el producto'})
            }
                 res.json(par);


    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete nivel
exports.deleteParalelo = async (req, res) => {
    try{
        let par = await User.findById(req.params.id);

        if(!par) {
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
exports.updateParalelo  = async (req, res) => {
    try{
        const {Paralelo} = req.body;
            let par = await User.findById(req.params.id);
         if(!par) {
                res.status(404).json({msg: 'No existe el registro'})
            } 
            par.Paralelo = Paralelo;

            par = await User.findOneAndUpdate({_id: req.params.id}, par, {new:true})
            res.json(par);

    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchParalelo = async (req, res) => {
    try{
        let dni = await User.find({Paralelo:req.params.sch});
        if(!dni){
                    res.status(404).json({msg: 'La busqueda no existe'})
        } res.json({dni});
            
    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}
