import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeInText } from '../components/FadeInText';
import { 
  Share2, Store, Code2, Smartphone, LineChart, Globe, Palette, ShieldCheck,
  ArrowRight, X, Image as ImageIcon, Shield, CheckSquare, Gift, Bot
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Service } from '../types';

const SERVICES: Service[] = [
  {
    id: 's-1',
    title: 'Контент-маркетинг (SMM)',
    description: 'Разработка контентной стратегии, ведение корпоративных медиа и соцсетей.',
    longDescription: 'Системное управление коммуникациями бренда. Мы проводим аналитику аудитории, создаем редполитику и обеспечиваем регулярный выпуск материалов, формирующих доверие и экспертность.',
    price: 'ОТ 15 000 ₽ / мес',
    promo: 'Первый месяц со скидкой 15%',
    features: ['Анализ ЦА и конкурентов', 'Разработка редполитики', 'Подготовка текстового и визуального контента', 'Аналитика вовлеченности'],
    iconName: 'Share2',
    portfolio: []
  },
  {
    id: 's-2',
    title: 'Дизайн Маркетплейсов',
    description: 'Системный дизайн карточек товаров, rich-контент, инфографика.',
    longDescription: 'Упаковка товарной матрицы для ведущих маркетплейсов. Проектируем визуальную структуру карточки на основе исследования болей покупателей и алгоритмов ранжирования площадки.',
    price: 'ОТ 1 000 ₽ / арт.',
    promo: '3 первые карточки сделаем бесплатно',
    features: ['Аудит конкурентного окружения', 'UX/UI дизайн карточки', 'Создание Rich-контента', 'A/B тестирование обложек'],
    iconName: 'Store',
    portfolio: [
      { title: 'Кресло', image: 'https://i.ibb.co/6JVWtTH5/image.jpg'},
      { title: 'Энергетик', image: 'https://i.ibb.co/xq61p45w/photo-2026-06-15-15-58-01-2.jpg'},
      { title: 'Сыворотка', image: 'https://i.ibb.co/fVZ0tf0H/photo-2026-06-15-15-58-02.jpg'},
      { title: 'Питательный крем', image: 'https://i.ibb.co/pjbDptSp/photo-2026-06-15-15-58-01.jpg'},
      { title: 'Крабовые чипсы', image: 'https://i.ibb.co/XRb0qDD/photo-2026-06-15-15-58-02-2.jpg'}
    ]
  },
  {
    id: 's-3',
    title: 'Веб-разработка',
    description: 'Проектирование и запуск корпоративных порталов, services и лендингов.',
    longDescription: 'Создание отказоустойчивых веб-решений для бизнеса. Используем актуальный стек (React, Next.js, Node.js) для разработки продуктов любой сложности: от имиджевых сайтов до личных кабинетов.',
    price: 'от 2 000 ₽',
    promo: 'Бесплатный аудит вашего текущего сайта',
    features: ['Бизнес-аналитика и прототипирование', 'UI/UX дизайн', 'Frontend и Backend разработка', 'Интеграция с 1С / CRM / ERP'],
    iconName: 'Code2',
    portfolio: [
      { title: 'Биржа', image: 'https://i.ibb.co/Kxnjn298/Opera-2026-06-07-100008-crypto-m1na-onrender-com.jpg' },
      { title: 'Дневник Питания', image: 'https://i.ibb.co/YFxLJCpQ/photo-2026-06-15-17-34-01.jpg' },
      { title: 'Магазин Электроники', image: 'https://i.ibb.co/vvKbjPT3/Opera-2026-05-13-181358-www-behance-net.jpg' },
      { title: 'Кофейня', image: 'https://i.ibb.co/4R6ngxTV/2026-06-15-180957597.png' },
      { title: 'Сайт для фрилансера', image: 'https://i.ibb.co/7dBNr4YG/Desktop-Screenshot-2026-06-15-16-45-09-29.png' },
      { title: 'Тренажер по Химии', image: 'https://i.ibb.co/FbQ0hj3J/Desktop-Screenshot-2026-06-15-16-43-01-63.png' },
      { title: 'Логистическая панель', image: 'https://i.ibb.co/JWZ0fPTs/21f7aeca-8be2-4db6-8413-36de6ab09d55.jpg' }
    ]
  },
  {
    id: 's-7',
    title: 'PWA-приложения',
    description: 'Прогрессивные веб-приложения: нативный опыт в браузере мобильного.',
    longDescription: 'Разработка Progressive Web Apps. Технология позволяет пользователям устанавливать приложение в один клик без App Store и Google Play, получать push-уведомления и пользоваться сервисом даже при нестабильном интернете.',
    price: 'от 2 500 ₽',
    promo: 'Техническое задание в подарок',
    features: ['Проектирование приложения', 'Оффлайн-режим (Service Workers)', 'Настройка Push-уведомлений', 'Адаптивный mobile-first интерфейс'],
    iconName: 'Smartphone',
    portfolio: [
      { title: 'Служба доставки', image: 'https://i.ibb.co/G4K2SSp6/Gemini-Generated-Image-2dtyy62dtyy62dty.png'}
    ]
  },
  {
    id: 's-9',
    title: 'Telegram чат-боты',
    description: 'Разработка умных чат-ботов, автоматизация воронки продаж и интеграция с вашим CRM/ERP прямо внутри мессенджера.',
    longDescription: 'Проектирование и разработка кастомных Telegram-ботов и Mini Apps любой сложности. Мы автоматизируем коммуникацию с клиентами, подключаем платежные системы, настраиваем рассылки по сегментам и интегрируем бота с вашей внутренней базой данных, CRM или ERP-системой.',
    price: 'от 2 000 ₽',
    promo: 'Детальная архитектура сценария в подарок',
    features: ['Проектирование диалоговой структуры и пользовательских путей', 'Интеграция с CRM, ERP и аналитическими системами', 'Подключение платежных шлюзов (Яндекс Pay, СБП и др.)', 'Разработка интерактивных веб-приложений (Telegram Mini Apps)'],
    iconName: 'Bot',
    portfolio: []
  },
  {
    id: 's-5',
    title: 'Performance Маркетинг',
    description: 'Лидогенерация, настройка сквозной аналитики и оптимизация ДРР.',
    longDescription: 'Управление рекламными кампаниями на основе данных. Мы связываем маркетинговые затраты с реальной выручкой через сквозную аналитику, системно тестируем гипотезы и снижаем стоимость привлечения клиента.',
    price: 'от 15 000 ₽ / мес',
    promo: 'Анализ конкурентов в подарок',
    features: ['Аудит рекламных кабинетов', 'Разработка медиаплана', 'Настройка Яндекс.Метрики / Roistat', 'Подготовка отчетов в DataLens'],
    iconName: 'LineChart',
    portfolio: []
  },
  {
    id: 's-6',
    title: 'SEO Продвижение',
    description: 'Органический рост трафика из поисковых систем (Яндекс, Google).',
    longDescription: 'Системный поисковый маркетинг. Проводим глубокий технический аудит, собираем широкую семантику, оптимизируем структуру сайта и наращиваем качественную ссылочную массу.',
    price: 'от 15 000 ₽ / мес',
    promo: 'Бесплатный технический SEO-аудит',
    features: ['Технический аудит и исправление ошибок', 'Сбор семантического ядра', 'Оптимизация контента и мета-тегов', 'Внешняя оптимизация'],
    iconName: 'Globe',
    portfolio: []
  },
  {
    id: 's-8',
    title: 'Брендинг и Айдентика',
    description: 'Формирование визуа системы и позиционирования компании.',
    longDescription: 'Разработка бренд-стратегии и корпоративного стиля. Мы создаем понятные, масштабируемые визуальные системы, которые помогают компаниям отстраиваться от конкурентов на плотных рынках.',
    price: 'от 10 000 ₽',
    promo: '2 дополнительных варианта логотипа',
    features: ['Аналитика рынка и конкурентов', 'Разработка логотипа и палитры', 'Оформление носителей', 'Создание гайдлайна / брендбука'],
    iconName: 'Palette',
    portfolio: [
      { title: 'Логистическая компания', image: 'https://i.ibb.co/dw8LWJ6W/photo-2026-06-15-19-19-53-Nero-AI-Image-Upscaler-Photo-Face.jpg' }
    ]
  },
  {
    id: 's-4',
    title: 'Управление репутацией',
    description: 'Мониторинг инфополя (SERM) и нивелирование информационных рисков.',
    longDescription: 'Защита коммерческих интересов в сети. Используем автоматизированные системы мониторинга (Brand Analytics, YouScan), оперативно отрабатываем негатив и формируем позитивную выдачу.',
    price: 'от 5 000 ₽ / мес',
    promo: 'Первичный срез упоминаний бесплатно',
    features: ['Мониторинг упоминаний 24/7', 'Работа с отзывами на площадках', 'Вытеснение негатива из топ-10', 'Юридическая помощь в удалении клеветы'],
    iconName: 'ShieldCheck',
    portfolio: []
  }
];

const IconMap: Record<string, any> = {
  Share2,
  Store,
  Code2,
  Smartphone,
  LineChart,
  Globe,
  Palette,
  ShieldCheck,
  Bot
};

import { PriceCalculator } from '../components/PriceCalculator';

export function Catalog({ setPage }: { setPage: (p: any) => void }) {
  const { user, placeOrder, setIsNavHidden } = useAppContext();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOrder = async (service: Service) => {
    if (!user) {
      setPage('dashboard'); // This will show the login screen
      return;
    }
    await placeOrder(service);
    
    const text = `Здравствуйте! Хочу заказать услугу:%0A- ${service.title}%0AПредварительная стоимость: ${service.price}`;
    const url = `https://t.me/neuro_0ps?text=${text}`;
    window.open(url, '_blank');
    
    setSelectedService(null);
    setPage('dashboard');
  };

  useEffect(() => {
    setIsNavHidden(!!selectedService);
    return () => setIsNavHidden(false);
  }, [selectedService, setIsNavHidden]);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedService]);

  return (
    <div className="flex-col min-h-screen relative bg-transparent pt-48 pb-20 w-full overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-3xl text-center mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 tracking-tight text-white animate-fade-in">Каталог Услуг</h1>
          <p className="text-lg sm:text-xl text-white/60 font-light leading-relaxed">
            Профессиональная поддержка вашего бизнеса. Мы автоматизируем процессы и интегрируем команду в ваш пайплайн за 48 часов.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = IconMap[service.iconName];
            return (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: Math.min(idx * 0.05, 0.3), 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.015,
                  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ scale: 0.985 }}
                key={service.id}
                className="glass-panel flex flex-col justify-between p-8 cursor-pointer group glow-effect"
                onClick={() => setSelectedService(service)}
              >
                <div className="glow-overlay rounded-3xl z-0"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center text-white/50 mb-6 group-hover:border-white/20 group-hover:bg-white/5 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-display font-medium mb-3 text-white">{service.title}</h3>
                  {service.promo && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-transparent via-purple-900/20 to-transparent text-purple-200/80 text-xs font-semibold tracking-wider mb-4 border border-purple-500/20 shadow-[inset_0_0_10px_rgba(168,85,247,0.05)]">
                      <Gift className="w-3 h-3" />
                      {service.promo}
                    </div>
                  )}
                  <p className="text-white/50 text-[15px] font-light mb-8 leading-relaxed line-clamp-3">{service.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10 relative z-10">
                  <span className="font-mono text-[13px] tracking-wider text-white/70 font-medium">{service.price}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_0_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <PriceCalculator setPage={setPage} />
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-3xl"
                onClick={() => setSelectedService(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-5xl max-h-[90vh] glass-panel shadow-2xl flex flex-col overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors z-[100] bg-black/40 backdrop-blur-md border border-white/10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col lg:flex-row w-full h-full overflow-y-auto lg:overflow-hidden custom-scrollbar">
                <div className="flex-1 lg:overflow-y-auto custom-scrollbar p-6 pt-20 lg:p-12">
                  <div className="mb-4">
                    {(() => {
                      const Icon = IconMap[selectedService.iconName];
                      return (
                        <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center text-white mb-8">
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                      );
                    })()}
                    <h2 className="text-3xl lg:text-4xl font-display font-medium mb-4 tracking-tight text-white pr-10 lg:pr-0">{selectedService.title}</h2>
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                      <div className="inline-flex px-4 py-2 bg-white/10 text-white outline outline-1 outline-white/20 rounded-xl text-[13px] font-semibold tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        {selectedService.price}
                      </div>

                      {selectedService.promo && (
                        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-transparent via-purple-900/20 to-transparent text-purple-200/80 text-[13px] font-semibold outline outline-1 outline-purple-500/20 shadow-[inset_0_0_10px_rgba(168,85,247,0.05)]">
                          <Gift className="w-4 h-4" />
                          {selectedService.promo}
                        </div>
                      )}
                    </div>
                    <p className="text-white/60 leading-relaxed text-[17px] font-light mb-12">
                      {selectedService.longDescription}
                    </p>

                    <h4 className="text-[11px] uppercase tracking-widest font-semibold text-white/40 mb-6">Этапы работ:</h4>
                    <ul className="space-y-4 mb-12">
                      {selectedService.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 text-white">
                          <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="leading-relaxed font-light text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-white/10">
                    <button 
                      onClick={() => handleOrder(selectedService)}
                      className="bg-purple-600 text-white hover:bg-purple-500 py-4 px-8 rounded-2xl font-semibold text-[15px] transition-all shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_24px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
                    >
                      {user ? 'Оформить заявку на проект' : 'Авторизоваться и Начать'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Portfolio Side */}
                <div className="w-full lg:w-[45%] bg-black/40 p-6 md:p-12 border-t lg:border-t-0 lg:border-l border-white/10 lg:overflow-y-auto custom-scrollbar">
                  <h4 className="flex items-center gap-3 text-xl font-display font-medium mb-8 text-white pr-10 lg:pr-12">
                    <ImageIcon className="w-6 h-6 text-white/40" />
                    Примеры интеграции
                  </h4>
                  {selectedService.portfolio && selectedService.portfolio.length > 0 ? (
                    <div className={selectedService.id === 's-2' ? "space-y-8" : "space-y-6"}>
                      {selectedService.portfolio.map((item, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/[0.02]">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className={`w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ${selectedService.id === 's-2' ? 'aspect-[3/4]' : 'h-56'}`}
                          />
                          {selectedService.id !== 's-2' ? (
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                               <h5 className="text-white font-medium text-lg text-shadow-sm">{item.title}</h5>
                               {item.stats && (
                                 <span className="text-emerald-400 text-xs tracking-widest uppercase mt-2 font-semibold drop-shadow-md">{item.stats}</span>
                               )}
                            </div>
                          ) : (
                            <div className="p-4 border-t border-white/5 bg-black/20">
                               <h5 className="text-white/80 font-medium text-sm tracking-wide">{item.title}</h5>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 rounded-3xl border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center flex-col gap-4 p-8 text-center">
                      <Shield className="w-10 h-10 text-white/20" />
                      <div>
                        <span className="block text-white font-medium mb-2">Проекты под NDA</span>
                        <span className="text-sm font-light text-white/50 leading-relaxed">Результаты работы по этому направлению предоставляются только персонально по запросу клиента в целях безопасности.</span>
                      </div>
                    </div>
                  )}
                </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </div>
  );
}
