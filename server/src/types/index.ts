export interface userInfo {
  id?:number
  username:string
  email:string
  password:string
  userpic_url?:string
}

export interface productDetails {
  id?: number;
  prod_name: string;
  prod_owner: number;
  prod_description: string;
  prod_pic_url: string;
  prod_price: number;
  prod_release_date?:string;
}



export interface cartproductDetailsJoined {
  id?: number;
  prod_name: string;
  prod_owner: number;
  prod_description: string;
  prod_pic_url: string;
  prod_price: number;
  prod_release_date?:string;
  cart_product_owner:number
  cart_productid:number
  cart_product_quantity:number
}

export interface cartProductDetails {
  id:number
  cart_product_owner:number
  cart_productid:number
  cart_product_quantity:number
}