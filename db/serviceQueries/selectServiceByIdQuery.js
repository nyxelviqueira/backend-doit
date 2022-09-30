const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectServiceByIdQuery = async (idService) => {

    let connection;

    try {

        connection = await getConnection();

        const [services] = await connection.query(
            `
            SELECT S.id, 
                    S.idUser,
                    U.username,
                    S.title,
                    S.description, 
                    S.file,
                    S.category,
                    S.realized, 
                    S.createdAt 
                FROM services S
                INNER JOIN users U ON S.idUser = U.id
                WHERE S.id = ?
                GROUP BY S.id
                ORDER BY S.createdAt DESC
            `, [idService]
        );

        if (services.length < 1) {
            throw generateError(`We didn't find any service`, 404);
        }

        return services[0];
        
    } finally {
        if (connection) connection.release();
    }
}

module.exports = selectServiceByIdQuery;