export interface postLoginParams {
  email: string;
  password: string;
}

export interface putSignupParams {
  email: string;
  password: string;
  username: string;
}

export interface standardResponse<data> {
  statusCode: number;
  message: string;
  ok: boolean;
  data: data;
}

export interface putProductParams {
  prod_name:string;
  prod_description: string;
  prod_pic_url: string;
  prod_price: number;
}

