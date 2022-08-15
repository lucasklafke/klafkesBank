import joi from "joi"

export const depositSchema = joi.object({
    amount: joi.number().required()
})