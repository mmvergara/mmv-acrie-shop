import "./App.css";
import Navbar from "./layout/Navbar";
import SideNavBar from "./layout/SideNavbar";

const App = () => {
  return (
    <>
      <Navbar />
      <SideNavBar />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </>
  );
};

export default App;
