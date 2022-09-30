
const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectUserByIdQuery = async (idUser) => {
    let connection;

    try {

        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id, username, biography, email, avatar, createdAt FROM users WHERE id = ?`,
            [idUser]
        );


        if (users.lenght < 1) {
            throw generateError(`user not found`, 404);
        }

        return users[0];

    } finally {
        if(connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;

