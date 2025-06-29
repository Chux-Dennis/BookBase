import Joi from "joi";

export const borrowValidate = Joi.object({
    dueDate: Joi.date().required(),
    
})