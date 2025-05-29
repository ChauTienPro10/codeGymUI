import { motion } from 'framer-motion';


const colorTransitionVariants = {
    hidden: { backgroundColor: "#10B981" },
    visible: {
        backgroundColor: [
            "#FF0000", "#FF7F00", "#FFFF00",
            "#00FF00", "#0000FF", "#4B0082",
            "#8B00FF", "#FF0000"
          ],
        transition: {
        backgroundColor: {
          duration: 14,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
      },
    },
  };

export default colorTransitionVariants;