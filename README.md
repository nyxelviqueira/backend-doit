# Project-X

Este proyecto consiste en crear una aplicación de peticiones de servicios digitales.

## Instalar

-   Crear una base de datos vacía en una instancia de MySQL local.

-   Guardar el archivo .env.example como .env y cubrir los datos necesarios.

-   Ejecutar npm run initDB para crear las tablas necesarias en la base de datos anteriormente creada.

-   Ejecutar npm run dev o npm start para lanzar el servidor.

## Entidades

-   User:

    -   id
    -   username
    -   avatar (optional)
    -   biography (optional)
    -   email
    -   password
    -   createdAt
    -   modifiedAt

-   Services:

    -   id
    -   idUser
    -   title
    -   description
    -   file
    -   category: ('Programming and Development',
        'Design and art',
        'Music and Audio',
        'Video and Animation',
        'Writing and Translation',
        'Administrative and Secretary',
        'Digital Marketing',
        'Business',
        'Various')
    -   realized (booleano)
    -   createdAt
    -   modifiedAt

-   Replies:
    -   id
    -   idUser
    -   idService
    -   finalFile
    -   observations
    -   createdAt

## Endpoints

### Usuarios:✅

-   POST [/users] - Registro de usuario. ✅
-   POST [/users/login] - Login de usuario (devuelve token).✅
-   GET [/users] - Devuelve información del usuario del token. TOKEN✅
-   PUT [/users] - Editar el nombre de usuario, el email o el avatar. TOKEN✅

### Services:✅

-   POST [/services] - Permite crear un servicio. TOKEN✅
-   GET [/services] - Lista todos los servicios.✅
-   GET [/services/:idService] - Devuelve información de un servicio concreto.✅
-   POST [/services/:idService] - Comentamos un servicio. TOKEN ✅
-   PUT [/services/:idService] - Modificar o finalizar un servicio. TOKEN ✅# Needs-Portal-Pruebas
