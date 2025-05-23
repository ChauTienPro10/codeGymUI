import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './home.scss';
import '../taiwind.css';
import { motion, AnimatePresence  } from 'framer-motion';
import colorTransitionVariants from '../ultils/ColorTransitionBox';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';
import InfoBox from './InfoBox';
import Lottie from 'lottie-react';
import animationData from './cat-walking.json';
import { useIsAuthenticated } from '../use_features/useIsAuthenticated';


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
    String name = "Welcome to CodeGym";
    System.out.println("Hello, " + name + "!");
  }
}`;

const Home: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const characters = code.split("");
  useEffect(() => {
    AOS.init({
      // duration: 1000, 
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleStart = () => {
    if (isAuthenticated) {
      navigate("/editor/1");
    } else {
      navigate("/signup");
    }
  }

  const [showMouse, setShowMouse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMouse(false), 3000); // 3 giây sau ẩn đi
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white px-6 pb-40">
      <div className="flex flex-col lg:flex-row min-w-screen justify-center items-center px-4 py-8">
        {/* Left Panel */}
        <motion.div
          className="w-full lg:max-w-3xl min-h-[500px] h-auto pt-10 pb-8 px-6 bg-neutral-800 shadow-lg mb-10 lg:mb-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            🧠 Giới thiệu về CodeGym
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            CodeGym là nền tảng giúp lập trình viên thực hành và chia sẻ code với biên dịch động,
            không cần cài đặt gì cả.
          </p>
        </motion.div>

        {/* Right Panel */}
        <div className="bg-neutral-900 text-green-400 w-full min-h-[500px] lg:w-auto p-6 rounded-lg font-mono text-sm whitespace-pre-wrap lg:ml-10">
          <div>
            {characters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.03,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <div className="flex items-center gap-2 relative">
              <AnimatePresence>
                {showMouse && (
                  <motion.span
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ x: 0 }}
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
                onClick={() => setShowResult(true)}
              >
                Run
              </motion.button>
            </div>
          </div>

          <motion.div
            className="h-[50px] flex justify-start items-center border border-gray-400 rounded-md mt-10 p-5"
            initial="hidden"
            animate="visible"
            variants={colorTransitionVariants}
          >
            <p className="text-white font-bold">Kết quả</p>
          </motion.div>

          {showResult && (
            <p className="mt-6 text-white text-base">Hello, Welcome to CodeGym!</p>
          )}
        </div>
      </div>

      {/* Băt đầu trải nghiệm */}
      <motion.div
        className="h-auto min-h-[400px] flex flex-col items-center justify-center px-4"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl sm:text-5xl font-bold mb-6 text-center"
          variants={itemVariantsFromLeft}
        >
          👋 Welcome to CodeGym
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg mb-8 text-neutral-400 text-center max-w-md sm:max-w-xl"
          variants={itemVariantsFromRight}
        >
          Build, test and share your code easily with an interactive playground.
        </motion.p>

        <motion.button
          variants={itemVariants}
          className="px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-transform"
          onClick={() => handleStart()}
        >
          {isAuthenticated ? 'Bắt đầu đơn giản' : 'Bắt đầu ngay'}
        </motion.button>
      </motion.div>

      {/* show info */}

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <InfoBox title="Thuật toán" color="bg-gradient-to-r from-blue-500/50 to-transparent" />
        <InfoBox title="Giải quyết vấn đề " color="bg-gradient-to-r to-blue-500/50 from-transparent" />
        <InfoBox title="Leet code" color="bg-gradient-to-r from-blue-500/50 to-transparent" />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-28 h-28 md:w-60 md:h-60">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <div className="flex-1 h-20 p-4 bg-gray-500 rounded">
          <InfoBox title="Xếp hạng code thủ" color="bg-transparent text-sm sm:w-full md:w-1/3 p-4 truncate" />
        </div>
      </div>

    </div>
  );
};

export default Home;
