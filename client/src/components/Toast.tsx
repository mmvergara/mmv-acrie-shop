import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastREACT: React.FC = () => (
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
);

export default ToastREACT;
