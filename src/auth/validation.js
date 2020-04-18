const Joi = require('@hapi/joi');

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

// Validate new user credentials
const validateSignup = function(reqBody) {
    const { error } = signupSchema.validate(reqBody);
    return error;
}

// Validate login credentials
const validateLogin = function(reqBody) {
    const { error } = loginSchema.validate(reqBody);
    return error;
}

module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;