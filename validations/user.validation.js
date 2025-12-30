const { z } = require("zod");
const Joi = require("joi");

/* ZOD Schema */
const zodUserSchema = z.object({
  username: z.string().min(3),
  firstname: z.string(),
  lastname: z.string(),
  age: z.number().int(),
  email: z.string().email(),
  mobile: z.number(),
  address: z.string().max(100),
  gender: z.enum(["male", "female", "other"]),
  password: z.string().min(6)
});

/* JOI Schema */
const joiUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  mobile: Joi.number().required(),
  address: Joi.string().max(100).required(),
  gender: Joi.string().required(),
  password: Joi.string().min(6).required()
});

module.exports = { zodUserSchema, joiUserSchema };
