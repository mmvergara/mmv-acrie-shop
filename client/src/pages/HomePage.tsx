import { useAuth } from "../context/AuthContext";
import LandingPage from "../components/LandingPage";
import ProductListPage from "./ProductListPage";

const HomePage:React.FC = ()=> {
  const auth = useAuth()
  return <>{auth?.userAuthInfo ? <ProductListPage/> : <LandingPage/>}</>
}

export default HomePage;