import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/ProductApi";
import { productDetails } from "../../types";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const [productList, setProductList] = useState<productDetails[] | []>([]);
  const fetchAllProduct = async () => {
    const result = await getAllProducts();
    setProductList(result.data);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <section className='flex w-[100vw] p-2 flex-wrap gap-12  justify-center'>
      {productList.map((p, i) => {
        const { prod_name, prod_pic_url, prod_price, id } = p;
        return (
          <ProductCard
            key={id}
            prod_name={prod_name}
            prod_price={prod_price}
            prod_pic_url={prod_pic_url}
            transitionSec={i + 1}
          />
        );
      })}
    </section>
  );
};

export default ProductList;
