import { useState } from "react";
import SigninBox from "./Signin";
import SignupBox from "./Signup";

export type authType = "Signin" | "Signup";

const Auth: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<authType>("Signin");
  const setAuthHandler = (method: authType) => setAuthMethod(method);

  return (
    <section className='w-screen flex items-center justify-center'>
      {authMethod === "Signin" && <SigninBox changeMethod={setAuthHandler} />}
      {authMethod === "Signup" && <SignupBox changeMethod={setAuthHandler} />}
    </section>
  );
};

export default Auth;
