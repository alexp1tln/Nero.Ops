import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { InteractiveCard } from '../components/InteractiveCard';

export function Contact() {
  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen bg-transparent relative">
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="mb-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-white/50 tracking-widest font-semibold uppercase mb-10 shadow-[0_4px_24px_rgba(255,255,255,0.02)] cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Контакты
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-semibold text-white tracking-tight mb-8">Будем на связи</h1>
        <p className="text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
          Готовы обсудить структуру Вашего проекта или провести аудит текущей инфраструктуры.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <InteractiveCard className="glass-panel p-8 text-center group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 text-white/50 border border-white/10 mx-auto mb-6 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-lg font-display font-medium text-white mb-2">+7 (900) 903-69-43</div>
              <div className="text-xs text-white/50 uppercase tracking-widest">Ежедневно, 10:00 - 19:00</div>
            </InteractiveCard>

            <a href="https://t.me/NEURO_0PS" target="_blank" rel="noopener noreferrer" className="block">
              <InteractiveCard className="glass-panel p-8 text-center group h-full transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-white/5 text-white/50 border border-white/10 mx-auto mb-6 flex items-center justify-center group-hover:text-white transition-colors">
                  <Send className="w-6 h-6" />
                </div>
                <div className="text-lg font-display font-medium text-white mb-2">Связаться с менеджером</div>
                <div className="text-xs text-white/50 uppercase tracking-widest text-[#2AABEE]">@NEURO_0PS</div>
              </InteractiveCard>
            </a>
          </div>
        </div>

        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full pointer-events-none" />
          <h3 className="text-2xl font-display font-medium text-white mb-8 relative z-10">Оставьте заявку</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
