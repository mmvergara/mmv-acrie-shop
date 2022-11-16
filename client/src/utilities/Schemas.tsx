import * as yup from "yup";

const emailValidation = yup.string().email("Enter a valid email").required("Email is required.");
const passwordValidation = yup
  .string()
  .min(6, "Password minimum of 6 characters")
  .required("Password field is required.");
const usernameValidation = yup
  .string()
  .min(6, "Username Minimum of 6 characters")
  .required("Username field is required.");

export const SignupSchema = yup.object({
  SignupEmail: emailValidation,
  SignupPassword: passwordValidation,
  SignupUsername: usernameValidation,
});
export const SigninSchema = yup.object({
  SigninEmail: emailValidation,
  SigninPassword: passwordValidation,
});

export const ProductSchema = yup.object({
  prodName: yup
    .string()
    .min(6, "Product name minimum of 6 characters")
    .required("Product name field is required"),
  prodDescription: yup
    .string()
    .min(6, "Product description minimum of 6 characters")
    .required("Product description field is required"),
  prodPrice: yup.number().required('Price field is required'),
});
