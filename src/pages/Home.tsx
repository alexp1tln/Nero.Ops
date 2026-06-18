import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, LayoutTemplate, MessageSquare, ShieldCheck, Zap, Globe2, Cpu, Layers, Box, Hexagon, Component, BringToFront, X, Phone } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { FadeInText } from '../components/FadeInText';
import { InteractiveCard } from '../components/InteractiveCard';
import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';

export function Home({ setPage }: { setPage: (page: any) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSlideIn, setShowSlideIn] = useState(false);
  const [widgetDismissed, setWidgetDismissed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled > 45%, if not dismissed
      if (!widgetDismissed && window.scrollY > window.innerHeight * 0.45) {
        setShowSlideIn(true);
      } else {
        setShowSlideIn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [widgetDismissed]);

  const painPoints = [
    { icon: Zap, title: "Предел пропускной способности", desc: "Увеличение штата ведет к росту фонда оплаты труда и замедлению процессов, а не к росту выручки." },
    { icon: MessageSquare, title: "Низкий SLA подрядчиков", desc: "Агентства и фрилансеры не погружаются в бизнес-модель, срывают дедлайны и не несут ответственности." },
    { icon: LayoutTemplate, title: "Разрозненность инфраструктуры", desc: "Аналитика в Excel, задачи в мессенджерах, дизайн-документы на разрозненных дисках." },
  ];

  const solutions = [
    { icon: ShieldCheck, title: "Гарантированный уровень сервиса", desc: "Закрепляем сроки, метрики и финансовую ответственность за проектами в договоре SLA." },
    { icon: Globe2, title: "Консолидация процессов", desc: "Предоставляем единое IT-решение для отслеживания хода проектов, бюджетов в Neuro Portal." },
    { icon: CheckCircle2, title: "Высокая плотность талантов", desc: "124 штатных специалиста уровня Middle+ и Senior в синхронизированных командах." },
  ];

  const processSteps = [
    { number: "01", title: "Технический и бизнес аудит", desc: "Проводим анализ показателей, находим узкие места в воронке." },
    { number: "02", title: "Проектирование решения", desc: "Формируем выделенную команду и дорожную карту внедрения." },
    { number: "03", title: "Бесшовная интеграция", desc: "Разворачиваем процессы внутри компании через наши фреймворки." },
    { number: "04", title: "Поддержка", desc: "Обеспечиваем непрерывную эксплуатацию и улучшение показателей." }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-transparent pb-20 blueprint-grid">
      <SEO />
      
      {/* High-Tech Blueprint Side Indicators (Executive Perspective) */}


      {/* Hero Section */}
      <section className="relative pt-32 pb-24 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-40 flex flex-col justify-center min-h-[90vh] sm:min-h-[95vh] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Abstract Geometric Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.18] mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)', maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)' }}>
           <img 
              src="https://images.unsplash.com/photo-1531297172-a1a10408544d?q=60&w=800&auto=format&fit=crop" 
              alt="Gothic Cyberpunk Minimalist Background" 
              className="w-full h-full object-cover object-center translate-y-[-5%] scale-110 filter grayscale contrast-[1.4] brightness-[0.45] select-none pointer-events-none"
              loading="lazy"
              decoding="async"
           />
           <div className="absolute inset-0 bg-[#000] opacity-40 mix-blend-multiply"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]"></div>
           
           {/* Fine Engineering Blueprint Axis Lines */}
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-purple-500/20" />
           <div className="absolute left-1/3 top-0 h-full w-[1px] bg-purple-500/20" />
           <div className="absolute left-2/3 top-0 h-full w-[1px] bg-purple-500/20" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full glass border border-purple-500/20 text-xs text-purple-400 font-mono tracking-[0.12em] uppercase mb-12 shadow-[0_4px_24px_rgba(168,85,247,0.15)] cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse" />
            B2B IT-Integration & Operations
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.2rem] sm:text-7xl lg:text-[5.5rem] font-display font-semibold tracking-wide mb-6 sm:mb-8 max-w-5xl leading-[1.15] sm:leading-[1.05]"
          >
            <span className="premium-gradient-text">Системное развитие</span> <br className="hidden md:block" />
            <span className="text-white/45 block mt-2 text-purple-200/90 [text-shadow:0_0_40px_rgba(168,85,247,0.25)] break-words hyphens-auto sm:break-normal">цифровой инфраструктуры.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/55 mb-14 max-w-3xl font-light leading-relaxed tracking-wide"
          >
            Заменяем нестабильный аутсорс и раздутый штат на прогнозируемый In-House департамент компетенций с финансовыми гарантиями.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto"
          >
            <button 
              onClick={() => setPage('catalog')}
              className="bg-purple-600 text-white hover:bg-purple-500 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-sm transition-all shadow-[0_4px_14px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-3 w-full sm:w-auto font-mono tracking-[0.05em]"
            >
              Изучить решения
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Corporate Ticker (Trusted By) */}
      <section className="py-12 overflow-hidden relative border-y border-white/[0.05] bg-white/[0.01]">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-20">
          <p className="text-xs uppercase tracking-widest text-white/40 font-semibold text-center">Используют лидеры рынка</p>
        </div>
        <div className="flex w-[200%] animate-marquee opacity-50 hover:opacity-100 transition-opacity duration-500">
           {/* Duplicate the list twice for seamless looping */}
           <div className="flex flex-1 justify-around items-center px-10 gap-20">
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><Hexagon className="w-5 h-5"/> FinTech Solutions</div>
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><Box className="w-5 h-5"/> National Retail</div>
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><Component className="w-5 h-5"/> Aero Logistica</div>
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><BringToFront className="w-5 h-5"/> BuildGroup</div>
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><Layers className="w-5 h-5"/> DataSystems</div>
           </div>
           <div className="flex flex-1 justify-around items-center px-10 gap-20">
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><Hexagon className="w-5 h-5"/> FinTech Solutions</div>
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><Box className="w-5 h-5"/> National Retail</div>
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><Component className="w-5 h-5"/> Aero Logistica</div>
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><BringToFront className="w-5 h-5"/> BuildGroup</div>
             <div className="flex items-center gap-2 font-display text-xl whitespace-nowrap font-medium text-white"><Layers className="w-5 h-5"/> DataSystems</div>
           </div>
        </div>
      </section>

      {/* Corporate Stats */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="glass-panel p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 text-center sm:text-left">
            {[
              { label: 'Реализованных контрактов', val: '850+' },
              { label: 'Профильных IT-специалистов', val: '124' },
              { label: 'SLA Compliant Ratio', val: '99.8%' },
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                key={i} 
                className="flex flex-col"
              >
                <div className="text-4xl md:text-5xl font-display font-semibold premium-gradient-text mb-4 tracking-tight">{stat.val}</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider font-semibold leading-relaxed">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain vs Solution */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-center w-full max-w-3xl mx-auto mb-20"
        >
           <h2 className="text-4xl lg:text-5xl font-display text-white mb-6 tracking-tight font-semibold">Фундамент Роста.</h2>
           <p className="text-xl text-white/60 font-light">Достигнув плато, бизнес нуждается не в "подрядчиках", а в системной высоконагруженной инфраструктуре.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 relative overflow-visible">
          <div className="glass-panel p-6 sm:p-10 overflow-hidden relative border border-white/5 bg-black/40">
             <div className={`absolute -bottom-1/2 -right-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,#300505_0%,transparent_70%)] rounded-full pointer-events-none transition-opacity duration-1000 ${hoveredIndex !== null ? 'opacity-30' : 'opacity-15'}`}></div>
             
             <FadeInText delay={0.1}>
               <h3 className="text-xl font-display mb-10 text-white/50 font-medium pb-6 border-b border-white/10 relative z-10">Почему хаотичный найм не работает:</h3>
             </FadeInText>
             <div className="space-y-8 relative z-10">
              {painPoints.map((p, i) => (
                <FadeInText delay={0.2 + i * 0.1} key={i}>
                  <div 
                    className={`flex gap-5 group items-start transition-opacity duration-500 cursor-default ${hoveredIndex !== null && hoveredIndex !== i ? 'opacity-30' : 'opacity-100'}`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white/60 bg-white/5 border border-white/10 shadow-inner transition-colors">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display text-white mb-1.5 font-medium transition-colors">{p.title}</h4>
                      <p className="text-sm text-white/50 font-light leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeInText>
              ))}
             </div>
          </div>
          
          <div className={`glass-panel p-6 sm:p-10 overflow-hidden relative transition-all duration-700 bg-[size:200%] bg-gradient-to-tr from-[#050510] to-[#0a0520] ${hoveredIndex !== null ? 'border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'border-white/5'}`}>
             <div className={`absolute -bottom-1/2 -left-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(26,56,32,0.8)_0%,transparent_70%)] rounded-full pointer-events-none transition-all duration-1000 ${hoveredIndex !== null ? 'opacity-100' : 'opacity-40'}`}></div>
             <FadeInText delay={0.2}>
               <h3 className="text-xl font-display mb-10 text-white font-medium pb-6 border-b border-white/[0.15] relative z-10">Стандарт Neuro.Ops:</h3>
             </FadeInText>
             <div className="space-y-8 relative z-10">
              {solutions.map((p, i) => (
                <FadeInText delay={0.3 + i * 0.1} key={i}>
                  <div 
                    className="flex gap-5 group items-start transition-all duration-500 cursor-default"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-inner ${hoveredIndex === i ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 scale-110' : 'text-white/90 bg-white/5 border-white/10'}`}>
                      <p.icon className={`w-5 h-5 transition-transform duration-500 ${hoveredIndex === i ? 'scale-110' : 'scale-100'}`} />
                    </div>
                    <div>
                      <h4 className={`text-lg font-display mb-1.5 font-medium transition-colors duration-500 ${hoveredIndex === i ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' : 'text-white/80'}`}>{p.title}</h4>
                      <p className="text-sm text-white/60 font-light leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeInText>
              ))}
             </div>
          </div>
        </div>
      </section>

      {/* Integration Process Grid */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-16 text-center"
        >
           <h2 className="text-3xl lg:text-4xl font-display font-semibold text-white mb-4 tracking-tight">Регламент запуска</h2>
           <p className="text-lg text-white/50 font-light">Прозрачный протокол онбординга новых проектов.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <FadeInText delay={i * 0.1} key={i}>
              <InteractiveCard 
                onClick={() => setPage('faq')}
                className="glass p-6 sm:p-8 rounded-[1.5rem] sm:rounded-3xl hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:border-white/20 transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="text-white/20 font-display font-bold text-4xl sm:text-5xl mb-4 sm:mb-6 relative z-10 group-hover:text-white/40 transition-colors">{step.number}</div>
                <h3 className="text-[16px] sm:text-[17px] font-display font-medium text-white mb-2 sm:mb-3 relative z-10 group-hover:text-white transition-colors">{step.title}</h3>
                <p className="text-[12px] sm:text-[13px] text-white/50 font-light leading-relaxed relative z-10">{step.desc}</p>
              </InteractiveCard>
            </FadeInText>
          ))}
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="glass-panel p-6 sm:p-8 md:p-16 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full pointer-events-none" />
           <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
             <div>
               <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-6 tracking-tight text-white">Доверьте нам свой рост.</h2>
               <p className="text-lg text-white/60 font-light leading-relaxed mb-10 max-w-lg">
                 Организуем установочный звонок на 30 минут с ведущим аналитиком для аудита бизнес-процессов.
               </p>
               <div className="flex flex-col gap-5">
                 <div className="flex items-center gap-4 bg-white/[0.03] p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                   <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-500/10 text-gray-400 border border-gray-500/20">
                     <ShieldCheck className="w-6 h-6" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-white font-medium text-[15px]">Strict NDA</span>
                     <span className="text-white/50 text-[13px] font-light mt-0.5">Информация защищена 256-bit шифрованием</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 bg-white/[0.03] p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                   <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-900/10 text-red-500 border border-red-900/20">
                     <Cpu className="w-6 h-6" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-white font-medium text-[15px]">Data Driven Process</span>
                     <span className="text-white/50 text-[13px] font-light mt-0.5">Решения основаны на рыночной аналитике</span>
                   </div>
                 </div>
               </div>
             </div>
             
             <FadeInText delay={0.2} className="w-full flex justify-center">
               <ContactForm />
             </FadeInText>
           </div>
        </motion.div>
      </section>

      {/* Slide-In Widget */}
      <AnimatePresence>
        {showSlideIn && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden sm:block fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 z-[150] sm:w-[320px]"
          >
            <div className="glass p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 relative bg-[#0a0a0a]/90 backdrop-blur-2xl">
              <button 
                onClick={() => {
                  setShowSlideIn(false);
                  setWidgetDismissed(true);
                }} 
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 sm:w-5 sm:h-5" />
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center bg-purple-900/30 text-purple-400 border border-purple-500/20 mb-3 sm:mb-4 shadow-inner">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="text-[15px] sm:text-[17px] font-display font-medium text-white mb-2 leading-tight">Готовы обсудить ваш проект?</h4>
              <p className="text-[13px] sm:text-sm text-white/50 font-light mb-4 sm:mb-5">
                Оставьте заявку для конфиденциального брифа с нашим Senior-менеджером.
              </p>
              <a 
                href="https://t.me/NEURO_0PS" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-white text-black hover:bg-white/90 font-semibold py-2.5 sm:py-3 rounded-xl text-[13px] sm:text-sm transition-all shadow-[0_4px_14px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 inline-flex justify-center items-center"
              >
                Связаться с менеджером
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
