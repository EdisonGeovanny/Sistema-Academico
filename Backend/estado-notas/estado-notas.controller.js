const User = require('./estado-notas.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Periodo
exports.createEN = (req, res, next)=> {
    const newUser = { 
        Q1: req.body.Q1,
        Q2: req.body.Q2,
        Q1P1: req.body.Q1P1,
        Q1P2: req.body.Q1P2,
        Q1EXAM: req.body.Q1EXAM,
        Q2P1: req.body.Q2P1,
        Q2P2: req.body.Q2P2,
        Q2EXAM: req.body.Q2EXAM
    }

    User.create (newUser, (err,user)=> {
        if( err && err.code == 11000) return res.status(409).send('Email already exists');
        
            if (err) return res.status(500).send('Server error');

                const dataUser = {
                    Q1: user.Q1,
                    Q2: user.Q2,
                    Q1P1: user.Q1P1,
                    Q1P2: user.Q1P2,
                    Q1EXAM: user.Q1EXAM,
                    Q2P1: user.Q2P1,
                    Q2P2:  user.Q2P2,
                    Q2EXAM: user.Q2EXAM,  
                }
        
                //Response
                res.send(dataUser);
            });
}

//Listar datos de Estudiante 
exports.listEN = (req, res, next) => {

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


//delete de registros de docentes
exports.deleteEN = async (req, res) => {
    try{
        let en = await User.findById(req.params.id);

        if(!en) {
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
exports.updateEN  = async (req, res) => {
    try{
        const { Q1, Q2,  Q1P1, Q1P2, Q1EXAM, Q2P1, Q2P2, Q2EXAM} = req.body;
            let en = await User.findById(req.params.id);
         if(!en) {
                res.status(404).json({msg: 'No existe el registro'})
            } 
            en.Q1 = Q1;
            en.Q2 = Q2;
            en.Q1P1 = Q1P1;
            en.Q1P2 = Q1P2;
            en.Q2P1 = Q2P1;
            en.Q2P2 = Q2P2;
            en.Q1EXAM = Q1EXAM;
            en.Q2EXAM = Q2EXAM;

            en = await User.findOneAndUpdate({_id: req.params.id}, en, {new:true})
            res.json(en);

    }catch(err){
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

