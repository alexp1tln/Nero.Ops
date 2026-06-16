import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, FileText, Send, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CALCULATOR_SERVICES = [
  { id: 'c-1', name: 'Системный контент-маркетинг', category: 'monthly', price: 15000, desc: 'Ведение соцсетей, блога, разработка редполитики.' },
  { id: 'c-2', name: 'Performance Advertising', category: 'monthly', price: 15000, desc: 'Яндекс.Директ, VK Реклама, сквозная аналитика.' },
  { id: 'c-3', name: 'SEO & Organic Growth', category: 'monthly', price: 15000, desc: 'Поисковое продвижение и технический аудит.' },
  { id: 'c-4', name: 'SERM & Reputation', category: 'monthly', price: 5000, desc: 'Отработка негатива, мониторинг инфополя 24/7.' },
  { id: 'c-5', name: 'Корпоративный портал (MVP)', category: 'one-time', price: 3000, desc: 'Разработка многостраничного веб-сервиса под ключ.' },
  { id: 'c-6', name: 'Разработка PWA-приложения', category: 'one-time', price: 2500, desc: 'Проектирование и запуск Progressive Web App.' },
  { id: 'c-9', name: 'Разработка Telegram-ботов', category: 'one-time', price: 3000, desc: 'Проектирование и запуск умных ботов, воронки продаж и Mini Apps.' },
  { id: 'c-7', name: 'Дизайн-система & Брендинг', category: 'one-time', price: 10000, desc: 'Айдентика, логотип, руководство по стилю.' },
  { id: 'c-8', name: 'Smart UX Аудит', category: 'one-time', price: 1000, desc: 'Анализ пользовательских путей и отчет с решениями.' }
];

export function PriceCalculator({ setPage }: { setPage: (p: any) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { placeOrder, user } = useAppContext();
  
  const toggleService = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const selectedServices = CALCULATOR_SERVICES.filter(s => selected.has(s.id));
  const oneTimeTotal = selectedServices.filter(s => s.category === 'one-time').reduce((acc, curr) => acc + curr.price, 0);
  const monthlyTotal = selectedServices.filter(s => s.category === 'monthly').reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-32">
       <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] text-white/50 tracking-widest font-semibold uppercase mb-8 cursor-default shadow-[0_4px_24px_rgba(255,255,255,0.02)]">
             <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
             Customizer
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 text-white tracking-tight">Конфигуратор сметы</h2>
          <p className="text-lg text-white/60 font-light">
             Соберите прозрачный сетап услуг под задачи вашего бизнеса. Мы исключили скрытые платежи — вы управляете составом чека сами.
          </p>
       </div>

       <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative lg:items-start">
          
          {/* Main selection form (left) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div>
               <h3 className="text-2xl font-display text-white mb-6 font-medium flex items-center gap-3">
                 <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border border-white/10 text-white/80">1</span>
                 Команда и инфраструктура (Абонплата)
               </h3>
               <div className="grid sm:grid-cols-2 gap-4">
                  {CALCULATOR_SERVICES.filter(s => s.category === 'monthly').map(s => (
                    <motion.div
                       key={s.id}
                       whileHover={{ scale: 1.01 }}
                       whileTap={{ scale: 0.99 }}
                       onClick={() => toggleService(s.id)}
                       className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                         selected.has(s.id) 
                           ? 'bg-white/[0.08] border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.05)]' 
                           : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10 shadow-sm'
                       }`}
                    >
                       <div className="absolute top-6 right-6">
                         <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                           selected.has(s.id) ? 'bg-white border-white text-black' : 'border-white/20 bg-black/20 text-transparent'
                         }`}>
                           <Check className="w-3.5 h-3.5" />
                         </div>
                       </div>
                       
                       <div className="pr-10">
                         <h4 className="text-[17px] font-display font-medium text-white mb-2 leading-tight">{s.name}</h4>
                         <p className="text-sm font-light text-white/50 leading-relaxed mb-4">{s.desc}</p>
                       </div>
                       <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                         <span className="font-mono text-sm tracking-widest text-[#f5f5f7]">{s.price.toLocaleString('ru-RU')} ₽</span>
                         <span className="text-[10px] uppercase font-semibold tracking-widest text-white/30">в мес</span>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div>
               <h3 className="text-2xl font-display text-white mb-6 font-medium flex items-center gap-3">
                 <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border border-white/10 text-white/80">2</span>
                 Проектная разработка (Интеграции)
               </h3>
               <div className="grid sm:grid-cols-2 gap-4">
                  {CALCULATOR_SERVICES.filter(s => s.category === 'one-time').map(s => (
                    <motion.div
                       key={s.id}
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       onClick={() => toggleService(s.id)}
                       className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                         selected.has(s.id) 
                           ? 'bg-white/[0.08] border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.05)]' 
                           : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10 shadow-sm'
                       }`}
                    >
                       <div className="absolute top-6 right-6">
                         <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                           selected.has(s.id) ? 'bg-white border-white text-black' : 'border-white/20 bg-black/20 text-transparent'
                         }`}>
                           <Check className="w-3.5 h-3.5" />
                         </div>
                       </div>
                       
                       <div className="pr-10">
                         <h4 className="text-[17px] font-display font-medium text-white mb-2 leading-tight">{s.name}</h4>
                         <p className="text-sm font-light text-white/50 leading-relaxed mb-4">{s.desc}</p>
                       </div>
                       <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                         <span className="font-mono text-sm tracking-widest text-[#f5f5f7]">{s.price.toLocaleString('ru-RU')} ₽</span>
                         <span className="text-[10px] uppercase font-semibold tracking-widest text-white/30">Разово</span>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sticky Total Bill (right) */}
          <div className="lg:col-span-4 sticky top-24">
             <div className="glass p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-white/10">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
               
               <h3 className="text-xl font-display font-medium text-white mb-8 flex items-center gap-3">
                 <FileText className="w-5 h-5 text-white/40" />
                 Итоговая смета
               </h3>

               <div className="space-y-6 mb-8">
                 <div>
                   <div className="text-[11px] font-semibold tracking-widest text-white/50 uppercase mb-2 flex items-center justify-between">
                     Абонентская плата (Ежемесячно)
                     {monthlyTotal > 0 && <span className="text-white/80 border border-white/30 bg-white/10 px-2 py-0.5 rounded-full text-[9px]">{selectedServices.filter(s => s.category === 'monthly').length}</span>}
                   </div>
                   <div className={`text-4xl font-display font-semibold transition-all duration-300 ${monthlyTotal > 0 ? 'text-white' : 'text-white/20'}`}>
                      {monthlyTotal.toLocaleString('ru-RU')} <span className="text-xl text-white/30">₽</span>
                   </div>
                 </div>

                 <div className="w-full h-px bg-white/5"></div>

                 <div>
                   <div className="text-[11px] font-semibold tracking-widest text-white/50 uppercase mb-2 flex items-center justify-between">
                     Капитальные затраты (Разово)
                     {oneTimeTotal > 0 && <span className="text-white/80 border border-white/30 bg-white/10 px-2 py-0.5 rounded-full text-[9px]">{selectedServices.filter(s => s.category === 'one-time').length}</span>}
                   </div>
                   <div className={`text-4xl font-display font-semibold transition-all duration-300 ${oneTimeTotal > 0 ? 'text-white' : 'text-white/20'}`}>
                      {oneTimeTotal.toLocaleString('ru-RU')} <span className="text-xl text-white/30">₽</span>
                   </div>
                 </div>
               </div>

               <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-4 mb-6 shadow-inner relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/20 blur-[30px] rounded-full pointer-events-none" />
                 <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                   <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">Комплементарный бонус</span>
                 </div>
                 <p className="text-sm text-white/70 font-light leading-relaxed relative z-10">
                   При заключении SLA на 3 месяца — первый месяц управления репутацией (ответы на отзывы) <span className="text-white font-medium">включен в тариф</span>.
                 </p>
               </div>

               <AnimatePresence>
                 {selected.size > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white/5 rounded-2xl p-4 mb-8 text-xs font-light text-white/60 leading-relaxed flex items-start gap-3 border border-white/5">
                        <Info className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
                        Данный расчет не является публичной офертой. Точная смета формируется после бизнес-аудита вашей ниши и ресурсов.
                      </div>
                    </motion.div>
                 )}
               </AnimatePresence>

               <button 
                  onClick={() => {
                     if (!user) {
                       setPage('dashboard');
                       return;
                     }
                     const selectedList = CALCULATOR_SERVICES.filter(s => selected.has(s.id));
                     const total = oneTimeTotal + monthlyTotal;
                     const itemsText = selectedList.map(s => `- ${s.name}`).join('%0A');
                     const text = `Здравствуйте! Хочу заказать следующие услуги:%0A${itemsText}%0A%0AПредварительная итоговая сумма: ${total.toLocaleString('ru-RU')} ₽`;
                     const url = `https://t.me/neuro_0ps?text=${text}`;
                     
                     selectedList.forEach(s => {
                       placeOrder({
                         id: s.id,
                         title: s.name,
                         description: s.desc,
                         longDescription: '',
                         features: [],
                         iconName: 'FileText',
                         price: s.price.toString()
                       });
                     });
                     
                     window.open(url, '_blank');
                     setPage('dashboard');
                  }}
                  disabled={selected.size === 0}
                  className={`w-full py-4.5 rounded-2xl font-semibold text-[15px] transition-all flex items-center justify-center gap-2 ${
                    selected.size > 0 
                      ? 'bg-white text-black shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:bg-white/90' 
                      : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10'
                  }`}
               >
                 {selected.size > 0 ? 'Перейти к брифингу' : 'Выберите конфигурацию'}
                 {selected.size > 0 && <ArrowRight className="w-4 h-4" />}
               </button>

             </div>
          </div>
       </div>
    </div>
  );
}
