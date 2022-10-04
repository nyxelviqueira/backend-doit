const getConnection = require('../getConnection');

const insertReplyQuery = async (idUser, idService, finalFile, observations) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
            INSERT INTO replies (idUser, idService, finalFile, observations, createdAt)
            VALUES (?, ?, ?, ?, ?)
            `,
            [idUser, idService, finalFile, observations, new Date()]
        );

        return result.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertReplyQuery;
