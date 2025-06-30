import Joi from "joi";

export const validateMostBorrow = Joi.object({
  startDate: Joi.date().iso().required().label("startDate"),
  endDate: Joi.date().iso().required().label("endDate"),
});
