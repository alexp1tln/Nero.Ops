import { LayoutGrid, ArrowRight, Menu, X, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function Navigation({
  currentPage,
  setPage,
}: {
  currentPage: string;
  setPage: (page: any) => void;
}) {
  const { user, isNavHidden } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const [logoSrc, setLogoSrc] = useState('https://i.postimg.cc/CLH54FCs/IMG-6070.png');

  const handleLogoError = () => {
    if (logoSrc !== '/logo-cropped.png?v=4') {
      setLogoSrc('/logo-cropped.png?v=4');
    }
  };

  useEffect(() => {
    if (currentPage !== 'home') {
      setIsPromoVisible(false);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О компании' },
    { id: 'catalog', label: 'Услуги' },
    { id: 'stack', label: 'Стек' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Контакты' },
  ];

  const handleNavClick = (id: string) => {
    setPage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isPromoVisible && !isNavHidden && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-transparent via-purple-900/30 to-transparent border-b border-purple-500/20 px-4 py-2.5 flex items-center justify-center relative z-[60] overflow-hidden"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-white/90 text-center flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span>Только для новых партнеров: закажите бесплатный аудит ваших процессов и получите дорожную карту оптимизации.</span>
              <button onClick={() => setPage('contact')} className="text-purple-400 hover:text-purple-300 transition-colors flex items-center shrink-0">
                Welcome-аудит (0 ₽) <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </span>
            <button onClick={() => setIsPromoVisible(false)} className="absolute right-2 md:right-4 z-20 p-2 text-white/40 hover:text-white transition-colors cursor-pointer">
              <X className="w-5 h-5 md:w-4 md:h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <header className={`fixed ${isPromoVisible && !isNavHidden ? 'top-[60px] sm:top-[36px]' : 'top-0'} left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'} px-4 sm:px-6 lg:px-8 ${isNavHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className={`flex justify-between items-center px-6 transition-all duration-500 rounded-[2rem] ${isScrolled ? 'glass h-16 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'h-20 bg-transparent'}`}>
            <div 
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-28 h-28 flex items-center justify-center text-white transition-all duration-300">
                <img 
                  src={logoSrc} 
                  onError={handleLogoError}
                  referrerPolicy="no-referrer"
                  alt="Neuro.Ops" 
                  className="w-28 h-28 max-w-none object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <span className="font-display font-semibold text-2xl tracking-tight text-white hidden sm:block">
                Neuro<span className="text-white/50 font-normal">.Ops</span>
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-[13px] font-medium tracking-wide transition-all relative py-2 ${
                    currentPage === item.id ? 'text-white' : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="hidden sm:flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-500 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all shadow-[0_4px_14px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
              >
                {user ? (
                  <>
                    <LayoutGrid className="w-4 h-4" />
                    Кабинет
                  </>
                ) : (
                  <>
                    Войти
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              
              <button 
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-3xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-28 h-28 flex items-center justify-center">
                    <img 
                      src={logoSrc} 
                      onError={handleLogoError}
                      referrerPolicy="no-referrer"
                      alt="Neuro.Ops" 
                      className="w-28 h-28 max-w-none object-contain" 
                    />
                  </div>
                  <span className="font-display font-semibold text-2xl tracking-tight text-white">
                    Neuro.Ops
                  </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/60 hover:text-white bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 items-start">
                {navItems.map((item, i) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-3xl font-display font-medium tracking-tight ${
                      currentPage === item.id ? 'premium-gradient-text' : 'text-white/50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
              >
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-4 rounded-2xl text-lg font-semibold shadow-[0_4px_20px_rgba(168,85,247,0.3)]"
                >
                  {user ? (
                    <>
                      <LayoutGrid className="w-5 h-5" />
                      Панель управления
                    </>
                  ) : (
                    <>
                      Авторизация
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
