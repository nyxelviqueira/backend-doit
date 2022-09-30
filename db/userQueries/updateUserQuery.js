

const getConnection = require('../getConnection');

const updateUserQuery = async (biography, avatar, idUser) => {

    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE users SET biography = ?, avatar = ?, modifiedAt = ? WHERE id = ?`,
            [biography, avatar, new Date(), idUser]
        );

    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserQuery;