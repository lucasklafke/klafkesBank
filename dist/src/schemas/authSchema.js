import joi from "joi";
var authSchema = joi.object({
    cpf: joi.string().required(),
    password: joi.string().required()
});
export default authSchema;
