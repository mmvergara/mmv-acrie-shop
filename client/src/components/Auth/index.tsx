import { useState } from "react";
import SigninBox from "./Signin";
import SignupBox from "./Signup";
import { toast } from "react-toastify";

export type authType = "Signin" | "Signup";

const Auth: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<authType>("Signin");
  const setAuthHandler = (method: authType) => setAuthMethod(method);
  const toastIn = () => toast.success("Wow so easy!");
  return (
    <section className='w-screen flex items-center justify-center'>
      <button onClick={toastIn}>SHOW TOAS</button>
      {authMethod === "Signin" && <SigninBox changeMethod={setAuthHandler} />}
      {authMethod === "Signup" && <SignupBox changeMethod={setAuthHandler} />}
    </section>
  );
};

export default Auth;
