import { motion } from 'motion/react';
import { Users, Briefcase, ChevronRight, MapPin, Award, CheckCircle, Crosshair, Zap, Shield, Target } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { InteractiveCard } from '../components/InteractiveCard';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { FadeInText } from '../components/FadeInText';

export function About({ setPage }: { setPage: (page: any) => void }) {
  const departments = [
    {
      title: "Центр разработки и PWA-приложений",
      desc: "45+ Senior и Middle инженеров, проектирующих высоконагруженные корпоративные системы, PWA и кроссплатформенные решения. Стек: Node.js, React, Next, PostgreSQL, Redis.",
      count: "45 специалистов"
    },
    {
      title: "Performance & Data Analytics",
      desc: "Отдел сквозной аналитики и управления трафиком. Бюджеты управляются исключительно на основе Data-Driven моделей. Настраиваем DataLens, PowerBI, Roistat и Яндекс.Метрику.",
      count: "32 специалиста"
    },
    {
      title: "Digital Маркетинг и Контент",
      desc: "Отдел системных коммуникаций. Бренд-менеджеры, редакторы, арт-директора и контент-маркетологи. Разрабатываем редполитики и коммуникационные стратегии для B2B.",
      count: "28 специалистов"
    },
    {
      title: "SERM & Compliance",
      desc: "Служба контроля качества, юристы и специалисты по репутации. Отдел работает в режиме 24/7, обеспечивая защиту корпоративного имиджа в информационном поле.",
      count: "19 специалистов"
    }
  ];

  const values = [
    { icon: Crosshair, title: "Интеграция в бизнес", desc: "Мы не действуем как подрядчик на одну задачу. Если мы подписываем контракт, мы становимся полноценным техническим или маркетинговым департаментом." },
    { icon: Zap, title: "ITIL & Agile Стандарты", desc: "Глубокая методология ведения проектов. Итеративный подход к поставке ценности без бюрократии. Коллаборация через единый портал." },
    { icon: Shield, title: "Инфраструктурная безопасность", desc: "Соблюдение ФЗ-152, ISO 27001. Все данные клиентов размещены на защищенных серверах, используется шифрование и строгие NDA." },
    { icon: Target, title: "Accountability", desc: "Сквозная финансовая и метрическая ответственность за результат. Наш SLA фиксирует обязательства по доступности систем (99.9%)." }
  ];

  return (
    <div className="flex-col min-h-screen relative bg-transparent pt-32 pb-16 md:pt-48 md:pb-20">
      {/* Intro section */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden border-b border-white/[0.05] z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-white/80 tracking-wide font-medium mb-12 shadow-[0_4px_24px_rgba(255,255,255,0.05)] cursor-default">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              Глубокая ИТ-экспертиза
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display tracking-tight mb-8 max-w-5xl leading-[1.05] font-semibold text-white">
              <span className="premium-gradient-text">Показатели надежного</span> <br className="hidden md:block"/>
              <span className="text-white/40 font-normal mt-2 block">цифрового партнера.</span>
            </h1>
            
            <FadeInText delay={0.2} className="max-w-4xl text-lg sm:text-xl text-white/60 font-light leading-relaxed mb-20 text-left">
              Мы внедряем передовые решения на рынке B2B-интеграций. Neuro.Ops предоставляет операционную поддержку корпоративного уровня без необходимости найма и удержания in-house специалистов. От сложной веб-разработки до performance-маркетинга.
            </FadeInText>

            <FadeInText delay={0.3} className="glass-panel p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }} className="pt-4 md:pt-0">
                  <div className="text-5xl font-display font-semibold premium-gradient-text mb-3"><AnimatedCounter value={124} /></div>
                  <div className="text-white/40 uppercase tracking-widest text-[11px] font-semibold">Штатных инженера и эксперта</div>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }} className="pt-8 md:pt-0">
                   <div className="text-5xl font-display font-semibold premium-gradient-text mb-3"><AnimatedCounter value={850} />+</div>
                  <div className="text-white/40 uppercase tracking-widest text-[11px] font-semibold">Реализованных проектов</div>
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }} className="pt-8 md:pt-0">
                  <div className="text-5xl font-display font-semibold premium-gradient-text mb-3">99.8%</div>
                  <div className="text-white/40 uppercase tracking-widest text-[11px] font-semibold">Соблюдение SLA</div>
                </motion.div>
              </div>
            </FadeInText>
          </motion.div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-32 border-b border-white/[0.05] relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6 }}
             className="mb-16 text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4 tracking-tight text-white">
              Организационная структура
            </h2>
            <p className="text-xl text-white/50 font-light">Специализированные отделы, работающие как единый проект.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((dep, i) => (
              <FadeInText delay={i * 0.1} key={i}>
                <InteractiveCard 
                  onClick={() => setPage('catalog')}
                  className="glass-panel p-6 sm:p-10 flex flex-col justify-between hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-300 group cursor-pointer h-full"
                >
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-medium text-white mb-4 group-hover:text-white/80 transition-colors">{dep.title}</h3>
                    <p className="text-white/50 font-light leading-relaxed mb-8 text-[15px]">{dep.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-white/50 pt-6 border-t border-white/10 relative z-10 group-hover:border-white/20 transition-colors">
                    <Users className="w-4 h-4" />
                    {dep.count}
                  </div>
                </InteractiveCard>
              </FadeInText>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 border-b border-white/[0.05] relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             className="text-4xl lg:text-5xl font-display font-semibold mb-20 tracking-tight text-white text-center"
          >
             Корпоративные принципы
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
             {values.map((v, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  key={i}
                  className="flex gap-6 group"
                >
                   <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 shadow-inner flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                      <v.icon className="w-6 h-6 text-white/70" />
                   </div>
                   <div>
                      <h4 className="text-xl font-display font-medium text-white mb-2">{v.title}</h4>
                      <p className="text-white/50 font-light text-[15px] leading-relaxed">{v.desc}</p>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Office & Contact Callout */}
      <section className="py-32 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-8 tracking-tight text-white">Готовы обсудить <br/>ваш проект?</h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-10 max-w-md">
              Оставьте заявку, и наши специалисты свяжутся с вами для проведения первичного аудита и обсуждения деталей интеграции.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
             <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
