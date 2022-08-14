import joi from "joi";
export var createCardSchema = joi.object({
    income: joi.number().required(),
    password: joi.string().required(),
    logo: joi.string().allow("gold", "plat", "black").required(),
    limit: joi.number().required(),
    invoice_dueday: joi.string().required(),
    name: joi.string().max(20).required(),
    type: joi.string().allow("physical", "virtual").required(),
    cardPassword: joi.string().length(4).required()
});
