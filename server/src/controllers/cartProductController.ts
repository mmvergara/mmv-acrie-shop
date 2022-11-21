import { Request as req, Response as res, NextFunction as next } from "express";
import { userModel } from "../models/userModel";
import newError from "../utilities/newError";
import { cartProductModel } from "../models/cartProductModel";
import { productModel } from "../models/productModel";
import { QueryResult } from "pg";
import { cartProductDetails, cartproductDetailsJoined } from "../types";

export const getUserCartByUserId = async (req: req, res: res, next: next) => {
  const userId = req.session.userId!;
  const foundUser = await userModel.findById(userId);

  try {
    if (foundUser.rowCount === 0) throw newError("User does not exists", 404);
    const result = await cartProductModel.getUserCartByUserId(userId);
    const cartProducts = result.rows;
    res
      .status(200)
      .send({ statusCode: 200, message: "User Cart Fetched", ok: true, data: cartProducts });
  } catch (error) {
    next(error);
  }
};
export const putProducttoCart = async (req: req, res: res, next: next) => {
  const prodId = Number(req.query.prod_id);
  const userId = req.session.userId!;

  let message = "";
  let data: QueryResult<any> | null = null;

  const findCartProductIfExists = await cartProductModel.findCartProductbyUserProdId(
    prodId,
    userId
  );

  const existingCartProd = findCartProductIfExists.rows[0] as cartProductDetails;
  try {
    if (existingCartProd) {
      message = "Cart Quantity incremented";
      data = await cartProductModel.changeCartQuantityById(
        existingCartProd.id,
        existingCartProd.cart_product_quantity,
        "INCREMENT"
      );
    } else {
      message = "Product added to Cart";
      const findUser = userModel.findById(userId);
      const findProduct = productModel.findProdById(prodId);
      const [foundUser, foundProduct] = await Promise.all([findUser, findProduct]);
      if (foundUser.rowCount === 0) throw newError("Invalid User", 422);
      if (foundProduct.rowCount === 0) throw newError("Product not found", 404);
      data = await cartProductModel.addCartProductByIds(prodId, userId);
    }
    res.status(200).send({ statusCode: 200, message, ok: true, data: data.command });
  } catch (error) {
    next(error);
  }
};
export const deleteProducttoCart = async (req: req, res: res, next: next) => {
  const cart_id = Number(req.query.cart_id);
  const findCartProductIfExists = await cartProductModel.findCartByCartId(cart_id);
  const existingCartProd = findCartProductIfExists.rows[0] as cartProductDetails;
  try {
    if (!existingCartProd) throw newError("Cart Product Item does not exists", 404);
    const result = await cartProductModel.deleteCartByCartId(existingCartProd.id);
    res
      .status(200)
      .send({ statusCode: 200, message: "Cart item Deleted", ok: true, data: result.command });
  } catch (error) {
    next(error);
  }
};
export const decreaseProductQuantity = async (req: req, res: res, next: next) => {
  const cart_id = Number(req.query.cart_id);
  const findCartProductIfExists = await cartProductModel.findCartByCartId(cart_id);
  const existingCartProd = findCartProductIfExists.rows[0] as cartProductDetails;
  try {
    if (!existingCartProd) throw newError("Cart Product Item does not exists", 404);
    let message = "";
    let result: QueryResult<any> | null = null;
    if (existingCartProd.cart_product_quantity === 1) {
      result = await cartProductModel.deleteCartByCartId(cart_id);
      message = "Cart item Deleted";
    } else {
      result = await cartProductModel.changeCartQuantityById(
        cart_id,
        existingCartProd.cart_product_quantity,
        "DECREMENT"
      );
      message = "Cart Product quantity decreasee";
    }
    res.status(200).send({ statusCode: 200, message, ok: true, data: result.command });
  } catch (error) {
    next(error);
  }
};
export const postCheckout = async (req: req, res: res, next: next) => {
  const userId = req.session.userId!;
  const foundUser = await userModel.findById(userId);
  try {
    if (foundUser.rowCount === 0) throw newError("User does not exists", 404);
    const result = await cartProductModel.getUserCartByUserId(userId);

    // Prepare Checkout Data to be sent
    const cartProducts = result.rows as cartproductDetailsJoined[];
    const totalPrice = cartProducts
      .map((p) => p.prod_price * p.cart_product_quantity)
      .reduce((a, b) => a + b);
    const minifiedCartProducts = cartProducts.map((p) => {
      const { prod_name, prod_price, cart_product_quantity } = p;
      return { prod_name, prod_price, quantity: cart_product_quantity };
    });

    const data = {
      cartProducts: minifiedCartProducts,
      totalPrice,
      orderid: `${foundUser.rows[0].username}-${new Date().getTime().toString()}`,
    };

    //Delete user cart items
    await cartProductModel.deleteUserCartItemsByUserId(userId);

    res.status(200).send({ statusCode: 200, message: "Checkout Successfull", ok: true, data });
  } catch (error) {
    next(error);
  }
};
