import { CgDetailsMore } from "react-icons/cg";
import { BsCartPlusFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
interface ProductCardProps {
  prod_pic_url: string;
  prod_name: string;
  prod_price: number;
  transitionSec: number;
  prod_id: number;
}
const ProductCard: React.FC<ProductCardProps> = ({
  prod_name,
  prod_pic_url,
  prod_price,
  transitionSec,
  prod_id,
}: ProductCardProps) => {
  return (
    <motion.article
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ x: { duration: 0.2 }, delay: transitionSec / 12, ease: "easeIn" }}
      className='transition-all ease-in scale-105 rounded-t-md bg-darkNavsecondary flex flex-col w-[260px] h-[330px] shadow-md hover:!scale-110 shadow-black group'
    >
      <div className='rounded-t-md fixed flex justify-center items-center gap-4 flex-col z-10 opacity-0 bg-black min-h-[260px] max-h-[260px] min-w-[260px] max-w-[260px] group-hover:opacity-90 transition-all ease-in'>
        <p className='text-2xl font-semibold'>{prod_price} $</p>
        <Link to={`/product/${prod_id}`}>
          <button className='border-4 p-2 border-solid rounded-sm border-pri_orange hover:scale-105 transition-all ease-in'>
            <CgDetailsMore className='inline mb-1' /> View Details
          </button>
        </Link>
        <button className='border-4 p-2 border-solid rounded-sm border-pri_orange  hover:scale-105 transition-all ease-in'>
          <BsCartPlusFill className='inline mb-2' /> Add To Cart{" "}
        </button>
      </div>
      <img
        src={prod_pic_url}
        alt={prod_name || "product iamge"}
        className='min-h-[260px] max-h-[260px] min-w-[260px] max-w-[260px] rounded-t-md'
      />

      <p className='font-semibold text-lg text-center p-2 break-words overflow-hidden'>
        {prod_name}
      </p>
    </motion.article>
  );
};

export default ProductCard;
