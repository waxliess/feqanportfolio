import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Loader2 } from 'lucide-react';

interface DiscordWidgetProps {
  serverId: string;
  className?: string;
}

const DiscordWidget: React.FC<DiscordWidgetProps> = ({ serverId, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-slate-700/60 dark:bg-slate-800 ${className || ''}`}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#5865F2] to-[#7289DA]">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
          <MessageCircle size={18} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Discord Sunucusu</h3>
          <p className="text-xs text-white/80">Aramıza katıl, birlikte sohbet edelim</p>
        </div>
      </div>

      {/* Widget */}
      <div className="relative bg-[#313338]" style={{ minHeight: 420 }}>
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
            <Loader2 size={22} className="animate-spin" />
            <span className="text-xs">Discord widget yükleniyor...</span>
          </div>
        )}
        <iframe
          src={`https://discordapp.com/widget?id=${serverId}&theme=dark`}
          width="100%"
          height="420"
          allowTransparency
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          onLoad={() => setLoaded(true)}
          className="discord-widget-frame relative z-10"
          title="Discord Sunucu Widget'ı"
        />
      </div>
    </motion.div>
  );
};

export default DiscordWidget;
