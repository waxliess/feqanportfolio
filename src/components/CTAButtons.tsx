import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Download } from 'lucide-react';

const CTAButtons: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY <= 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-30 flex flex-col items-end gap-3 top-24 right-4 md:right-8"
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.button
            onClick={handleViewWork}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium text-sm shadow-lg bg-[#915eff] hover:bg-[#7c4ce0] transition-colors"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Projelerimi görüntüle"
          >
            <Rocket size={16} />
            <span>Projelerimi Gör</span>
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium shadow-md bg-white/90 dark:bg-slate-800/90 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:-translate-y-0.5 transition-transform"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Özgeçmişimi indir"
          >
            <Download size={16} />
            <span>CV İndir</span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CTAButtons;
