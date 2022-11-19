import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductById } from "../../api/ProductApi";
import { productDetails } from "../../types";

const ProductDetails: React.FC = () => {
  const { prodId } = useParams();
  const [prod, setProd] = useState<productDetails | null>(null);
  const fetchSingleProductDetail = async () => {
    const prod = await getSingleProductById(Number(prodId));
    setProd(prod.data);
  };

  useEffect(() => {
    fetchSingleProductDetail();
  }, []);
  if (!prod) return <h1>Loading</h1>;
  return <h1>Product Detials</h1>;
};

export default ProductDetails;
