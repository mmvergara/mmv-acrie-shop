import { postgrePool } from "../db/postgre";

export class cartProductModel {
  constructor() {}

  static async findCartByCartId(cartId: number) {
    const q = `SELECT * FROM cart_products WHERE id = ${cartId}`;
    return await postgrePool.query(q);
  }

  static async findCartProductbyUserProdId(prodId: number, userId: number) {
    const q = `SELECT * FROM cart_products WHERE cart_product_owner = ${userId} AND cart_productid = ${prodId}`;
    return await postgrePool.query(q);
  }
  
  static async getUserCartByUserId(userId: number) {
    const q = `SELECT *,cart_products.id as cartId FROM cart_products INNER JOIN product ON cart_products.cart_productid = product.id WHERE cart_product_owner = ${userId}   `;
    return await postgrePool.query(q);
  }

  static async addCartProductByIds(prodId: number, userId: number) {
    const q = `INSERT INTO cart_products(cart_product_owner,cart_productid,cart_product_quantity) VALUES ('${userId}','${prodId}','1')`;
    return await postgrePool.query(q);
  }
  
  static async deleteCartByCartId(cartId: number) {
    const q = `DELETE FROM cart_products WHERE id = ${cartId}`;
    return await postgrePool.query(q);
  }

  static async deleteUserCartItemsByUserId(userId: number) {
    const q = `DELETE FROM cart_products WHERE cart_product_owner = ${userId}`;
    return await postgrePool.query(q);
  }

  static async changeCartQuantityById(
    cartId: number,
    lastQuantity: number,
    action: "INCREMENT" | "DECREMENT"
  ) {
    let q: string;
    if (lastQuantity === 1 && action === "DECREMENT") {
      // Remove cart item if quantity = 1 and action == decrement
      return await this.deleteCartByCartId(cartId);
    } else {
      // Change Quantity
      const newQuantity = action === "DECREMENT" ? lastQuantity - 1 : lastQuantity + 1;
      q = `UPDATE cart_products SET cart_product_quantity = ${newQuantity} WHERE id = ${cartId}`;
    }
    return await postgrePool.query(q);
  }
}
