import { postgrePool } from "../db/postgre";
import { productDetails } from "../types";

export class productModel {
  id?: number | null = null;
  prod_name: string = "";
  prod_owner: string = "";
  prod_description: string = "";
  prod_pic_url: string = "";
  prod_price: number = 0;
  prod_release_date?: string = "";

  constructor(newProd: productDetails) {
    this.id = newProd.id || null;
    this.prod_name = newProd.prod_name;
    this.prod_owner = newProd.prod_owner;
    this.prod_description = newProd.prod_description;
    this.prod_pic_url = newProd.prod_pic_url;
    this.prod_price = newProd.prod_price;
    this.prod_release_date = newProd.prod_release_date;
  }

  async save() {
    if (this.id) {
      //Update product details
      console.log("Updating ", this.prod_name);
      const q = `UPDATE product SET 
      prod_name = '${this.prod_name}' ,
      prod_owner = ${this.prod_owner} ,
      prod_description = ${this.prod_description} ,
      prod_pic_url = ${this.prod_pic_url} ,
      prod_price =${this.prod_price} ,
      WHERE id = ${this.id}
      `;
      return await postgrePool.query(q);
    } else {
      //Register
      console.log("Saving ", this.prod_name);
      const q = `INSERT INTO product (prod_name, prod_owner, prod_description, prod_pic_url, prod_price, prod_release_date) 
      VALUES ('${this.prod_name}','${this.prod_owner}','${this.prod_description}',
      '${this.prod_pic_url}','${this.prod_price}', to_timestamp(${Date.now()} / 1000.0))`;
      return await postgrePool.query(q);
    }
  }
  static async getAll() {
    return await postgrePool.query(`SELECT * FROM product`);
  }
  static async findProdById(prodId: string) {
    return await postgrePool.query(`SELECT * FROM product WHERE id = ${prodId}`);
  }
}
