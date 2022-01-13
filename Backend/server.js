'use strict'
const cors = require('cors');

//si funcionan//
const estudiante = require('./estudiante/reg-est.routes'); //Estudiante
const representante = require('./representante/reg-rep.routes') //Representante
const login = require('./autentificacion/login.routes'); // autentificacion
const docente = require('./docentes/regda.routes'); // Registrar Docente/Administrador
const ficha = require('./ficha-estudiantil/reg-ficha.routes'); // Registrar Ficha estudiantil
const periodo = require('./periodo-lectivo/periodo.routes'); // Año Lectivo
const grado = require('./grado/grado.routes'); //  grado
const nivel = require('./nivel/nivel.routes'); // nivel
const paralelo = require('./paralelo/paralelo.routes'); // paralelo
const materia = require('./materia/materia.routes'); // Materia
const nivel_materia = require('./nivel-materia/nivel-materia.routes'); // Nivel y Materia


const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');

DB(); // init Base de Datos
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(cors()); // api abierta a toda peticion -- se puede limitar -- ver documentacion

app.use('/api', router);
estudiante(router); //estudiante
login(router); //Autentificacion
docente(router); // registrar Docente/administrador
representante(router); //Representante
ficha(router); //Ficha-Estudiantil
periodo(router); //periodo
grado(router); // grado
nivel(router); // nivel
paralelo(router); // paralelo
materia(router); // Materia
nivel_materia(router) //nivel-materia

router.get('/', (req, res)=>{
    res.send('Bienvenido');
});

app.use(router);
app.listen(propierties.PORT, () => console.log(`El servidor esta corriendo en el puerto ${propierties.PORT}`));

