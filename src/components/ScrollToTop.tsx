import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Başa dön"
          className="fixed z-40 flex items-center justify-center bottom-8 right-8 group"
        >
          <svg
            className="absolute w-[64px] h-[64px] -rotate-90 pointer-events-none drop-shadow-[0_0_10px_rgba(145,94,255,0.4)]"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              className="text-gray-200 dark:text-slate-700"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              stroke="#915EFF"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          <div className="relative z-10 flex items-center justify-center w-12 h-12 transition-colors border rounded-full shadow-md bg-white/90 dark:bg-slate-800/90 border-[#915eff]/30 backdrop-blur-md group-hover:bg-[#915eff]">
            <ArrowUp
              size={20}
              className="text-[#915eff] group-hover:text-white transition-colors"
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
