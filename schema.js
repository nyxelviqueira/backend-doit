const Joi = require('joi');

const userSchema = Joi.object().keys({
    username: Joi.string()
        .min(2)
        .max(30)
        .required()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                case 'sting.required':
                    return new Error(`Username field is required`);

                default:
                    return new Error(
                        `Username field must be between 2 and 30 characters`
                    );
            }
        }),

    email: Joi.string()
        .email()
        .required()
        .error((errors) => {
            if (errors[0].code === 'any.required') {
                return new Error('Email field required');
            } else {
                return new Error('Wrong Email');
            }
        }),

    password: Joi.string()
        .min(6)
        .max(30)
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{6,30}$/
        )
        .required()
        .error((errors) => {
            switch (errors[0].code) {
                case 'any.required':
                    return new Error('Password is required');

                case 'string.pattern.base':
                    return new Error(
                        'Password must have at least one uppercase letter, one lowercase letter, one number, and one punctuation mark'
                    );

                default:
                    return new Error(
                        'Password must be between 6 and 30 characters'
                    );
            }
        }),
});

module.exports = userSchema;
