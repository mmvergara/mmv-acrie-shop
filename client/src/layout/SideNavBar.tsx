import { IoMdHome } from "react-icons/io";
import SidebarIcon from "./components/SidebarIcon";

const SideNavbar: React.FC = () => {
  return (
    <div className='fixed top-[55px] h-screen bg-darkNavprimary w-[70px]'>
      <SidebarIcon icon={<IoMdHome />} />
      <SidebarIcon icon={<IoMdHome />} />
    </div>
  );
};

export default SideNavbar;
