import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  delDecreaseProducttoCart,
  deleteCartItem,
  getUserCartProducts,
  putProducttoCart,
} from "../../api/CartProductApi";
import useLoading from "../../hooks/useLoading";
import { cartproductDetails } from "../../types";
import CartProduct from "./CartProduct";
import Checkout from "./sub-components/Checkout";

const CartProducts: React.FC = () => {
  const [cartProductList, setCartProductList] = useState<cartproductDetails[] | []>([]);
  const [isDoneFetching, setIsDoneFecthing] = useState(false);
  const [checkoutDone, setDoneCheckout] = useState(false);
  const { isLoadingEl, setIsLoading } = useLoading(true, "Getting Cart Products");
  const { isLoadingEl: isLoadingUpdate, setIsLoading: setIsLoadingUpdate } = useLoading(
    false,
    "Updating Cart Products"
  );

  const fetchAllCartProducts = async () => {
    setIsLoading(true);
    await updateCartProducts();
    setIsLoading(false);
    setIsDoneFecthing(true);
  };
  const updateCartProducts = async (isCheckout?: boolean) => {
    if (isCheckout) {
      setDoneCheckout(true);
    }
    const result = await getUserCartProducts();
    setCartProductList(result.data);
  };
  const triggerAction = async (
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
    await updateCartProducts();
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
        {cartProductList.length === 0 && isDoneFetching && !checkoutDone &&(
          <>
            <p className='text-3xl'> You have no cart Items</p>
            <Link to='/'>
              <button className='bg-pri_orange font-semibold p-4 mt-4  hover:scale-105 transition-all ease-in'>Shop Now!</button>
            </Link>
          </>
        )}
        {((cartProductList.length > 0 && isDoneFetching) || checkoutDone) && (
          <Checkout triggerUpdate={updateCartProducts} />
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
              triggerAction={triggerAction}
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
