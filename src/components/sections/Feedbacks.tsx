import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/**
 * PLACEHOLDER CONTENT — replace with real client/user feedback before
 * publishing. Keeping fabricated names or quotes on a live site would be
 * misleading, so each card is explicitly labeled "Örnek" until edited.
 */
const testimonials: Testimonial[] = [
  {
    quote: 'Discord bot altyapımızı kısa sürede stabil hale getirdi, iletişimi hep net tuttu.',
    name: 'Örnek Müşteri',
    role: 'Sunucu Sahibi',
  },
  {
    quote: 'WhatsApp entegrasyonunu uçtan uca kurup canlıya aldı, sonrasında da destek verdi.',
    name: 'Örnek Müşteri',
    role: 'Küçük İşletme Sahibi',
  },
  {
    quote: 'Next.js projemizin performans sorunlarını hızlıca tespit edip çözdü.',
    name: 'Örnek Müşteri',
    role: 'Girişimci',
  },
];

const FeedbackCard: React.FC<{ testimonial: Testimonial; index: number }> = ({
  testimonial,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="relative w-full p-8 transition-all duration-300 border shadow-lg bg-gray-50 dark:bg-slate-800/60 rounded-2xl border-gray-200/70 dark:border-white/5 hover:-translate-y-1 hover:shadow-xl"
  >
    <span className="absolute px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full top-4 right-4 bg-[#915eff1a] text-[#915eff] border border-[#915eff33]">
      Örnek
    </span>

    <FaQuoteLeft className="text-[#915eff] text-2xl mb-4" />
    <p className="font-light leading-relaxed text-gray-800 dark:text-gray-200">
      {testimonial.quote}
    </p>

    <div className="flex flex-col pt-4 mt-6 border-t border-gray-200 dark:border-white/5">
      <span className="text-[#915eff] font-semibold text-sm">{testimonial.name}</span>
      <span className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
        {testimonial.role}
      </span>
    </div>
  </motion.div>
);

const Feedbacks: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-slate-950/40">
      <div className="container px-4 mx-auto">
        <motion.div
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Yorumlar
          </h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-[#915eff] rounded-full" />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Gerçek müşteri/kullanıcı geri bildirimlerinle bu bölümü güncelle.
          </p>
        </motion.div>

        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FeedbackCard key={t.name + i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;
