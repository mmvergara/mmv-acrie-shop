import * as yup from "yup";

const emailValidation = yup.string().email("Enter a valid email").required("Email is required.");
const passwordValidation = yup
  .string()
  .min(6, "Password minimum of 6 characters")
  .max(30, "Password maximum of 30 characters")
  .required("Password field is required.");
const usernameValidation = yup
  .string()
  .min(6, "Username Minimum of 6 characters")
  .max(30, "Username maximum of 30 characters")
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
    .max(30, "Product name maximum of 30 characters")
    .required("Product name field is required"),
  prodDescription: yup
    .string()
    .min(6, "Product description minimum of 6 characters")
    .max(600, "Product description maximum of 600 characters")
    .required("Product description field is required"),
  prodPrice: yup.number().required("Price field is required"),
});
