import * as yup from "yup";

const emailValidation = yup.string().email("Enter a valid email").required("Email is required.");
const passwordValidation = yup
  .string()
  .min(6, "Password Minimum of 6 characters")
  .required("Password field is required.");

export const SignupSchema = yup.object({
  SignupEmail: emailValidation,
  SignupPassword: passwordValidation,
  SignupUsername: yup
    .string()
    .min(6, "Username Minimum of 6 characters")
    .required("Username field is required."),
});
export const SigninSchema = yup.object({
  SigninEmail: emailValidation,
  SigninPassword: passwordValidation,
});
