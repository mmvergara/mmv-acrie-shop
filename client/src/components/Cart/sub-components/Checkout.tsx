import { motion } from "framer-motion";
import { useState } from "react";
import { postCheckout } from "../../../api/CartProductApi";
import jsPDF from "jspdf";
const Checkout: React.FC = () => {
  const checkOutHandler = async () => {
    setStatus("Creating Order...");
    const result = await postCheckout();
    console.log(result);
    setStatus("Checkout!");
    return;
  };
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.text(`Hello `, 20, 0);
  pdf.text(`Hello `, 20, 8);
  pdf.text(`Hello `, 20, 16);
  const [dlpdf, setPdf] = useState<jsPDF | null>(pdf);
  const getPdf = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const input = document.getElementById("checkoutOrderContainer")!;
    if(!dlpdf) return 
    dlpdf.save("Checkout.pdf");
  };
  const [status, setStatus] = useState<"Checkout!" | "Creating Order...">("Checkout!");

  return (
    <>
      <motion.button
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={checkOutHandler}
        className='auth-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 mb-2 transition-all ease-in'
      >
        {status}
      </motion.button>
      <motion.button
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={getPdf}
        className='auth-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 mb-2 transition-all ease-in'
      >
        Download Checkout Order PDF
      </motion.button>
      <motion.div id='checkoutOrderContainer'>Hello PDF sadasd asdas</motion.div>
    </>
  );
};

export default Checkout;
