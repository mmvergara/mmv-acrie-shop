import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import SideNavBar from "./layout/SideNavbar";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import CreateProductPage from "./pages/CreateProductPage";
import DashboardPage from "./pages/DashboardPage";
import CartsPage from "./pages/CartsPage";
import MyProductsPage from "./pages/MyProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ChangeAvatar from "./components/Dashboard/ChangeAvatar";
import ToastREACT from "./components/Toast";

const App = () => {
  const auth = useAuth();
  return (
    <>
      <SideNavBar />
      <main>
        <ToastREACT/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          {auth?.userAuthInfo && <Route path='/createproduct' element={<CreateProductPage />} />}
          {auth?.userAuthInfo && <Route path='/dashboard' element={<DashboardPage />} />}
          {auth?.userAuthInfo && <Route path='/changeavatar' element={<ChangeAvatar />} />}
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
