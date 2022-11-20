import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  delDecreaseProducttoCart,
  deleteCartItem,
  getUserCartProducts,
  postCheckout,
  putProducttoCart,
} from "../../api/CartProductApi";
import useLoading from "../../hooks/useLoading";
import { cartproductDetails } from "../../types";
import CartProduct from "./CartProduct";

const CartProducts: React.FC = () => {
  const [cartProductList, setCartProductList] = useState<cartproductDetails[] | []>([]);
  const [isDoneFetching, setIsDoneFecthing] = useState<boolean>(false);
  const { isLoadingEl, setIsLoading } = useLoading(true, "Getting Cart Products");
  const { isLoadingEl: isLoadingUpdate, setIsLoading: setIsLoadingUpdate } = useLoading(
    false,
    "Updating Cart Products"
  );
  const checkOutHandler = async () => {
    const result = await postCheckout();
    console.log(result)
    return;
  };

  const fetchAllCartProducts = async () => {
    setIsLoading(true);
    await updateProducts();
    setIsLoading(false);
    setIsDoneFecthing(true);
  };
  const updateProducts = async () => {
    const result = await getUserCartProducts();
    setCartProductList(result.data);
  };
  const triggerUpdate = async (
    cartItemId: number,
    prod_id: number,
    action: "INCREASE" | "DECREASE" | "DELETE"
  ) => {
    setIsLoadingUpdate(true);
    switch (action) {
      case "INCREASE":
        await putProducttoCart(prod_id);
        break;
      case "DECREASE":
        await delDecreaseProducttoCart(cartItemId);
        break;
      case "DELETE":
        await deleteCartItem(cartItemId);
        toast.success("Product removed from Cart");
        break;
    }
    await updateProducts();
    setIsLoadingUpdate(false);
    return;
  };
  useEffect(() => {
    fetchAllCartProducts();
  }, []);

  return (
    <>
      {isLoadingUpdate}
      {isLoadingEl}
      <section className='w-screen flex items-center justify-center flex-col'>
        <button
          onClick={checkOutHandler}
          className='auth-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all ease-in'
        >
          Checkout!
        </button>
        {cartProductList.length === 0 && isDoneFetching && (
          <>
            <p className='text-3xl'> You have no cart Items</p>
            <Link to='/'>
              <button className='bg-pri_orange font-semibold p-4 mt-4'>Shop Now!</button>
            </Link>
          </>
        )}
        {cartProductList.map((prod, i) => {
          return (
            <CartProduct
              delay={i + 1}
              prod_price={prod.prod_price}
              cartid={prod.cartid}
              prod_id={prod.cart_productid}
              prod_name={prod.prod_name}
              prod_pic_url={prod.prod_pic_url}
              triggerUpdate={triggerUpdate}
              quantity={prod.cart_product_quantity}
              key={prod.cart_productid}
            />
          );
        })}
      </section>
    </>
  );
};
export default CartProducts;
