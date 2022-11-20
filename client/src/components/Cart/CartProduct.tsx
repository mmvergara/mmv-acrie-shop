import { motion } from "framer-motion";
import { HiMinusCircle } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
interface Props {
  cartid: number;
  prod_id: number;
  prod_name: string;
  prod_pic_url: string;
  quantity: number;
  delay: number;
  prod_price: number;
  triggerUpdate: (
    cartItemId: number,
    prod_id: number,
    action: "INCREASE" | "DECREASE" | "DELETE"
  ) => Promise<void>;
}
const CartProduct: React.FC<Props> = (props: Props) => {
  const { delay, prod_name, prod_pic_url, triggerUpdate, cartid, quantity, prod_id, prod_price } =
    props;
  const initial = delay % 2 === 0 ? { x: 400, opacity: 0 } : { x: -400, opacity: 0 };

  const increaseHandler = () => triggerUpdate(cartid, prod_id, "INCREASE");
  const decreaseHandler = () => triggerUpdate(cartid, prod_id, "DECREASE");
  const deleteHandler = () => triggerUpdate(cartid, prod_id, "DELETE");
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
          <p className='text-sm'>
            Quantity: {quantity} | Total Price ${quantity * prod_price}
          </p>
          <p
            onClick={decreaseHandler}
            className='text-red-600 cursor-pointer group hover:scale-110'
          >
            <HiMinusCircle />
            <span className='fixed  bg-darkNavprimary hidden sm:block p-2 text-sm top-[-40px] left-[-25px] rounded-md whitespace-nowrap scale-0 group-hover:scale-100 group-hover:text-red-600 '>
              Decrease
            </span>
          </p>
          <p
            onClick={increaseHandler}
            className='text-green-500 cursor-pointer group hover:scale-110'
          >
            <IoMdAddCircle />
            <span className='fixed bg-darkNavprimary hidden sm:block p-2 text-sm top-[-40px] left-[-22px] rounded-md whitespace-nowrap scale-0 group-hover:scale-100 group-hover:text-green-500 '>
              Increase
            </span>
          </p>
          <p onClick={deleteHandler} className='text-red-500 cursor-pointer group hover:scale-110'>
            <RiDeleteBin6Fill />
            <span className='fixed bg-darkNavprimary hidden sm:block p-2 text-sm top-[-40px] left-[-38px] rounded-md whitespace-nowrap scale-0 group-hover:scale-100 group-hover:text-red-500 '>
              Remove
            </span>
          </p>
        </div>
      </motion.article>
    </>
  );
};

export default CartProduct;
