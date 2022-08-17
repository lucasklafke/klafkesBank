import joi from "joi"

export const changeLimitSchema = joi.object({
    limit: joi.number()
})