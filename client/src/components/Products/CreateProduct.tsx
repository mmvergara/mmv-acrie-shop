/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { motion } from "framer-motion";
import { ProductSchema } from "../../utilities/Schemas";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { putProduct } from "../../api/ProductApi";

const CreateProduct: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const createProductHandler = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);
    const data = {
      prod_name: formik.values.prodName,
      prod_price: formik.values.prodPrice,
      prod_description: formik.values.prodDescription,
    };
    fetch("https://api.imgbb.com/1/upload?key=47f97e3cdbc68c81f1f141c8042eb2e4", {
      body: formData,
      method: "post",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.url);
        return putProduct({ ...data, prod_pic_url: res.data.url });
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      prodName: "",
      prodPrice: 0,
      prodDescription: "",
    },
    validationSchema: ProductSchema,
    onSubmit: createProductHandler,
  });

  const prodImgInputRef = useRef<HTMLInputElement>(null!);
  const clickUploadHandler = () => prodImgInputRef.current.click();
  return (
    <section className='w-screen flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, x: -800, scale: 0.3 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        className='auth-container'
      >
        <h2 className='text-3xl my-4'>Acrie | Add new Product</h2>
        <form onSubmit={formik.handleSubmit} className='mb-4 flex flex-col '>
          <div className='text-red-300'>
            <p>{formik.touched.prodName && formik.errors.prodName}</p>
            <p>{formik.touched.prodDescription && formik.errors.prodDescription}</p>
            <p>{formik.touched.prodPrice && formik.errors.prodPrice}</p>
          </div>
          <input
            name='prodName'
            id='prodName'
            value={formik.values.prodName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='auth-input'
            type='text'
            placeholder='Product Name'
          />
          <input
            name='prodDescription'
            id='prodDescription'
            value={formik.values.prodDescription}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='auth-input'
            type='text'
            placeholder='Product Description'
          />
          <input
            name='prodPrice'
            id='prodPrice'
            value={formik.values.prodPrice}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='auth-input'
            type='number'
            placeholder='Price'
          />
          <input
            type='file'
            className='hidden'
            id='productImageInput'
            accept='image/png, img/jpg, img/jpeg'
            onChange={(e) => setSelectedImage(e.target.files![0])}
            ref={prodImgInputRef}
          />
          <button
            type='button'
            className='auth-button mt-2  bg-gradient-to-r from-orange-500 '
            style={{ backgroundColor: "#53a954" }}
            onClick={clickUploadHandler}
          >
            Add Product Image
          </button>
          <button type='submit' className='auth-button mt-5' style={{ backgroundColor: "#53a954" }}>
            Submit Product
          </button>
        </form>
        <b>{isLoading ? "loading" : "notLoading"}</b>
      </motion.div>
    </section>
  );
};
export default CreateProduct;
