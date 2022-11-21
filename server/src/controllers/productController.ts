import { Request as req, Response as res, NextFunction as next } from "express";
import { productModel } from "../models/productModel";
import { userModel } from "../models/userModel";
import { productDetails } from "../types";
import newError from "../utilities/newError";
import { addProductSchema } from "./Validation/ValidationSchemas";

export const addProduct = async (req: req, res: res, next: next) => {
  const { prod_name, prod_price, prod_description, prod_pic_url } = req.body;
  const { error } = addProductSchema.validate(req.body)
  if (error) {
    next(newError("Invalid request", 422));
    return;
  }
  const userAddingTheProduct = await userModel.findById(req.session.userId!);
  const userIdDb = userAddingTheProduct.rows[0].id;

  const newProd = new productModel({
    prod_pic_url,
    prod_description,
    prod_name,
    prod_price,
    prod_owner: userIdDb,
  });
  await newProd.save();
  res.status(200).send({ message: "yopyooy" });
};

export const getAllProducts = async (req: req, res: res, next: next) => {
  const result = await productModel.getAll();
  const allProducts = result.rows as productDetails[];
  res.status(200).send({
    statusCode: 200,
    message: "All Products fetched",
    ok: true,
    data: allProducts,
  });
};

export const getSingleProductById = async (req: req, res: res, next: next) => {
  const prodId = Number(req.params.prod_id);
  if (!prodId) next(newError("No Product Id provded", 404));

  const result = await productModel.findProdById(prodId);
  const prod = result.rows[0] as productDetails;
  if (result.rowCount === 0) next(newError("Product not Found", 404));

  res.status(200).send({
    statusCode: 200,
    message: "All Products fetched",
    ok: true,
    data: prod,
  });
};

export const getUserProducts = async (req: req, res: res, next: next) => {
  const userId = req.session.userId!;
  try {
    const result = await productModel.getUserProductsByUserId(userId);
    const products = result.rows as productDetails[];
    res.status(200).send({
      statusCode: 200,
      message: "All Products fetched",
      ok: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req: req, res: res, next: next) => {
  const prodId = Number(req.params.prod_id);
  const userId = req.session.userId!;

  const result = await productModel.findProdById(prodId);
  try {
    const FoundProduct = result.rows[0] as productDetails;
    if (result.rowCount === 0) throw newError("Product does not exist", 404);
    if (userId !== FoundProduct.prod_owner) throw newError("You don't own this product", 401);

    const deleteRes = await productModel.deleteProductByID(prodId);
    res.status(200).send({
      statusCode: 200,
      message: "All Products fetched",
      ok: true,
      data: deleteRes,
    });
  } catch (error) {
    next(error);
  }
};
