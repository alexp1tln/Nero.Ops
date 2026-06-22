import { motion } from 'motion/react';
import { useState } from 'react';

export function Footer({ setPage }: { setPage: (p: any) => void }) {
  const [logoSrc, setLogoSrc] = useState('https://i.postimg.cc/CLH54FCs/IMG-6070.png');

  const handleLogoError = () => {
    if (logoSrc !== '/logo-cropped.png?v=4') {
      setLogoSrc('/logo-cropped.png?v=4');
    }
  };
  return (
    <footer className="bg-[#040407] border-t border-white/[0.05] py-16 text-white/50 text-sm w-full relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-6 cursor-pointer group" onClick={() => setPage('home')}>
            <div className="w-28 h-28 flex items-center justify-center text-white transition-all duration-300">
              <img 
                src={logoSrc} 
                onError={handleLogoError}
                referrerPolicy="no-referrer"
                alt="Neuro.Ops" 
                className="w-28 h-28 max-w-none object-contain transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
            <span className="font-display font-semibold text-2xl tracking-tight text-white">
              Neuro<span className="text-white/50 font-normal">.Ops</span>
            </span>
          </div>
          <p className="text-white/40 font-light max-w-sm mb-8 leading-relaxed text-[13px]">
            Системный IT-интегратор и департамент цифрового маркетинга. Мы внедряем технологии, автоматизируем процессы и масштабируем бизнес, создавая решения с измеримым результатом.
          </p>
          <div className="flex gap-6">
            <a href="https://t.me/NEURO_0PS" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-semibold">Telegram</a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white/80 font-semibold tracking-widest uppercase text-[11px] mb-6">Ключевые Услуги</h4>
          <ul className="space-y-4 font-light text-[13px]">
            <li><button onClick={() => setPage('catalog')} className="hover:text-white transition-colors">Digital Маркетинг</button></li>
            <li><button onClick={() => setPage('catalog')} className="hover:text-white transition-colors">Управление репутацией</button></li>
            <li><button onClick={() => setPage('catalog')} className="hover:text-white transition-colors">Веб-разработка</button></li>
            <li><button onClick={() => setPage('catalog')} className="hover:text-white transition-colors">Telegram чат-боты</button></li>
            <li><button onClick={() => setPage('catalog')} className="hover:text-white transition-colors">Performance & SEO</button></li>
            <li><button onClick={() => setPage('catalog')} className="hover:text-white transition-colors">PWA-приложения</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white/80 font-semibold tracking-widest uppercase text-[11px] mb-6">Контакты</h4>
          <ul className="space-y-4 font-light text-[13px] text-white/50">
            <li><a href="mailto:alex@neuro-ops.ru" className="hover:text-white transition-colors font-medium">alex@neuro-ops.ru</a></li>
            <li><a href="tel:+79009036943" className="hover:text-white transition-colors font-medium">+7 (900) 903-69-43</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center text-[11px] text-white/40">
        <p>© {new Date().getFullYear()} Neuro.Ops ОГРНИП 623017890067. Все права защищены.</p>
        <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-widest font-semibold">
          <button onClick={() => setPage('privacy')} className="hover:text-white transition-colors">Политика конфиденциальности</button>
          <button onClick={() => setPage('sla')} className="hover:text-white transition-colors">SLA Соглашение</button>
        </div>
      </div>
    </footer>
  );
}
