import { useState } from "react";

const DummyAccount: React.FC = () => {
  const [accIsShown, setAccIsShown] = useState(false);
  const showDummyAcc = () => setAccIsShown((prev) => !prev);

  return (
    <>
      {accIsShown ? (
        <p style={{ padding: "1em" }}>
          Email: salt2@gmail.com <br /> Pass: salt1234
        </p>
      ) : (
        <p style={{ padding: "1em", cursor: "pointer" }} onClick={showDummyAcc}>
          Dummy Account here
        </p>
      )}
    </>
  );
};

export default DummyAccount;
