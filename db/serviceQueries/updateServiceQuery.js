const getConnection = require("../getConnection");

const updateServiceQuery = async (description, category, realized, idService) => {

    let connection;

    try {

        connection = await getConnection();

        await connection.query(
            `UPDATE services SET 
            description = ?,
            category = ?, 
            realized = ?, 
            modifiedAt = ? 
            WHERE id = ?`,
            [description, category, realized, new Date(), idService]
        )

    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateServiceQuery;