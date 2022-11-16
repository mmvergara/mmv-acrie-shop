import "./App.css";
import SideNavBar from "./layout/SideNavbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import CreateProductPage from "./pages/CreateProductPage";

const App = () => {
  return (
    <>
      <SideNavBar />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/createproduct' element={<CreateProductPage/>}/>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
