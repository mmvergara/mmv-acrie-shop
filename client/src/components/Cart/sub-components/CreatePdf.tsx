import { checkoutDetails } from "../../../api/ApiTypes";
import jsPDF from "jspdf";

const createCheckoutPDF = ({ cartProducts, orderid, totalPrice }: checkoutDetails) => {
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.text(`Order Id ${orderid}`, 20, 16);
  let yAxis = 30;
  cartProducts.forEach((p) => {
    pdf.text(`${p.prod_name} x${p.quantity}`, 20, yAxis);
    pdf.text(`$${p.prod_price}`, 180, yAxis, { align: "right" });
    yAxis += 8;
  });
  pdf.text(
    `--------------------------------------------------------------------------------------`,
    180,
    yAxis + 2,
    {
      align: "right",
    }
  );
  pdf.text(`Total Price: $${totalPrice}`, 180, yAxis + 10, { align: "right" });
  return pdf;
};

export default createCheckoutPDF;
