import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import DashboardLinks from "./sub-components/DashboardLinks";
const Dashboard: React.FC = () => {
  const auth = useAuth();
  return (
    <section className='w-screen flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, x: -900, scale: 0.3 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        className='auth-container'
      >
        <img
          src={auth?.userAuthInfo?.userpic_url || "https://i.ibb.co/BBD7sZQ/aaa.png"}
          alt='user'
          className='h-14 w-14 rounded-full  shadow-pri_orange '
        />
        <p>Hello {auth?.userAuthInfo?.username}!</p>
        <p>What would you like to do?</p>
        <DashboardLinks />
      </motion.div>
    </section>
  );
};

export default Dashboard;
