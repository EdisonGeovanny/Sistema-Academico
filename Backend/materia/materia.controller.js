const User = require('./materia.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey1234';

//crear Periodo
exports.createMateria = (req, res, next) => {
    const newUser = {
        Asignatura: req.body.Asignatura,
        Area: req.body.Area
    }

    User.create(newUser, (err, user) => {
        if (err && err.code == 11000) return res.status(409).send('Email already exists');

        if (err) return res.status(500).send('Server error');

        const dataUser = {
            Asignatura: user.Asignatura,
            Area: user.Area
        }

        //Response
        res.send(dataUser);
    });
}

//Listar datos de Estudiante 
exports.listMateria = (req, res, next) => {

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
exports.deleteMateria = async (req, res) => {
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
exports.updateMateria = async (req, res) => {
    try {
        const { Asignatura, Area } = req.body;
        let asig = await User.findById(req.params.id);
        if (!asig) {
            res.status(404).json({ msg: 'No existe el registro' })
        }
        asig.Asignatura = Asignatura;
        asig.Area = Area;

        asig = await User.findOneAndUpdate({ _id: req.params.id }, asig, { new: true })
        res.json(asig);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}


exports.searchMateria = async (req, res) => {
    try {
        let dni = await User.find({Area: req.params.sch });
        if (!dni) {
            res.status(404).json({ msg: 'La busqueda no existe' })
        } res.json({ dni });

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error')

    }
}
