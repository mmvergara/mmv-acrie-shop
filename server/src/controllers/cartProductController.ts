import { Request as req, Response as res, NextFunction as next } from "express";
import { userModel } from "../models/userModel";
import { hash, compare } from "bcryptjs";
import { userInfo } from "../types";
import newError from "../utilities/newError";
import { loginSchema, signupSchema } from "./Validation/ValidationSchemas";
import { cartProductModel } from "../models/cartProductModel";

export const putProducttoCart = async (req: req, res: res, next: next) => {
  const { prodId } = req.body;
  const userId = req.session.userId!;
  try {
    await cartProductModel.addCartProductByIds(prodId, userId);
  } catch (error) {}
};

export const deleteProducttoCart = async (req: req, res: res, next: next) => {
  const userId = req.session.userId;
};

export const addCartProductQuantity = async (req: req, res: res, next: next) => {};

export const subtractCartProductQuantity = async (req: req, res: res, next: next) => {};
