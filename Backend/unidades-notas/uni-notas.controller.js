const User = require('./uni-notas.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Nivel
exports.createUnidad = (req, res, next) => {
    const newUser = {
        Matricula: req.body.Matricula,
        Estudiante: req.body.Estudiante,
        Distributivo: req.body.Distributivo,
        Docente: req.body.Docente,
        Periodo: req.body.Periodo,
        Nivel: req.body.Nivel,
        Paralelo: req.body.Paralelo,
        Jornada: req.body.Jornada,
        Area: req.body.Area,
        Asignatura: req.body.Asignatura,

        Fecha: req.body.Fecha,
        Quimestre: req.body.Quimestre,
        Unidad: req.body.Unidad,

        C1Tareas: req.body.C1Tareas,
        C1Lecciones: req.body.C1Lecciones,
        C1Ensayo: req.body.C1Ensayo,
        C1Informes: req.body.C1Informes,
        C1Promedio: req.body.C1Promedio,

        C2Tareas: req.body.C1Tareas,
        C2Lecciones: req.body.C1Lecciones,
        C2Ensayo: req.body.C1Ensayo,
        C2Informes: req.body.C1Informes,
        C2Promedio: req.body.C1Promedio,

        C3Tareas: req.body.C1Tareas,
        C3Lecciones: req.body.C1Lecciones,
        C3Ensayo: req.body.C1Ensayo,
        C3Informes: req.body.C1Informes,
        C3Promedio: req.body.C1Promedio,

        C4Tareas: req.body.C1Tareas,
        C4Lecciones: req.body.C1Lecciones,
        C4Ensayo: req.body.C1Ensayo,
        C4Informes: req.body.C1Informes,
        C4Promedio: req.body.C1Promedio,

        Refuerzo: req.body.Refuerzo,

        Sumatoria: req.body.Sumatoria,
        NotaParcial: req.body.NotaParcial,

        Faltas_injustificadas: req.body.Faltas_injustificadas,
        Faltas_justificadas: req.body.Faltas_justificadas,
        Observacion: req.body.Observacion
    }

    User.create(newUser, (err, user) => {
        if (err && err.code == 11000) return res.status(409).send('Email already exists');

        if (err) return res.status(500).send('Server error');

        res.send(user);
    });
}

//Listar datos de nivel
exports.listUnidad = (req, res, next) => {

    User.find({}, (err, dni) => {
        if (err) return res.status(500).send('Server error!');
        if (!dni) {
            //email does not exist
            res.status(484).send({ message: 'No existen registro' });
        } else {

            res.send({ dni });

        }
    })
}

//Listar por ID
exports.listID = async (req, res) => {
    try {
        let par = await User.findById(req.params.id);

        if (!par) {
            res.status(404).json({ msg: 'No existe el registro' })
        }
        res.json(par);


    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


//update de registros de estudiantes
exports.updateUnidad = async (req, res) => {
    try {
        const { Matricula, Estudiante, Distributivo, Docente, Periodo, Nivel, Paralelo, Jornada,
            Area, Asignatura,  
            Fecha, Quimestre, Unidad,

            C1Tareas, C1Lecciones, C1Ensayo, C1Informes, C1Promedio,
            C2Tareas, C2Lecciones, C2Ensayo, C2Informes, C2Promedio,
            C3Tareas, C3Lecciones, C3Ensayo, C3Informes, C3Promedio,
            C4Tareas, C4Lecciones, C4Ensayo, C4Informes, C4Promedio,
            Refuerzo, Sumatoria, NotaParcial, Faltas_injustificadas, Faltas_justificadas, Observacion
        } = req.body;

        let par = await User.findById(req.params.id);
        if (!par) {
            res.status(404).json({ msg: 'No existe el registro' })
        } else {
            par.C1Tareas = C1Tareas;
            par.C1Lecciones = C1Lecciones;
            par.C1Ensayo = C1Ensayo;
            par.C1Informes = C1Informes;
            par.C1Promedio = C1Promedio;

            par.C2Tareas = C2Tareas;
            par.C2Lecciones = C2Lecciones;
            par.C2Ensayo = C2Ensayo;
            par.C2Informes = C2Informes;
            par.C2Promedio = C2Promedio;

            par.C3Tareas = C3Tareas;
            par.C3Lecciones = C3Lecciones;
            par.C3Ensayo = C3Ensayo;
            par.C3Informes = C3Informes;
            par.C3Promedio = C3Promedio;

            par.C4Tareas = C4Tareas;
            par.C4Lecciones = C4Lecciones;
            par.C4Ensayo = C4Ensayo;
            par.C4Informes = C4Informes;
            par.C4Promedio = C4Promedio;

            par.Refuerzo = Refuerzo;
            par.Sumatoria = Sumatoria;
            par.NotaParcial = NotaParcial;

            par.Faltas_justificadas = Faltas_justificadas;
            par.Faltas_injustificadas = Faltas_injustificadas;
            par.Observacion = Observacion;
        }

        par = await User.findOneAndUpdate({ _id: req.params.id }, par, { new: true })
        res.json(par);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchUnidad = async (req, res) => {
    try {
        const cadena = req.params.sch;
        const x = cadena.split(',');


        let dni = await User.find({ $and: [{ Periodo: x[0] }, { Matricula: x[1] }, { Distributivo: x[2] }, { Asignatura: x[3] }] });
        if (!dni) {
            res.status(404).json({ msg: 'La busqueda no existe' })
        } else {
            res.json(dni);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.UnidadAlumno = async (req, res) => {
    try {
        const cadena = req.params.sch;
        const x = cadena.split(',');


        let dni = await User.find({ $and: [{ Periodo: x[0] }, { Estudiante: x[1]}] });
        if (!dni) {
            res.status(404).json({ msg: 'La busqueda no existe' })
        } else {
            res.json(dni);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}
