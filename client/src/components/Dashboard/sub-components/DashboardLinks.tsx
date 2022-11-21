import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { GoListUnordered } from "react-icons/go";
import { BiUserPin } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";

const DashboardLinks = () => {
  return (
    <div className='flex flex-col gap-3 my-4'>
      <Link
        to='/myproducts'
        className='dashboard-links border-x-2 border-red-600 hover:bg-red-600 hover:border-none '
      >
        <GoListUnordered />
        See My Products
      </Link>
      <Link
        to='/cart'
        className='dashboard-links border-x-2 border-pri_orange hover:bg-pri_orange hover:border-none'
      >
        <TiShoppingCart />
        See Shopping Cart
      </Link>
      <Link
        to='/createproduct'
        className='dashboard-links border-x-2 border-green-600 hover:bg-green-600 hover:border-none'
      >
        <MdAddCircle />
        Add New Product
      </Link>
      <Link
        to='/changeavatar'
        className='dashboard-links border-x-2 border-green-600 hover:bg-green-600 hover:border-none'
      >
        <BiUserPin />
        Change Avatar
      </Link>
    </div>
  );
};

export default DashboardLinks;
