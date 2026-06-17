import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const faqs = [
    {
      q: "Как быстро вы можете приступить к проекту?",
      a: "Наша инфраструктура позволяет интегрировать in-house команду в ваш процесс за 48 часов после подписания контракта и оплаты первого этапа."
    },
    {
      q: "Работаете ли вы по NDA?",
      a: "Абсолютно. Более 85% наших проектов находятся под строгим NDA. Вся информация остается строго внутри контура Neuro.Ops, обеспечивая полную безопасность ваших данных."
    },
    {
      q: "Можно ли отказаться от услуги в процессе работы?",
      a: "Да, мы предоставляем гибкие SLA контракты. Вы можете зафиксировать остановку или заморозку проекта с уведомлением за определенный период (обычно 14-30 дней)."
    },
    {
      q: "Как мы будем общаться с командой?",
      a: "Личное взаимодействие и единый защищенный Client Dashboard. Там вы видите статусы всех задач, там же находится прямой чат с вашим выделенным менеджером проекта."
    },
    {
      q: "Как вы гарантируете качество?",
      a: "Многоуровневая приемка внутри нашего департамента. До клиента доходит только тот результат, который прошел независимый контроль качества (Quality Assurance) старших специалистов."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 max-w-5xl mx-auto px-4 sm:px-6 w-full min-h-screen bg-transparent relative">
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="mb-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-white/50 tracking-widest font-semibold uppercase mb-10 shadow-[0_4px_24px_rgba(255,255,255,0.02)] cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Частые вопросы
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-semibold text-white tracking-tight">Прозрачность процессов</h1>
      </motion.div>

      <div className="space-y-4 relative z-10">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              key={i}
              className={`border border-white/10 rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer backdrop-blur-xl ${isOpen ? 'bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(255,255,255,0.05)] border-white/20' : 'bg-white/[0.02] hover:bg-white/[0.04]'}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className="px-8 py-7 flex items-center justify-between gap-6">
                <h3 className={`text-xl md:text-2xl font-display font-medium transition-colors duration-500 ${isOpen ? 'text-white/90' : 'text-white'}`}>
                  {faq.q}
                </h3>
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-white/10 text-white/90 border border-white/30 rotate-180' : 'bg-white/5 text-white/50 border border-white/10 rotate-0'}`}>
                  {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-lg font-light text-white/60 leading-relaxed pt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
