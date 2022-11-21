import { useEffect, useState } from "react";
import { deleteProductById, getUserProducts } from "../../api/ProductApi";
import useLoading from "../../hooks/useLoading";
import { productDetails } from "../../types";
import MyProduct from "./sub-components/MyProduct";
const MyProducts: React.FC = () => {
  const { isLoadingEl, setIsLoading } = useLoading(true, "Fetching Products");
  const { isLoadingEl: isLoadingDel, setIsLoading: setIsLoadingDel } = useLoading(
    false,
    "Deleting Product"
  );
  const [allUserProducts, setAllUserProducts] = useState<productDetails[]>([]);
  const fetchUserProducts = async () => {
    setIsLoading(true);
    const result = await getUserProducts();
    setIsLoading(false);
    if (!result.ok) {
      setAllUserProducts([]);
      return;
    }
    setAllUserProducts(result.data);
  };

  const deleteProductByIdHandler = async (prod_id: number) => {
    setIsLoadingDel(true);
    await deleteProductById(prod_id);
    await fetchUserProducts();
    setIsLoadingDel(false);
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);
  return (
    <>
      {isLoadingEl}
      {isLoadingDel}
      <section className='w-screen flex items-center justify-center flex-col'>
        {allUserProducts.map(({ id, prod_name, prod_pic_url }, i) => {
          return (
            <MyProduct
              key={id}
              delay={i + 1}
              prod_id={id}
              prod_name={prod_name}
              prod_pic_url={prod_pic_url}
              triggerDelete={deleteProductByIdHandler}
            />
          );
        })}
      </section>
    </>
  );
};

export default MyProducts;
