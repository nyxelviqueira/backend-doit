const Joi = require("joi");

const userSchema = Joi.object().keys({
    username: Joi.string()
                .min(2)
                .max(30)
                .required()
                .error((errors) => {
                    switch (errors[0].code) {
                        case 'any.required':
                        case 'sting.required':
                            return new Error(
                                `El campo username es requerido`
                            );

                        default:
                            return new Error(
                                `El campo username debe tener entre 2 y 30 caracteres`
                            );    
                    }
                }),

    email: Joi.string()
             .email()
             .required()
             .error((errors) => {
                if(errors[0].code === 'any.required') {

                    return new Error('El campo emial es requerido');

                } else {

                    return new Error('El email no es correcto');
                }
             }),
             
    password: Joi.string()
               .min(6)
               .max(30)
               .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{6,30}$/)
               .required()
               .error((errors) => {
                 switch (errors[0].code) {
                     case 'any.required':
                         return new Error('La constraseña es requerida');
     
                     case 'string.pattern.base':
                         return new Error(
                             'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un signo de puntuación'
                         ); 
     
                     default:
                         return new Error(
                             'La constraseña debe tener entre 6 y 30 caracteres'
                         );
                 }
             })         

 
});            

module.exports = userSchema;