import Joi from "joi";
export const transactionTypes = ["entry", "removal",]

export const validateAddBookCopies = Joi.object({
   amount:Joi.number().min(1).max(100).required(),
   transactionType:Joi.valid(...transactionTypes).required()
})