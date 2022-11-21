import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";
import SideNavBar from "./components/layout/SideNavbar";
import AuthPage from "./pages/AuthPage";
import CartsPage from "./pages/CartsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ToastREACT from "./components/Toast";
import LoadingSnackBar from "./components/LoadingSnackBar";

const CreateProductPage = lazy(() => import("./pages/CreateProductPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MyProductsPage = lazy(() => import("./pages/MyProductsPage"));
const ChangeAvatarPage = lazy(() => import("./pages/ChangeAvatarPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const App = () => {
  const auth = useAuth();
  return (
    <>
      <SideNavBar />
      <main>
        <ToastREACT />
        <Suspense fallback={<LoadingSnackBar loadingMessage='Loading...' />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage />} />
            {auth?.userAuthInfo && <Route path='/createproduct' element={<CreateProductPage />} />}
            {auth?.userAuthInfo && <Route path='/dashboard' element={<DashboardPage />} />}
            {auth?.userAuthInfo && <Route path='/changeavatar' element={<ChangeAvatarPage />} />}
            {auth?.userAuthInfo && <Route path='/cart' element={<CartsPage />} />}
            {auth?.userAuthInfo && <Route path='/myproducts' element={<MyProductsPage />} />}
            {auth?.userAuthInfo && (
              <Route path='/product/:prodId' element={<ProductDetailsPage />} />
            )}
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default App;
