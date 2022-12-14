import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { putProducttoCart } from "../../api/CartProductApi";
import { getAllProducts } from "../../api/ProductApi";
import { productDetails } from "../../types";
import useLoading from "../../hooks/useLoading";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const [productList, setProductList] = useState<productDetails[] | []>([]);
  const { isLoadingEl, setIsLoading } = useLoading(false, "Getting Products");
  const { isLoadingEl: isLoadingCart, setIsLoading: setIsLoadingCart } = useLoading(
    false,
    "Adding to Cart"
  );
  const fetchAllProduct = async () => {
    setIsLoading(true);
    const result = await getAllProducts();
    setIsLoading(false);
    if (!result.ok) return;
    setProductList(result.data);
  };
  const addToCart = async (prodId: number) => {
    setIsLoadingCart(true);
    await putProducttoCart(prodId);
    toast.success("Added Product to Cart");
    setIsLoadingCart(false);
    return;
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <>
      {isLoadingCart}
      {isLoadingEl}
      <section className='flex w-[100vw] p-2 flex-wrap gap-12  justify-center'>
        {productList.map((p, i) => {
          const { prod_name, prod_pic_url, prod_price, id } = p;
          return (
            <ProductCard
              key={id}
              prod_id={id}
              prod_name={prod_name}
              prod_price={prod_price}
              prod_pic_url={prod_pic_url}
              transitionSec={i + 1}
              addToCart={addToCart}
            />
          );
        })}
      </section>
    </>
  );
};

export default ProductList;
