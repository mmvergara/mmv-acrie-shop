import { useState } from "react";

const DummyAccount: React.FC = () => {
  const [accIsShown, setAccIsShown] = useState<boolean>(false);
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
          <p className='bg-white opacity-50 text-red-700 font-bold'>
            note: this website uses free postgre  db service and at every 20th+ of the month the server might be down
          </p>
        </p>
      )}
    </>
  );
};

export default DummyAccount;
