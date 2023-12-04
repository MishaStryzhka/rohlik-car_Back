const Joi = require('joi');

const subscriptionList = ['starter', 'pro', 'business'];
const registerSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string().valid(...subscriptionList),
});

module.exports = registerSchema;
