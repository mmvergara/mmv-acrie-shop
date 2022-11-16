import { motion } from "framer-motion";
import { ProductSchema } from "../../utilities/Schemas";
import { useFormik } from "formik";
import { useRef } from "react";

const CreateProduct: React.FC = () => {
  const createProductHandler = async () => {
    return;
  };

  const formik = useFormik({
    initialValues: {
      prodName: "",
      prodPrice: "",
      prodDescription: "",
    },
    validationSchema: ProductSchema,
    onSubmit: createProductHandler,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
          <input type='file' className='hidden' id='productImageInput' ref={prodImgInputRef} />
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
      </motion.div>
    </section>
  );
};
export default CreateProduct;
