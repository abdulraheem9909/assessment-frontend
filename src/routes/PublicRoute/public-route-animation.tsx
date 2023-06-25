import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PublicRouteAnimation = ({ children }: any) => {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const pageTransition = {
    type: "spring",
    ease: "linear",
    duration: 2,
  };
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      variants={pageVariants}
      transition={pageTransition}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 0.99 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default PublicRouteAnimation;
