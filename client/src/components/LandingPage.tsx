import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const LandingPage: React.FC = () => {
  return (
    <motion.section
      animate={{
        opacity: [0, 1],
        rotateX: [150, 360],
        rotateY: [150, 360],
      }}
      className=' mx-auto flex align-center justify-center '
    >
      <article className='bg-darkNavprimary p-2 m-1 max-w-[500px] text-center rounded-md'>
        <h1 className='text-3xl mb-4'>Welcome to Acrie Shop</h1>
        <p className='mb-4'>
          Acrie Shop is a web app made by: Vergara, Mark Matthew. <br /> Simulating a E-commerce
          website to practice <br /> React w/TS, NodeJS w/TS, Tailwind CSS, Framer Motion and most
          importantly PostgreSQL without using any ORM like Sequalize. <br /> It features self-made
          models for the database queries.
        </p>
        <Link to='/auth'>
          <button className='auth-button bg-pri_orange'>Login</button>
        </Link>
        <button className='auth-button bg-purple-500'>Developer Docs</button>
      </article>
    </motion.section>
  );
};

export default LandingPage;
