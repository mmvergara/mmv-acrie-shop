export interface productDetails {
  id: number;
  prod_name: string;
  prod_owner: string;
  prod_description: string;
  prod_pic_url: string;
  prod_price: number;
  prod_release_date: string;
}

export interface authInfo {
  username: string;
  userpic_url: string;
  TOKEN_EXP_DATE: number;
}

export interface authContext {
  userAuthInfo: authInfo | null;
  setUserAuthInfo: React.Dispatch<React.SetStateAction<authInfo | null>>;
}
