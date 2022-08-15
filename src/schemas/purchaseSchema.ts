import joi from "joi"

export const purchaseSchema = joi.object({
    name: joi.string().required(),
    value: joi.number().required(),
    card: joi.number().required(),
    password: joi.string().required()
})