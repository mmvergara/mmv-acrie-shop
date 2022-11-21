import { RiDeleteBin6Fill } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
interface props {
  prod_id: number;
  prod_name: string;
  prod_pic_url: string;
  delay: number;
  triggerDelete: (prod_id: number) => Promise<void>;
}
const MyProduct: React.FC<props> = ({
  prod_id,
  prod_name,
  prod_pic_url,
  delay,
  triggerDelete,
}: props) => {
  
  const deleteHandler = () => deleteProductByIdHandler(prod_id);
  const deleteProductByIdHandler = async (prod_id: number) => await triggerDelete(prod_id);

  const initial = delay % 2 === 0 ? { x: 400, opacity: 0 } : { x: -400, opacity: 0 };
  return (
    <>
      <motion.article
        initial={initial}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: delay / 10 }}
        className='bg-darkNavsecondary w-[100%] min-w-[250px] max-w-[500px] p-[12px] flex items-center flex-col text-2xl mb-1 justify-between'
      >
        <div className='flex items-center gap-2 w-[100%]'>
          <img src={prod_pic_url} alt='product' className='w-[80px] h-[80px]' />
          <p className='break-words overflow-hidden text-md'>{prod_name}</p>
        </div>
        <div className='flex gap-2 sm:gap-4 w-[100%] ml-auto justify-end'>
          <Link to={`/product/${prod_id}`} className='text-green-500 group hover:scale-110'>
            <CgDetailsMore />
            <span className='fixed bg-darkNavprimary hidden sm:block p-2 text-sm top-[-40px] left-[-30px] rounded-md whitespace-nowrap scale-0 group-hover:scale-100 group-hover:text-green-500 '>
              View Details
            </span>
          </Link>
          <p onClick={deleteHandler} className='text-red-500 cursor-pointer group hover:scale-110'>
            <RiDeleteBin6Fill />
            <span className='fixed bg-darkNavprimary hidden sm:block p-2 text-sm top-[-40px] left-[-69px] rounded-md whitespace-nowrap scale-0 group-hover:scale-100 group-hover:text-red-500 '>
              Delete Product
            </span>
          </p>
        </div>
      </motion.article>
    </>
  );
};

export default MyProduct;
