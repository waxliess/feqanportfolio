import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaCode, FaStar } from 'react-icons/fa';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useAppStore } from '../../store';

interface Milestone {
  title: string;
  project: string;
  date: string;
  isCurrent?: boolean;
  stack: string[];
  points: string[];
}

/**
 * Real project milestones instead of fabricated employers.
 * Update this list as new projects ship — keep dates approximate ("Temmuz 2026")
 * rather than exact if you're not sure.
 */
const milestones: Milestone[] = [
  {
    title: 'Discord Bot Geliştirme',
    project: 'feqan-whatsapp-bot',
    date: 'Temmuz 2026 - Devam ediyor',
    isCurrent: true,
    stack: ['Node.js', 'discord.js v14', 'Groq API'],
    points: [
      'WhatsApp AI bot için Groq API anahtar rotasyonuna zorunlu doğrulama eklendi.',
      'Discord üzerinden slash komutlarla çalışan tam bir anahtar yönetim sistemi kuruldu.',
      'Webhook tabanlı loglama yerine discord.js v14 ile gerçek zamanlı durum paneli geliştirildi.',
    ],
  },
  {
    title: 'Açık Kaynak Yayın',
    project: 'durum-rol & CineSync',
    date: '2026',
    stack: ['Node.js', 'Express', 'Socket.io', 'discord.js'],
    points: [
      'durum-rol Discord botu, GitHub üzerinde açık kaynak olarak yayınlanmak üzere düzenlendi.',
      'CineSync projesi temizlenip Feq4n kimliği altında MIT lisansıyla paylaşıldı.',
    ],
  },
  {
    title: 'Full-Stack Web Projeleri',
    project: 'Verax Cloud & Anka Host',
    date: '2026',
    stack: ['Next.js', 'Prisma', 'Vercel'],
    points: [
      'Next.js tabanlı bulut barındırma demo platformu Vercel dağıtımına hazırlandı.',
      'Türkçe bir hosting şirketi sitesi (Anka Host) sıfırdan Next.js ile geliştirildi.',
    ],
  },
  {
    title: 'Sistem Mimarisi & Planlama',
    project: 'Aile Hesap Yönetim Platformu',
    date: '2026',
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'Socket.IO'],
    points: [
      '2FA, uçtan uca şifreleme ve altı fazlı yol haritasıyla tam bir mimari planlandı.',
      'Windows VDS ortamına uyarlanarak Memurai, Caddy ve NSSM/PM2 ile yeniden yapılandırıldı.',
    ],
  },
];

const MilestoneCard: React.FC<{ milestone: Milestone }> = ({ milestone }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: milestone.isCurrent
        ? 'rgba(145, 94, 255, 0.12)'
        : 'rgba(100, 116, 139, 0.08)',
      color: 'inherit',
      boxShadow: milestone.isCurrent
        ? '0 0 30px rgba(145, 94, 255, 0.35), 0 4px 6px -1px rgba(0,0,0,0.1)'
        : '0 4px 6px -1px rgba(0,0,0,0.08)',
      borderRadius: '16px',
      border: milestone.isCurrent
        ? '2px solid rgba(145, 94, 255, 0.4)'
        : '1px solid rgba(148, 163, 184, 0.2)',
    }}
    contentArrowStyle={{ borderRight: '7px solid rgba(100, 116, 139, 0.15)' }}
    date={
      <span className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 font-mono">
        <FaCalendarAlt /> {milestone.date}
        {milestone.isCurrent && (
          <span className="ml-1 px-2 py-0.5 bg-[#915eff] text-white text-[10px] font-bold rounded-full uppercase animate-pulse">
            Devam Ediyor
          </span>
        )}
      </span>
    }
    iconStyle={{ background: '#915EFF' }}
    icon={
      <div className="flex items-center justify-center w-full h-full text-white">
        <FaCode />
      </div>
    }
  >
    <h3 className="text-lg font-bold tracking-wide text-gray-900 dark:text-white">
      {milestone.title}
    </h3>
    <p className="text-[#915eff] font-medium text-sm mt-1">{milestone.project}</p>

    <div className="flex flex-wrap gap-2 mt-4">
      {milestone.stack.map((tech) => (
        <span
          key={tech}
          className="flex items-center gap-1 bg-[#915eff1a] text-[#915eff] text-[11px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-[#915eff33] font-mono"
        >
          <FaStar className="text-[9px]" /> {tech}
        </span>
      ))}
    </div>

    <ul className="mt-4 space-y-2 list-none">
      {milestone.points.map((point, i) => (
        <li
          key={i}
          className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience: React.FC = () => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection('experience');
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [setActiveSection]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-20 bg-white dark:bg-slate-900"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="flex items-center justify-center gap-3 mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            <FaBriefcase className="text-[#915eff]" /> Yol Haritam
          </h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-[#915eff] rounded-full" />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Son dönemde üzerinde çalıştığım başlıca projeler ve kilometre taşları.
          </p>
        </motion.div>

        <VerticalTimeline lineColor="#915EFF33">
          {milestones.map((milestone) => (
            <MilestoneCard key={milestone.project} milestone={milestone} />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;
