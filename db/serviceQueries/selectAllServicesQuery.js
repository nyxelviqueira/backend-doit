const getConnection = require('../getConnection');
const { generateError } = require('../../helpers');

const selectAllServicesQuery = async (keyword = '') => {

    let connection;

    try {



        connection = await getConnection();

        let [ services ] = await connection.query(
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
            WHERE S.title LIKE ?
            GROUP BY S.id
            ORDER BY S.createdAt DESC
           `,
           [ `%${keyword}%`]
        );

        if (services.length < 1) {
            throw generateError(`We didn't find any service`, 404);
        }

        return services;

    } finally {
        if(connection) connection.release();
    }
};

module.exports = selectAllServicesQuery;