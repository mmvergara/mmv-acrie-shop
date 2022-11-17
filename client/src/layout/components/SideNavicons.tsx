import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import SidebarIcon from "./SidebarIcon";
import { postLogout } from "../../api/AuthApi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

interface props {
  toggleNav: () => void;
}

const SideNavicons: React.FC<props> = ({ toggleNav }: props) => {
  useEffect(() => {
    const onScrollEvent = () => toggleNav();
    window.addEventListener("scroll", onScrollEvent);
    return () => window.removeEventListener("scroll", onScrollEvent);
  }, []);
  const auth = useAuth();
  const closeNav = () => toggleNav();
  const signoutHandler = async () => {
    const result = await postLogout();
    auth?.setUserAuthInfo("logout");
    toast.dark(result.data.message);
    toggleNav();
  };
  return (
    <motion.div
      key='sidenavicons'
      initial={{ x: "-20vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-20vw" }}
      transition={{ duration: 0.3 }}
      className='fixed pt-[65px] z-20 h-screen bg-darkNavprimary w-[70px] '
    >
      <Link to='/' onClick={closeNav}>
        <SidebarIcon text='Home' icon={<IoMdHome />} />
      </Link>
      {auth?.userAuthInfo && (
        <>
          <Link to='/createproduct' onClick={closeNav}>
            <SidebarIcon text='Add new Product' icon={<MdAddCircle />} />
          </Link>
          <Link to='/auth' onClick={signoutHandler}>
            <SidebarIcon text='Sign out' icon={<BiLogOutCircle />} />
          </Link>
        </>
      )}
      {!auth?.userAuthInfo && (
        <Link to='/auth' onClick={closeNav}>
          <SidebarIcon text='Sign in' icon={<BiLogInCircle />} />
        </Link>
      )}
    </motion.div>
  );
};

export default SideNavicons;
