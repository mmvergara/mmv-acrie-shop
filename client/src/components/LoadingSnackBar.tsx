import { motion } from "framer-motion";
import { GiSnowflake2 } from "react-icons/gi";
interface Props {
  loadingMessage: string;
}
const LoadingSnackBar: React.FC<Props> = ({ loadingMessage }: Props) => {
  return (
    <motion.div className='fixed top-0 right-0 p-4 bg-pri_orange m-2 font-semibold max-h-[80px]'>
      <span className='pr-[18px]'>{loadingMessage}</span>
      <motion.span
        animate={{
          rotate: [null, 360 * -1],
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className='absolute right-2 top-[15px]'
      >
        <GiSnowflake2 className='inline text-2xl mb-[2px]' />
      </motion.span>
    </motion.div>
  );
};

export default LoadingSnackBar;
