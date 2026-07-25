import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudSun, Moon, type LucideIcon } from 'lucide-react';

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [Icon, setIcon] = useState<LucideIcon>(() => Sun);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Günaydın');
      setIcon(() => Sun);
    } else if (hour < 18) {
      setGreeting('İyi günler');
      setIcon(() => CloudSun);
    } else {
      setGreeting('İyi akşamlar');
      setIcon(() => Moon);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      className="fixed z-10 hidden top-28 right-6 sm:block"
    >
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#915eff] to-[#7c4ce0] shadow-xl">
        <div className="flex items-center gap-3 px-5 py-3 border rounded-[15px] bg-white/90 dark:bg-slate-900/90 border-gray-200/70 dark:border-white/10 backdrop-blur-xl">
          <Icon size={22} className="text-[#915eff]" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Hoş geldin
            </span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {greeting}!
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Greeting;
