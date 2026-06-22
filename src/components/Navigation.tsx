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
    { id: 'cases', label: 'Кейсы' },
    { id: 'stack', label: 'Стек' },
  ];

  const handleNavClick = (id: string) => {
    setPage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${isNavHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
      <AnimatePresence>
        {isPromoVisible && !isNavHidden && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-[#170a2a] via-purple-900/30 to-[#170a2a] border-b border-purple-500/20 px-3 py-1.5 sm:px-4 sm:py-2.5 flex items-center justify-center relative z-[60] overflow-hidden"
          >
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider text-white/90 text-center flex items-center gap-1.5 sm:gap-2">
              <span className="hidden sm:inline">Только для новых партнеров: закажите бесплатный аудит ваших процессов.</span>
              <span className="sm:hidden">Новым клиентам: бесплатный аудит.</span>
              <button onClick={() => window.open('https://t.me/neuro_0ps?text=Здравствуйте! Я увидел акцию на сайте о бесплатном Welcome-аудите процессов. Расскажите подробнее, пожалуйста.', '_blank')} className="text-purple-400 hover:text-purple-300 transition-colors flex items-center shrink-0">
                <span className="hidden sm:inline">Welcome-аудит (0 ₽)</span>
                <span className="sm:hidden">Заказать</span> <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5" />
              </button>
            </span>
            <button onClick={() => setIsPromoVisible(false)} className="absolute right-1 sm:right-2 md:right-4 z-20 p-1.5 sm:p-2 text-white/40 hover:text-white transition-colors cursor-pointer">
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <header className={`transition-all duration-500 ${isScrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-6'} px-4 sm:px-6 lg:px-8 w-full`}>
        <div className="max-w-7xl mx-auto">
          <div className={`flex justify-between items-center sm:px-6 transition-all duration-500 sm:rounded-[2rem] ${isScrolled ? 'h-12 sm:h-16 sm:glass sm:shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'h-14 sm:h-20 bg-transparent'}`}>
            <div 
              className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center text-white transition-all duration-300">
                <img 
                  src={logoSrc} 
                  onError={handleLogoError}
                  referrerPolicy="no-referrer"
                  alt="Neuro.Ops" 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 filter brightness-0 invert" 
                />
              </div>
              <span className="font-display font-semibold text-xl sm:text-2xl tracking-tight text-white hidden sm:block">
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
                className="lg:hidden p-1.5 sm:p-2 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#070708]"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img 
                      src={logoSrc} 
                      onError={handleLogoError}
                      referrerPolicy="no-referrer"
                      alt="Neuro.Ops" 
                      className="w-full h-full object-contain filter brightness-0 invert" 
                    />
                  </div>
                  <span className="font-display font-semibold text-xl sm:text-2xl tracking-tight text-white">
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
                    className={`text-xl sm:text-3xl font-display font-medium tracking-tight ${
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
