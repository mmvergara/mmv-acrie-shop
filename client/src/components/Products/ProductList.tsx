import { useState, useEffect } from "react";
import { putProducttoCart } from "../../api/CartProductApi";
import { getAllProducts, putProduct } from "../../api/ProductApi";
import useLoading from "../../hooks/useLoading";
import { productDetails } from "../../types";
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
    setProductList(result.data);
    setIsLoading(false);
  };
  const addToCart = async (prodId: number) => {
    const result = await putProducttoCart(prodId);
    return;
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <>
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
