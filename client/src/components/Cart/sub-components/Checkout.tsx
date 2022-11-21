import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { postCheckout } from "../../../api/CartProductApi";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import createCheckoutPDF from "./CreatePdf";
import { Link } from "react-router-dom";
interface props {
  triggerUpdate: (isCheckout?: boolean) => Promise<void>;
}

const Checkout: React.FC<props> = ({ triggerUpdate }: props) => {
  const [status, setStatus] = useState<"Checkout!" | "Creating Order...">("Checkout!");
  const [showDownload, setShowDownload] = useState(false);
  const [dlpdf, setPdf] = useState<jsPDF | null>(null);

  const checkOutHandler = async () => {
    setStatus("Creating Order...");
    const result = await postCheckout();
    if (!result.data) return;
    const pdf = createCheckoutPDF(result.data);
    setPdf(pdf);
    setStatus("Checkout!");
    setShowDownload(true);
    toast.success("Checkout Success!");
    triggerUpdate(true);

    return;
  };

  const getPdf = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!dlpdf) return;
    dlpdf.save("Checkout.pdf");
  };

  return (
    <AnimatePresence>
      {showDownload ? (
        <>
          <motion.button
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            onClick={getPdf}
            className='auth-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 mb-2 transition-all ease-in'
          >
            Download Checkout Order PDF
          </motion.button>
          <h2 className='text-3xl text-center'>Thank you for Shopping with Acie Shop!</h2>
          <Link to='/'>
            <button className='bg-pri_orange font-semibold p-4 mt-4 hover:scale-105 transition-all ease-in'>Shop Again!</button>
          </Link>
        </>
      ) : (
        <motion.button
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          onClick={checkOutHandler}
          className='auth-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 mb-2 transition-all ease-in'
        >
          {status}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Checkout;
