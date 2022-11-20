import { authType } from ".";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { SigninSchema } from "../../utilities/Schemas";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { postLogin } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";
interface props {
  changeMethod: (method: authType) => void;
}
const SigninBox: React.FC<props> = ({ changeMethod }: props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const changeHandler = () => changeMethod("Signup");
  const signInHandler = async () => {
    const loginData = {
      email: formik.values.SigninEmail,
      password: formik.values.SigninPassword,
    };
    const result = await postLogin(loginData);
    auth?.setUserAuthInfo("login", result.data.data);
    toast.success("Logged in Successfully");
    navigate("/");
    return;
  };

  const formik = useFormik({
    initialValues: {
      SigninEmail: "salt2@gmail.com",
      SigninPassword: "salt1234",
    },
    validationSchema: SigninSchema,
    onSubmit: signInHandler,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className='auth-container'
    >
      <h2 className='text-3xl my-4'>Acrie | Sign in</h2>
      <form onSubmit={formik.handleSubmit} className='mb-4'>
        <div className='text-red-300'>
          <p>{formik.touched.SigninEmail && formik.errors.SigninEmail}</p>
          <p>{formik.touched.SigninPassword && formik.errors.SigninPassword}</p>
        </div>
        <input
          name='SigninEmail'
          id='SigninEmail'
          value={formik.values.SigninEmail}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className='auth-input'
          type='email'
          placeholder='Email'
        />
        <input
          name='SigninPassword'
          id='SigninPassword'
          value={formik.values.SigninPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          className='auth-input'
          type='password'
          placeholder='Password'
        />
        <button type='submit' className='auth-button bg-pri_orange mt-2 hover:scale-105 transition-all ease-in'>
          Sign in
        </button>
      </form>
      New here?
      <button
        onClick={changeHandler}
        className='auth-button mb-4 hover:scale-105 transition-all ease-in'
        style={{ backgroundColor: "#53a954" }}
      >
        Create Account
      </button>
    </motion.div>
  );
};

export default SigninBox;
