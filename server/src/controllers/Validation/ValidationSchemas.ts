import Joi from "joi";
const email = Joi.string().email().required();
const password = Joi.string().min(6).max(30).required();
const username = Joi.string().min(6).max(30).required();

const prodName = Joi.string().min(6).max(30).required();
const prodDescription = Joi.string().min(6).max(600).required();

export const signupSchema = Joi.object({
  email,
  password,
  username,
});

export const loginSchema = Joi.object({
  email,
  password,
});
