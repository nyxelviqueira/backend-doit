/* - POST [/users/login] - Login de usuario (devuelve token). */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const selectUserByEmailQuery = require('../../db/userQueries/selectUserByEmailQuery');
const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if(!email || !password) {
            throw generateError(`Missing fields`, 400);
        }

        const user = await selectUserByEmailQuery(email);

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw generateError(`Invalid password`, 401);
        }

        const payload = {
            id: user.id
        };

        //Generamos el token 
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '10d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
        
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;

