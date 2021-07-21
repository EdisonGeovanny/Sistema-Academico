'use strict'
const cors = require('cors');
const authRoutes = require('./authAdmin/auth.routes'); //Admin
const authRoutesp = require('./authProf/auth.routes'); //Profesor
const authRoutese = require('./authEst/auth.routes'); //Estudiante

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
authRoutes(router); //admin
authRoutesp(router);//profesor
authRoutese(router); //estudiante

router.get('/', (req, res)=>{
    res.send('Bienvenido');
});
app.use(router);
app.listen(propierties.PORT, () => console.log(`El servidor esta corriendo en el puerto ${propierties.PORT}`));



