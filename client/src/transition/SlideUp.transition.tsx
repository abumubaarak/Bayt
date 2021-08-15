import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { FC } from "react";
interface Props {
  children: ReactNode;
  setMarginBottom?: boolean;
 }
const SlideUp: FC<Props> = ({ children, setMarginBottom }) => {
  return (
    <motion.div
      className={`w-full ${setMarginBottom ? "mb-28" : ""}`}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -12 }}
      transition={{ ease: "easeIn", duration: 0.7 }}
      
    >
      {children}
    </motion.div>
  );
};

export default SlideUp;
