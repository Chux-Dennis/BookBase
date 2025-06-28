import Joi from "joi"

export const validateOTP = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required()
})