import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { AiTwotoneShop } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { MdAddCircle } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import SidebarIcon from "./SidebarIcon";
import { postLogout } from "../../../api/AuthApi";
import { useAuth } from "../../../context/AuthContext";
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
    toast.dark(result.message);
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
      {auth?.userAuthInfo && (
        <Link to='/dashboard' onClick={closeNav}>
          <div className='sidebar-icon group bg-none'>
            <img
              src={auth.userAuthInfo.userpic_url || "https://i.ibb.co/BBD7sZQ/aaa.png"}
              alt='user'
              className='sidebar-icon group-hover:rounded-2xl bg-none'
            />
            <span className='fixed bg-darkNavsecondary hidden sm:block p-2 text-sm left-[75px] rounded-md whitespace-nowrap scale-0 transition-all ease-in group-hover:scale-100 group-hover:text-pri_orange '>
              Dashboard
            </span>
          </div>
        </Link>
      )}
      <Link to='/' onClick={closeNav}>
        <SidebarIcon
          text={auth?.userAuthInfo ? "Shop" : "Home"}
          icon={auth?.userAuthInfo ? <AiTwotoneShop /> : <IoMdHome />}
        />
      </Link>
      {auth?.userAuthInfo && (
        <>
          <Link to='/cart' onClick={closeNav}>
            <SidebarIcon text='Cart' icon={<TiShoppingCart />} />
          </Link>
          <Link to='/createproduct' onClick={closeNav}>
            <SidebarIcon text='Add new Product' icon={<MdAddCircle />} />
          </Link>
          <Link to='/' onClick={signoutHandler}>
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
