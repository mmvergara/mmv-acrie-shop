import { FaHamburger } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className='h-[60px] bg-darkNavprimary flex justify-between items-center shadow-md '>
      <div className='text-[30px] text-white hover:text-pri_orange cursor-pointer px-5'>
        <FaHamburger />
      </div>
      Acrie Shop
    </nav>
  );
};

export default Navbar;
