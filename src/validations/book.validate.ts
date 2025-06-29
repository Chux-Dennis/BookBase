import Joi from "joi";

export const validateBook = Joi.object({
    isbn: Joi.string().min(13).required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.date().required(),
    genre: Joi.string().required(),
    publisher:Joi.string().required()
})