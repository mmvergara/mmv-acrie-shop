import { Request as req, Response as res, NextFunction as next } from "express";
import { productModel } from "../models/productModel";
import { userModel } from "../models/userModel";
import { productDetails, } from "../types";

export const addProduct = async (req: req, res: res, next: next) => {
  const { prod_name, prod_price, prod_description, prod_pic_url } = req.body;
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
  res
    .status(200)
    .send({
      statusCode: 200,
      message: "All Products fetched",
      ok: true,
      data: allProducts,
    });
};

export const getProductDetail = async (req: req, res: res, next: next) => {
  const { prodId } = req.body;

};

export const  deleteProductById = async (req: req, res: res, next: next) => {}
