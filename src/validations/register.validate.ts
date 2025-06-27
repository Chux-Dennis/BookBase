import Joi from "joi"
export const roles = ["Admin", "Librarian", "Reader"]
export const validateRegister = Joi.object({
    name:Joi.string().required().min(8).max(60),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(25),
    role:Joi.string().valid(...roles).required()
})