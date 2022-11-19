import "./App.css";
import SideNavBar from "./layout/SideNavbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import CreateProductPage from "./pages/CreateProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import CartsPage from "./pages/CartsPage";
import MyProductsPage from "./pages/MyProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const App = () => {
  const auth = useAuth();
  return (
    <>
      <SideNavBar />
      <main>
        <ToastContainer
          position='top-center'
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme='dark'
        />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          {auth?.userAuthInfo && <Route path='/createproduct' element={<CreateProductPage />} />}
          {auth?.userAuthInfo && <Route path='/dashboard' element={<DashboardPage />} />}
          {auth?.userAuthInfo && <Route path='/cart' element={<CartsPage />} />}
          {auth?.userAuthInfo && <Route path='/myproducts' element={<MyProductsPage />} />}
          {auth?.userAuthInfo && <Route path='/product/:prodId' element={<ProductDetailsPage />} />}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
