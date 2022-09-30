

const insertUserQuery = require('../../db/userQueries/insertUserQuery');

const { validateSchema } = require('../../helpers');
const userSchema = require('../../schema');



const newUser = async (req, res, next) => {

    try {
        // Obtenemos los campos del body
        const { username, email, password } = req.body;


        // Validamos los datos del body con el schema de Joi
        await validateSchema(userSchema, req.body);

       /*  // Si falta algun campo lanzamos un error 
        if(!username || !email || !password) {
            throw generateError(`missing fields`, 400);
        } */

        // Insertamos un nuevo usuario en la base de datos
        await insertUserQuery(username, email, password);

        res.send({
            status: 'ok',
            message: 'Created User'
        })
        
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;