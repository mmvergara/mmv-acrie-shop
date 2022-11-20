import { useState, useEffect } from "react";
import { delDecreaseProducttoCart, getUserCartProducts, putProducttoCart } from "../../api/CartProductApi";
import useLoading from "../../hooks/useLoading";
import { cartproductDetails } from "../../types";
import CartProduct from "./CartProduct";

const CartProducts: React.FC = () => {
  const [cartProductList, setCartProductList] = useState<cartproductDetails[] | []>([]);
  const { isLoadingEl, setIsLoading } = useLoading(false, "Getting Cart Products");
  const { isLoadingEl: isLoadingUpdate, setIsLoading: setIsLoadingUpdate } = useLoading(
    false,
    "Updating Cart Products"
  );
  const fetchAllCartProducts = async () => {
    setIsLoading(true);
    updateProducts();
    setIsLoading(false);
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
    setIsLoadingUpdate(true)
    switch (action) {
      case "INCREASE":
        await putProducttoCart(prod_id);
        break;
      case "DECREASE":
        await delDecreaseProducttoCart(cartItemId)
        break;
      case "DELETE":
        break;
    }
    await updateProducts();
    setIsLoadingUpdate(false)
    return;
  };

  useEffect(() => {
    console.log("USEEFEFECT CARRT");
    fetchAllCartProducts();
  }, []);

  return (
    <>
      {isLoadingUpdate}
      {isLoadingEl}
      <section className='w-screen flex items-center justify-center flex-col'>
        {cartProductList.map((prod, i) => {
          return (
            <CartProduct
              delay={i + 1}
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
