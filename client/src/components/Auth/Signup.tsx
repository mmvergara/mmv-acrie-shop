import { authType } from ".";
import { motion } from "framer-motion";
import { SignupSchema } from "../../utilities/Schemas";
import { useFormik } from "formik";
import { putSignup } from "../../api/AuthApi";
import { toast } from "react-toastify";
interface props {
  changeMethod: (method: authType) => void;
}
const SignupBox: React.FC<props> = ({ changeMethod }: props) => {
  const changeHandler = () => changeMethod("Signin");
  const signUpHandler = async () => {
    const signupData = {
      email: formik.values.SignupEmail,
      password: formik.values.SignupPassword,
      username: formik.values.SignupUsername,
    };
    const result = await putSignup(signupData);
    if (result.data.ok) {
      toast.success(result.data.message);
      changeMethod('Signin')
    }

    return;
  };

  const formik = useFormik({
    initialValues: {
      SignupUsername: "",
      SignupEmail: "",
      SignupPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: signUpHandler,
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className='auth-container'
    >
      <h2 className='text-3xl my-4'>Acrie | Sign up</h2>
      <form onSubmit={formik.handleSubmit} className='mb-4'>
        <div className='text-red-300'>
          <p>{formik.touched.SignupUsername && formik.errors.SignupUsername}</p>
          <p>{formik.touched.SignupEmail && formik.errors.SignupEmail}</p>
          <p>{formik.touched.SignupPassword && formik.errors.SignupPassword}</p>
        </div>
        <input
          name='SignupUsername'
          id='SignupUsername'
          value={formik.values.SignupUsername}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className='auth-input'
          type='text'
          placeholder='Username'
        />
        <input
          name='SignupEmail'
          id='SignupEmail'
          value={formik.values.SignupEmail}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className='auth-input'
          type='email'
          placeholder='Email'
        />
        <input
          name='SignupPassword'
          id='SignupPassword'
          value={formik.values.SignupPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className='auth-input'
          type='password'
          placeholder='Password'
        />
        <button
          type='submit'
          className='auth-button mt-2 hover:scale-105 transition-all ease-in'
          style={{ backgroundColor: "#53a954" }}
        >
          Create Account
        </button>
      </form>
      Already have an account?
      <button
        onClick={changeHandler}
        className='auth-button bg-pri_orange mb-4 hover:scale-105 transition-all ease-in'
      >
        Sign in
      </button>
    </motion.div>
  );
};

export default SignupBox;
