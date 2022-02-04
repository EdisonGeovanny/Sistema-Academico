const User = require('./notas.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Nivel
exports.createNota = (req, res, next) => {
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
        Q1P1: req.body.Q1P1,
        Q1P2: req.body.Q1P2,
        Q1EXAM: req.body.Q1EXAM,
        Q2P1: req.body.Q2P1,
        Q2P2: req.body.Q2P2,
        Q2EXAM: req.body.Q2EXAM,
        COM_Q1_P1: req.body.COM_Q1_P1,
        COM_Q1_P2: req.body.COM_Q1_P2,
        COM_Q1: req.body.COM_Q1,
        COM_Q2_P1: req.body.COM_Q2_P1,
        COM_Q2_P2: req.body.COM_Q2_P2,
        COM_Q2: req.body.COM_Q2,
        PRO_Q1_P1: req.body.PRO_Q1_P1,
        PRO_Q1_P2: req.body.PRO_Q1_P2,
        PRO_Q2_P1: req.body.PRO_Q2_P1,
        PRO_Q2_P2: req.body.PRO_Q2_P2,
        Dias_asistidos: req.body.Dias_asistidos,
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
exports.listNota = (req, res, next) => {

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
exports.updateNota = async (req, res) => {
    try {
        const { Matricula, Estudiante, Distributivo, Docente, Periodo, Nivel, Paralelo, Jornada,
            Area, Asignatura, Q1P1, Q1P2, Q1EXAM, Q2P1, Q2P2, Q2EXAM, COM_Q1_P1, COM_Q1_P2,
            COM_Q1, COM_Q2_P1, COM_Q2_P2, COM_Q2, PRO_Q1_P1, PRO_Q1_P2, PRO_Q2_P1, PRO_Q2_P2,
            Dias_asistidos, Faltas_injustificadas, Faltas_justificadas, Observacion } = req.body;

        let par = await User.findById(req.params.id);
        if (!par) {
            res.status(404).json({ msg: 'No existe el registro' })
        } else {
            par.Q1P1 = Q1P1;
            par.Q1P2 = Q1P2;
            par.Q1EXAM = Q1EXAM;
            par.Q2P1 = Q2P1;
            par.Q2P2 = Q2P2;
            par.Q2EXAM = Q2EXAM;
            par.COM_Q1_P1 = COM_Q1_P1;
            par.COM_Q1_P2 = COM_Q1_P2;
            par.COM_Q1 = COM_Q1;
            par.COM_Q2_P1 = COM_Q2_P1;
            par.COM_Q2_P2 = COM_Q2_P2;
            par.COM_Q2 = COM_Q2;
            par.PRO_Q1_P1 = PRO_Q1_P1;
            par.PRO_Q1_P2 = PRO_Q1_P2;
            par.PRO_Q2_P1 = PRO_Q2_P1;
            par.PRO_Q2_P2 = PRO_Q2_P2;
            par.Dias_asistidos = Dias_asistidos;
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


exports.searchNota = async (req, res) => {
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
