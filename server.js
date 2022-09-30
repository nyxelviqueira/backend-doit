//Esto siempre al principio
//El método config localiza el fichero .env que hayamos creado en la raíz del proyecto y pone disponibles las variables que figuren en el fichero
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');
const cors = require('cors');
// chalk pone colorinchos en la consola
const chalk = require('chalk');

const { PORT, UPLOADS_DIR } = process.env
const app = express();

app.use(cors());


// Middleware que hace uso del logger "morgan".
app.use(morgan('dev'));

// Middleware que deserializa un body con formato "raw" y lo pone disponible en "req.body".
app.use(express.json());


// Middleware que deserializa un body con formato "form-data".
app.use(fileUpload());

// Indicamos cual es el directorio de los ficheros estáticos.
app.use(express.static(UPLOADS_DIR));




/**
 * #################
 * ## Middlewares ##
 * #################
 */
const authUser = require('./Middlewares/authUser');
const authUserOptional = require('./Middlewares/authUserOptional');


/**
 * ######################
 * ## Endpoints Users ##
 * ######################
 */
const { newUser, loginUser, getOwnUser, editUser, getProfile } = require('./controllers/users');

// Registro de usuario
app.post('/register', newUser);

// Login de usuario
app.post('/login', loginUser);

// Info de un usuario loguedo
app.get('/users', authUser, getOwnUser);

// Visitar perfil de otro usuario
app.get('/users/:idUser', authUserOptional, getProfile);

// Editar un usuario
app.put('/users', authUser, editUser);

/**
 * ########################
 * ## Endpoints Services ##
 * ########################
 */
const { newService, listServices, getService, replyService, editService } = require('./controllers/services');

// Registro de un nuevo servicio.
app.post('/newservice', authUser, newService);

// Listar Servicios
app.get('/services', authUserOptional, listServices);

// Info un servicio en concreto
app.get('/services/:idService', authUserOptional, getService);

// Comentar un servicio 
app.post('/services/:idService', authUser, replyService);

// Editar un servicico
app.put('/services/:idService', authUser, editService);

/**
 * ########################
 * ## Endpoints Replies ##
 * ########################
 */

// Listar las respuestas
const { getReplies } = require('./controllers/replies');

app.get('/replies/:idService', authUserOptional, getReplies);


/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found!',
    });
});


//Vamos a lanzar el servidor
app.listen(PORT, () => {
    console.log(chalk.yellow(`Server listening at http://localhost:${PORT}`));
});



