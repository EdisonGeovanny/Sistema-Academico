const User = require('./distributivo.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Periodo
exports.createDistributivo = (req, res, next) => {
    const newUser = {
        Docente: req.body.Docente,
        Periodo: req.body.Periodo,
        Nivel: req.body.Nivel,
        Paralelo: req.body.Paralelo,
        Jornada: req.body.Jornada,
        Horas_semanales: req.body.Horas_semanales,
        Area: req.body.Area,
        Asignatura: req.body.Asignatura,
        Horario: req.body.Horario,
        Estado: req.body.Estado
    }

    User.create(newUser, (err, user) => {
        if (err && err.code == 11000) return res.status(409).send('Email already exists');

        if (err) return res.status(500).send('Server error');

        const dataUser = {
           Docente: user.Docente,
            Periodo: user.Periodo,
            Paralelo: user.Paralelo,
            Jornada: user.Jornada,
            Horario: user.Horario,
            Area: user.Area,
            Asignatura: user.Asignatura,
            Estado: user.Estado
        }

        //Response
        res.send(dataUser);
    });
}

//Listar datos de Estudiante 
exports.listDistributivo = (req, res, next) => {

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
exports.deleteDistributivo = async (req, res) => {
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
exports.updateDistributivo = async (req, res) => {
    try {
        const { Docente, Periodo, Nivel, Paralelo, Jornada, Horas_semanales, Area, Asignatura, Horario,
             Estado} = req.body;
        let asig = await User.findById(req.params.id);
        if (!asig) {
            res.status(404).json({ msg: 'No existe el registro' })
        }
        asig.Docente = Docente;
        asig.Periodo = Periodo;
        asig.Nivel = Nivel;
        asig.Paralelo = Paralelo;
        asig.Jornada = Jornada;
        asig.Horas_semanales= Horas_semanales;
        asig.Area= Area;
        asig.Asignatura = Asignatura;
        asig.Horario = Horario;
        asig.Estado = Estado;

        asig = await User.findOneAndUpdate({ _id: req.params.id }, asig, { new: true })
        res.json(asig);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchDocente = async (req, res) => {
    try {
        let dni = await User.find({Docente: req.params.sch});
        if (!dni) {
            res.status(404).json({ msg: 'La busqueda no existe' })
        } res.json(dni);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}

exports.searchExitente= async (req, res) => {
    try {
       const cadena = req.params.sch;
       const x = cadena.split(',');
       
        let dni = await User.find({$and:[{Docente:x[0]},{Periodo:x[1]},{Nivel:x[2]},
            {Paralelo:x[3]},{Jornada:x[4]},{Area:x[5]},{Asignatura:x[6]}]});
        if (!dni) {
            res.status(404).json({ msg: 'La busqueda no existe' })
        } res.json(dni);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchDocentePeriodo = async (req, res) => {
    try {

        const cadena = req.params.sch;
       const x = cadena.split(',');
        let dni = await User.find({$and:[{Docente:x[0]},{Periodo:x[1]}]});
        if (!dni) {
            res.status(404).json({ msg: 'La busqueda no existe' })
        } res.json(dni);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}