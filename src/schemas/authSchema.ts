import joi from "joi"
const authSchema = joi.object({
        cpf: joi.string().required(),
        password: joi.string().required()
})

export default authSchema