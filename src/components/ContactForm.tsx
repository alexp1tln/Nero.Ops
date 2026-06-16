import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const contacts = formData.get('contacts') as string;
    const task = formData.get('task') as string;

    const message = `Новая заявка:\n\nИмя и Компания: ${name}\nКонтакты: ${contacts}\n\nБизнес-задача / Бриф:\n${task}`;
    const url = `https://t.me/NEURO_0PS?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white/[0.03] p-8 mt-5 md:p-10 rounded-3xl border border-white/10 shadow-inner backdrop-blur-md w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/5 z-0" />
      
      {!submitted ? (
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit} 
          className="relative z-10 space-y-6 w-full"
        >
          <div className="mb-8 text-left border-b border-white/10 pb-6">
            <h3 className="text-2xl font-display font-semibold text-white mb-2">Обсудить проект</h3>
            <p className="text-white/50 font-light text-sm">Оставьте контактные данные, руководитель направления свяжется с вами.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 ml-1">Имя и Компания</label>
              <input name="name" required type="text" className="w-full bg-black/40 border border-white/10 focus:border-white/50 focus:bg-white/5 transition-all outline-none rounded-xl px-4 py-3 text-white text-[15px] placeholder-white/20" placeholder="Иван Озеров, TechCorp" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 ml-1">Контакты</label>
              <input name="contacts" required type="text" className="w-full bg-black/40 border border-white/10 focus:border-white/50 focus:bg-white/5 transition-all outline-none rounded-xl px-4 py-3 text-white text-[15px] placeholder-white/20" placeholder="ivan@domain.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 ml-1">Бизнес-задача / Бриф</label>
            <textarea name="task" rows={4} className="w-full bg-black/40 border border-white/10 focus:border-white/50 focus:bg-white/5 transition-all outline-none rounded-xl px-4 py-3 text-white text-[15px] placeholder-white/20 resize-none" placeholder="Краткое описание текущей ситуации и целей..." />
          </div>
          
          <button type="submit" className="w-full bg-purple-600 text-white hover:bg-purple-500 font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 mt-2">
            Отправить запрос
            <Send className="w-4 h-4 ml-1" />
          </button>
        </motion.form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center space-y-5 mx-auto h-full py-16 relative z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-display font-medium text-white">Заявка получена</h3>
          <p className="text-white/50 font-light text-sm max-w-[260px]">Аналитик рассмотрит запрос и свяжется с вами в течение дня.</p>
        </motion.div>
      )}
    </div>
  );
}
