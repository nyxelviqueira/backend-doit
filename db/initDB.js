//Esto siempre al principio
//El método config localiza el fichero .env que hayamos creado en la raíz del proyecto y pone disponibles las variables que figuren en el fichero
require("dotenv").config();

// chalk pone colorinchos en la consola
const chalk = require('chalk');

//Importamos la función de la conexión
const getConnection = require("./getConnection");

async function main() {
    //Variable que almacenará una conexión libre con la base de datos
    let connection;
    try {
        connection = await getConnection();

        console.log(chalk.red('Delete tables...'));


        await connection.query('DROP TABLE IF EXISTS replies');
        await connection.query('DROP TABLE IF EXISTS services');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log(chalk.blue('Creating tables...'));

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                biography VARCHAR(250),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
                )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS services (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                title VARCHAR(100),
                description TEXT NOT NULL,
                file VARCHAR(100) NOT NULL,
                category ENUM ('Programming and Development',
                                   'Design and art',
                                   'Music and Audio',
                                   'Video and Animation',
                                   'Writing and Translation', 
                                   'Administrative and Secretary', 
                                   'Digital Marketing', 
                                   'Business', 
                                   'Various')
                DEFAULT 'Various',
                realized BOOLEAN NOT NULL DEFAULT false,
                createdAt TIMESTAMP NOT NULL,
                modifiedAt TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS replies (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                idService INT UNSIGNED NOT NULL, 
                FOREIGN KEY (idService) REFERENCES services (id), 
                finalFile VARCHAR(100),
                observations TEXT,
                createdAt TIMESTAMP NOT NULL
            )
        `);

        console.log(chalk.green('¡Created tables!'));
    } catch (err) { 
        console.error(err);
    } finally {
        if (connection) connection.release();
         process.exit();   
        
    }

} 

main();