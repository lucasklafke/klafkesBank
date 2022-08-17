import joi from 'joi'
const associateSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().required(),
    birthdate: joi.date().required(),
    latitude: joi.string().optional(),
    longitude: joi.string().optional(),
    password: joi.string().required()
})

export default associateSchema;