import { useState, useEffect } from "react";
import { ImPriceTags } from "react-icons/im";
import { MdDateRange } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { getSingleProductById } from "../../api/ProductApi";
import { productDetails } from "../../types";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { putProducttoCart } from "../../api/CartProductApi";
import useLoading from "../../hooks/useLoading";

const ProductDetails: React.FC = () => {
  const { prodId } = useParams();
  const [prod, setProd] = useState<productDetails | null>(null);
  const { isLoadingEl, setIsLoading } = useLoading(true, "Getting Product Details");
  const fetchSingleProductDetail = async () => {
    const prod = await getSingleProductById(Number(prodId));
    setIsLoading(false);
    if (!prod.ok) return;
    setProd(prod.data);
  };

  const addToCartHandler = async () => {
    const result = await putProducttoCart(Number(prodId));
    if (!result.ok) return;
    toast.success("Product Added To Cart");
  };

  useEffect(() => {
    fetchSingleProductDetail();
  }, []);
  if (!prod) return <>{isLoadingEl}</>;
  const { prod_description, prod_name, prod_pic_url, prod_price, prod_release_date } = prod;
  const release_date = new Date(prod_release_date).toISOString().slice(0, 10);
  return (
    <motion.section
      animate={{
        opacity: [0, 1],
        rotateX: [340, 360],
        rotateY: [340, 360],
      }}
      className=' mx-auto flex align-center justify-center p-2'
    >
      <article className='bg-darkNavprimary p-2 m-1  h-[100%] max-h-[600px] gap-2  text-center rounded-md flex flex-col justify-center items-center'>
        <div className='w-[100%]'>
          <img
            src={prod_pic_url}
            alt='product image'
            className='w-[100%] h-[100%] max-w-[300px] max-h-[300px]  '
          />
        </div>
        <div className='text-center flex flex-col justify-between'>
          <div>
            <p className='text-4xl'>{prod_name}</p>
            <p className='text-2xl mb-4'> {prod_description}</p>
            <p className='text-2xl flex items-center gap-2 justify-center'>
              <MdDateRange className='text-red-500' /> {release_date}
            </p>
            <p className='text-2xl flex items-center gap-2 justify-center my-2'>
              <ImPriceTags className='text-green-500' />
              {prod_price} $
            </p>
          </div>
          <button
            onClick={addToCartHandler}
            className='auth-button bg-pri_orange hover:scale-105 transition-all ease-in'
          >
            Add To Cart
          </button>
          <Link to='/'>
            <button className='auth-button bg-darkNavsecondary hover:scale-105 transition-all ease-in'>
              Go Back to Shop
            </button>
          </Link>
        </div>
      </article>
    </motion.section>
  );
};

export default ProductDetails;
