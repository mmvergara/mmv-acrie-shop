import { FaHamburger } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideNavicons from "./components/SideNavicons";
const SideNavbar: React.FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const toggleNav = () => setNavOpen((prev) => !prev);
  const hideNav = () => setNavOpen(false);
  return (
    <header className="z-50">
      <motion.div className='fixed h-fit w-[70px] z-50 '>
        <div onClick={toggleNav} className='sidebar-icon'>
          <FaHamburger />
        </div>
      </motion.div>
      <AnimatePresence>{navOpen && <SideNavicons toggleNav={hideNav} />}</AnimatePresence>
    </header>
  );
};

export default SideNavbar;
