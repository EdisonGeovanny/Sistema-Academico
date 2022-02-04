const User = require('./matricula.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Periodo
exports.createMatricula = (req, res, next) => {
    const newUser = {
        Estudiante: req.body.Estudiante,
        Periodo: req.body.Periodo,
        Nivel: req.body.Nivel,
        Paralelo: req.body.Paralelo,
        Jornada: req.body.Jornada,
        Estado: req.body.Estado
    }

    User.create(newUser, (err, user) => {
        if (err && err.code == 11000) return res.status(409).send('Email already exists');

        if (err) return res.status(500).send('Server error');

        const dataUser = {
            Estudiante: user.Estudiante,
            Periodo: user.Periodo,
            Paralelo: user.Paralelo,
            Jornada: user.Jornada,
            Estado: user.Estado
        }

        //Response
        res.send(dataUser);
    });
}

//Listar datos de Estudiante 
exports.listMatricula = (req, res, next) => {

    User.find({}, (err, dni) => {
        if (err) return res.status(500).send('Server error!');
        if (!dni) {
            //email does not exist
            res.status(484).send({ message: 'No existen productos' });
        } else {

            res.send({ dni });

        }
    })
}

//Listar por ID
exports.listID = async (req, res) => {
    try {
        let materia = await User.findById(req.params.id);

        if (!materia) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        res.json(materia);


    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

//delete de registros de docentes
exports.deleteMatricula = async (req, res) => {
    try {
        let materia = await User.findById(req.params.id);

        if (!materia) {
            res.status(404).json({ msg: 'No existe el registro' })
        }
        await User.findByIdAndDelete({ _id: req.params.id })
        res.json({ msg: 'registro eliminado con exito!' });


    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


//update de registros de estudiantes
exports.updateMatricula = async (req, res) => {
    try {
        const { Estudiante, Periodo, Nivel, Paralelo, Jornada, Estado} = req.body;
        let asig = await User.findById(req.params.id);
        if (!asig) {
            res.status(404).json({ msg: 'No existe el registro' })
        }
        asig.Estudiante = Estudiante;
        asig.Periodo = Periodo;
        asig.Nivel = Nivel;
        asig.Paralelo = Paralelo;
        asig.Jornada = Jornada;
        asig.Estado = Estado;

        asig = await User.findOneAndUpdate({ _id: req.params.id }, asig, { new: true })
        res.json(asig);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchEstudiante = async (req, res) => {
    try {
        let dni = await User.find({Estudiante: req.params.sch});
        if (!dni) {
            res.status(404).json({ msg: 'La busqueda no existe' })
        } res.json(dni);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.EstudiantePeriodo = async (req, res) => {
    try {
        const cadena = req.params.sch;
        const x = cadena.split(',');
        let dni = await User.find({$and:[{Estudiante:x[0]},{Periodo:x[1]}]});
        if (dni[0]== null) {
            res.json(false)
        } else{
            res.json(true);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

exports.Grado = async (req, res) => {
    try {
        const cadena = req.params.sch;
        const x = cadena.split(',');
        let dni = await User.find({$and:[{Periodo:x[0]},{Nivel:x[1]},{Paralelo:x[2]},{Jornada:x[3]}]});
        if (dni[0]== null) {
            res.status(404).json({ msg: 'La busqueda no existe' })
        } else{
            res.json(dni);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}
