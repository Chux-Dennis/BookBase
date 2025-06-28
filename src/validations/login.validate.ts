import Joi from "joi"

export const validateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(25),
})