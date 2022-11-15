import { IoMdHome } from "react-icons/io";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import SidebarIcon from "./SidebarIcon";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface props {
  toggleNav: () => void;
}

const SideNavicons: React.FC<props> = ({ toggleNav }: props) => {
  useEffect(() => {
    const onScrollEvent = () => toggleNav();
    window.addEventListener("scroll", onScrollEvent);
    return () => window.removeEventListener("scroll", onScrollEvent);
  }, []);

  return (
    <motion.div
      key='sidenavicons'
      initial={{ x: "-20vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-20vw" }}
      transition={{ duration: 0.3 }}
      className='fixed pt-[65px] z-0 h-screen bg-darkNavprimary w-[70px] '
    >
      <SidebarIcon icon={<IoMdHome />} />
      <SidebarIcon icon={<BiLogOutCircle />} />
      <SidebarIcon icon={<BiLogInCircle />} />
    </motion.div>
  );
};

export default SideNavicons;
