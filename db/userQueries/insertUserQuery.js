const getConnection = require('../getConnection');
const bcrypt = require('bcrypt');

const { generateError } = require('../../helpers');
const chalk = require('chalk');


const insertUserQuery = async (username, email, password) => {
    let connection;

    try {
        connection = await getConnection();

        // Obtenemos un array de usuarios en base al username establecido.
        const [usernameUsers] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        // Si existe algún usuario con ese nombre de usuario lanzamos un error.
        if (usernameUsers.length > 0) {
            throw generateError(
                'Username already exists at/in database',
                403
            );
        }

        // Obtenemos un array de usuarios en base al email o al nombre de usuario establecido.
        const [emailUsers] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        // Si existe algún usuario con ese email lanzamos un error.
        if (emailUsers.length > 0) {
            throw generateError(
                'Email already exists in/at database',
                403
            );
        }

        // Encriptamos la contraseña.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario.
        await connection.query(
            `INSERT INTO users (username, email, password, createdAt) VALUES (?, ?, ?, ?)`,
            [username, email, hashedPassword, new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
