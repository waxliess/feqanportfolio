import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Instagram, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { useAppStore } from '../../store';
import DiscordWidget from '../DiscordWidget';

const DISCORD_SERVER_ID = '1349687249121312879';

const Contact: React.FC = () => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('contact');
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [setActiveSection]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Lütfen tüm zorunlu alanları doldur.');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error('E-posta servisi yapılandırılmamış. .env dosyanı kontrol et.');
      console.error('Missing EmailJS env vars', { serviceId, templateId, publicKey });
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      )
      .then(() => {
        setIsSending(false);
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Mesajın için teşekkürler! En kısa sürede geri dönüş yapacağım.',
        });
        toast.success('Mesajın gönderildi!');

        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => {
          setFormStatus({ submitted: false, success: false, message: '' });
        }, 5000);
      })
      .catch((error) => {
        setIsSending(false);
        console.error(error);
        toast.error('Bir şeyler ters gitti, lütfen tekrar dene.');
      });
  };
  
  return (
    <section id="contact" ref={containerRef} className="py-20 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">Benle iletişime geç</h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-blue-600 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Bir sorununmu var? Ya da sadece bir merhaba demek mi istiyorsun? Benimle iletişime geçmekten çekinme! Her zaman buradayım.
          </p>
        </motion.div>
        
        <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto md:grid-cols-2">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">İletişim Bilgileri</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">contact@feqan.dev</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Telefon</h4>
                    <p className="text-gray-600 dark:text-gray-400">+994 (077) 527 13 18</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Adres</h4>
                    <p className="text-gray-600 dark:text-gray-400">Bakı</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Takip Et</h3>
              
              <div className="flex space-x-4">
                <motion.a 
                  href="https://github.com/feq4n" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover
                >
                  <Github size={20} />
                </motion.a>
                
                <motion.a 
                  href="https://twitter.com/feq4n" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover
                >
                  <Twitter size={20} />
                </motion.a>
                
                <motion.a 
                  href="https://instagram.com/feqan_gerayl1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </div>
            
{/* Map or Illustration */}
<div className="relative h-64 overflow-hidden rounded-lg">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.5845985069845!2d49.86524017586665!3d40.3958983714429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d40a035a6bd%3A0xa8c2cbf267a83fbd!2zSGV5ZMmZciDGj2xpeWV2IE3JmXJryZl6aQ!5e0!3m2!1saz!2str!4v1784394250113!5m2!1saz!2str"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
    className="grayscale"
  ></iframe>
</div>
          </motion.div>

          {/* Message Form + Discord Widget */}
          <motion.div
            className="flex flex-col justify-start gap-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Mesaj Gönder</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adın"
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-transparent rounded-lg dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-posta"
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-transparent rounded-lg dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Konu"
                  className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-transparent rounded-lg dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mesajın"
                  required
                  rows={5}
                  className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-transparent rounded-lg resize-none dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:outline-none"
                />

                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={{ scale: isSending ? 1 : 1.02 }}
                  whileTap={{ scale: isSending ? 1 : 0.98 }}
                  className="flex items-center justify-center w-full gap-2 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg disabled:opacity-60 hover:bg-blue-700"
                  data-hover
                >
                  <Send size={18} />
                  {isSending ? 'Gönderiliyor...' : 'Gönder'}
                </motion.button>

                {formStatus.submitted && (
                  <p
                    className={`text-sm ${
                      formStatus.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {formStatus.message}
                  </p>
                )}
              </form>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Discord'da Bul</h3>
              <DiscordWidget serverId={DISCORD_SERVER_ID} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;