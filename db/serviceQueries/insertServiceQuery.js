
const getConnection = require('../getConnection');

const insertServiceQuery = async (idUser, title, description, file, category) => {
    let connection;

    try {

        connection = await getConnection();

        const [newService] = await connection.query(
            `
            INSERT INTO services ( idUser, title, description, file, category, createdAt)
            VALUES (?, ?, ?, ?, ?, ?)

            `, [idUser, title, description, file, category, new Date()]
        );

        return newService.insertId;

    } finally {
        if (connection) connection.release();
    }
}

module.exports = insertServiceQuery;