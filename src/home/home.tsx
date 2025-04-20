import React, { useEffect, useState } from 'react';
import './home.scss';
import '../taiwind.css';
import { motion, AnimatePresence  } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';

const containerVariants = {
  hidden: { opacity: 0, x: '-100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 25,
      duration: 1.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 25,
      duration: 1.5,
    },
  },
};

const showItemByOpacity = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 5,
    },
  },
}

const itemVariantsFromLeft = {
  hidden: { opacity: 0, x: '-100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 1,
    },
  },
};

const itemVariantsFromRight = {
  hidden: { opacity: 0, x: '100%' }, // từ phải vào
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 1,
    },
  },
};

const code = `
public class Main {
  public static void main(String[] args) {
    String name = "Welcome to RocketCoding!";
    System.out.println("Hello, " + name + "!");
  }
}`;

const Home: React.FC = () => {
  const characters = code.split("");
  useEffect(() => {
    AOS.init({
      // duration: 1000, 
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const [showMouse, setShowMouse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMouse(false), 3000); // 3 giây sau ẩn đi
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white px-6 pb-40">
      <div className='flex min-w-screen justify-center'>
        <motion.div
          className="h-[500px] max-w-3xl  pt-24 pb-12 px-6  bg-neutral-800 shadow-lg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="text-3xl font-bold mb-4">
            🧠 Giới thiệu về RocketCoding
          </h2>
          <p className="text-neutral-300 text-lg">
            CodePlay là nền tảng giúp lập trình viên thực hành và chia sẻ code với biên dịch động,
            không cần cài đặt gì cả.
          </p>
        </motion.div>
        <div className="bg-neutral-900 text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap ml-10">
          <div>
            {characters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.03, // delay mỗi ký tự
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-2 relative">
              <AnimatePresence>
                {showMouse && (
                  <motion.span
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{x: 0 }}
                    transition={{
                      x: { duration: 2, ease: "easeOut", repeat: Infinity, delay: 3 },
                      opacity: { duration: 1 },
                    }}
                    className="absolute left-7 top-7"
                  >
                    <FontAwesomeIcon icon={faMousePointer} className="text-white text-lg" />
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
                initial="hidden"
                animate="visible"
                variants={showItemByOpacity}
              >
                Run
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="h-[500px] flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-5xl font-bold mb-6" variants={itemVariantsFromLeft}>
          👋 Welcome to RocketCoding
        </motion.h1>

        <motion.p
          className="text-lg mb-8 text-neutral-400 text-center max-w-xl"
          variants={itemVariantsFromRight}
        >
          Build, test and share your code easily with an interactive playground.
        </motion.p>

        <motion.button
          variants={itemVariants}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-transform"
        >
          Bắt đầu ngay
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
