import Joi from "joi";
const email = Joi.string().email().required();
const password = Joi.string().min(6).max(30).required();
const username = Joi.string().min(6).max(30).required();

const prod_name = Joi.string().min(6).max(30).required();
const prod_description = Joi.string().min(6).max(600).required();
const prod_price = Joi.number().required()
const prod_pic_url = Joi.string().required();

export const patchChangeAvatarSchema = Joi.object({
  password,
  user_pic_url: prod_pic_url,
});

export const addProductSchema = Joi.object({
  prod_name,
  prod_description,
  prod_price,
  prod_pic_url,
});

export const signupSchema = Joi.object({
  email,
  password,
  username,
});

export const loginSchema = Joi.object({
  email,
  password,
});
