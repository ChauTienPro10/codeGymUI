import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface InfoBoxProps {
  title: string;
  color: string; // class tailwind ví dụ: 'bg-green-500'
}

export const boxVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const InfoBox: React.FC<InfoBoxProps> = ({ title, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`flex-1 p-4 rounded shadow text-white ${color}`}
      variants={boxVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {title}
    </motion.div>
  );
};

export default InfoBox;
