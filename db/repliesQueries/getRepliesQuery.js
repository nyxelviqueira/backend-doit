const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const getRepliesQuery = async (idService) => {

    let connection;

    try {



        connection = await getConnection();

        let [replies] = await connection.query(
            `
        SELECT 
                R.id,
                R.idUser, 
                U.username,
                R.idService,
                R.finalFile,
                R.observations,
                R.createdAt 
            FROM replies R
            INNER JOIN users U ON R.idUser = U.id
            WHERE idService = ?
            GROUP BY id
            ORDER BY createdAt DESC
           `,
            [idService]
        );

        if (replies.length < 1) {
            throw generateError(`We didn't find any reply`, 404);
        }

        return replies;

    } finally {
        if (connection) connection.release();
    }
};

module.exports = getRepliesQuery;