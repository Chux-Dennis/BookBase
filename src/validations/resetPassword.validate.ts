import Joi from "joi"

export const validateResetPasswordOTP = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    password:Joi.string().min(8).max(25),
})