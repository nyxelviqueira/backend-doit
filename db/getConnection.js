// Creamos la conexión a la BBDD


const mysql = require('mysql2/promise'); // cargamos la versión de promesas de MySQL xa poder utilizar async y await


const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Referencia al pool de conexiones
let pool;


const getConnection = async () => {

    try {
        if(!pool) {
            pool = mysql.createPool({
                
                    connectionLimit: 10,
                    host: MYSQL_HOST,
                    user: MYSQL_USER,
                    password: MYSQL_PASS,
                    database: MYSQL_DB,
                    timezone: 'Z',
            });
        }
    
        return await pool.getConnection();
    
        
    } catch (err) {
        console.error(err);
        throw new Error('Error al conectar con MySQL');

    }
}   

module.exports = getConnection;