import { useEffect, useState } from "react";
import { getUserProducts } from "../../api/ProductApi";
import { productDetails } from "../../types";
import MyProduct from "./sub-components/MyProduct";
const MyProducts: React.FC = () => {
  const [allUserProducts, setAllUserProducts] = useState<productDetails[]>([]);
  const fetchUserProducts = async () => {
    const result = await getUserProducts();
    console.log(result);
    setAllUserProducts(result.data.data);
  };
  useEffect(() => {
    fetchUserProducts();
  }, []);
  return (
    <section className='w-screen flex items-center justify-center flex-col '>
      {allUserProducts.map(({ id, prod_name, prod_pic_url }, i) => {
        return (
          <MyProduct
            key={id}
            delay={i + 1}
            prod_id={id}
            prod_name={prod_name}
            prod_pic_url={prod_pic_url}
          />
        );
      })}
    </section>
  );
};

export default MyProducts;
