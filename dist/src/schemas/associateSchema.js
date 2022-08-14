import joi from 'joi';
var associateSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().required(),
    birthdate: joi.date().required(),
    latitude: joi.string().required(),
    longitude: joi.string().required(),
    password: joi.string().required()
});
export default associateSchema;
