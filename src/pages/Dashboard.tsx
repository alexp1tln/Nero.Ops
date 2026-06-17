import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { 
  Clock, CircleDashed, FileText, Settings, Inbox, 
  Mail, Lock, User, Sparkles, Check, ArrowRight
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile
} from 'firebase/auth';
import { SEO } from '../components/SEO';

function LoginOverlay() {
  const { login } = useAppContext();
  const [authMethod, setAuthMethod] = useState<'google' | 'email'>('google');
  const [emailMode, setEmailMode] = useState<'login' | 'register'>('login');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear messages on transition
  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [authMethod, emailMode]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isSubmitting) return;
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (emailMode === 'register') {
        if (!name.trim()) {
          throw new Error('Пожалуйста, введите ваше имя.');
        }
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(credential.user, {
          displayName: name.trim()
        });
        setSuccess('Аккаунт успешно создан!');
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setSuccess('Успешный вход в аккаунт!');
      }
    } catch (err: any) {
      console.error('Email authentication error', err);
      let msg = 'Произошла ошибка при входе. Проверьте введенные данные.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'Пользователь с таким Email уже зарегистрирован.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Пароль слишком простой. Рекомендуется от 6 символов.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Неверный формат электронной почты.';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Неверный Email или пароль.';
      } else {
        msg = err.message || msg;
      }
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen relative bg-transparent pt-24 pb-12 sm:pt-36 sm:pb-16">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass-panel p-6 sm:p-10 relative z-10"
      >
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-5">
            <img 
              src="https://i.postimg.cc/fL5GvPxW/4cdce90d89fdbd80eebefb2c59decedd.png" 
              alt="Logo" 
              className="max-w-full max-h-full object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mb-2">Личный кабинет</h2>
          <p className="text-sm text-white/50">Доступ к вашим заказам и истории взаимодействий.</p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/[0.06] mb-6 p-1 bg-white/[0.02] rounded-2xl relative z-10">
          <button
            onClick={() => setAuthMethod('google')}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${authMethod === 'google' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'}`}
          >
            Google
          </button>
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all ${authMethod === 'email' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'}`}
          >
            Email
          </button>
        </div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-300 text-xs sm:text-sm relative z-10 whitespace-pre-line"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs sm:text-sm relative z-10"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Content */}
        <div className="relative z-10">
          {authMethod === 'google' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 py-4"
            >
              <p className="text-center text-sm text-white/40 mb-2">Быстрый и безопасный вход в один клик через Google аккаунт.</p>
              <button 
                onClick={login}
                className="w-full bg-white text-black hover:bg-white/90 font-semibold py-4 rounded-xl transition-all shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer min-h-[48px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22c-.17-.12-.35-.27-.53-.45z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z" fill="#EA4335"/>
                </svg>
                Войти через Google
              </button>
            </motion.div>
          )}

          {authMethod === 'email' && (
            <motion.form
              onSubmit={handleEmailAuth}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {emailMode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Ваше имя</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.08] text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all min-h-[44px]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Электронная почта (Email)</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
                  <input
                    type="email"
                    required
                    placeholder="example@corp.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wide">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all min-h-[44px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-white/90 disabled:bg-white/40 font-semibold py-4 rounded-xl transition-all shadow-[0_4px_14px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 mt-2 cursor-pointer min-h-[48px]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                ) : emailMode === 'login' ? (
                  <>Войти с Email <ArrowRight className="w-4.5 h-4.5" /></>
                ) : (
                  <>Создать аккаунт <Sparkles className="w-4.5 h-4.5" /></>
                )}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setEmailMode(emailMode === 'login' ? 'register' : 'login')}
                  className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer py-1"
                >
                  {emailMode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже зарегистрированы? Войти'}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Dashboard({ setPage }: { setPage: (p: any) => void }) {
  const { user, orders, logout, loading } = useAppContext();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 min-h-screen relative bg-transparent">
         <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
      </div>
    );
  }

  if (!user) return (
    <>
      <SEO title="Вход в личный кабинет" description="Авторизуйтесь для доступа к заказам и услугам Neuro.Ops." />
      <LoginOverlay />
    </>
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-48 md:pb-24 gap-8 min-h-screen relative">
      <SEO title="Личный кабинет" description="Ваши заказы, документы и настройки профиля в системе Neuro.Ops." />
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2 relative z-10">
        <div className="mb-6 px-4 hidden md:block">
           <div className="text-[11px] uppercase tracking-widest font-semibold text-white/40 mb-1">Организация</div>
           <div className="font-medium text-white text-lg truncate drop-shadow-md">{user.name}</div>
        </div>
        
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 scrollbar-none w-full">
           <button
              className="flex-shrink-0 w-auto md:w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-[15px] font-medium border bg-white/10 text-white border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
           >
              <Inbox className="w-5 h-5" />
              Мои заказы
           </button>
        </nav>

        <div className="pt-8 mt-auto border-t border-white/10 hidden md:block">
           <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-[15px] font-medium text-white/50 hover:text-red-400 hover:bg-red-400/10"
           >
              <Settings className="w-5 h-5" />
              Выйти
           </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 relative z-10 w-full">
        <header className="mb-8 flex md:hidden items-center justify-between border-b border-white/10 pb-4">
           <div className="font-medium text-white">{user.name}</div>
           <button onClick={logout} className="text-sm text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">Выйти</button>
        </header>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                 <h1 className="text-3xl lg:text-4xl font-display font-medium text-white tracking-tight">Заказанные услуги</h1>
                 <p className="text-sm text-white/50 mt-1">Список ваших активных запросов</p>
              </div>
              <button 
                 onClick={() => setPage('catalog')}
                 className="text-sm bg-white border border-white/10 text-black font-semibold px-5 py-2.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 whitespace-nowrap"
              >
                 + Заказать услугу
              </button>
           </div>

           {orders.length === 0 ? (
              <div className="glass-panel p-6 sm:p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                 <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white/30">
                    <CircleDashed className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-medium text-white mb-2">Список заказов пуст</h3>
                 <p className="text-white/50 mb-8 max-w-sm">Выберите необходимую услугу в каталоге, чтобы запустить процесс работы команды Neuro.Ops.</p>
                 <button 
                    onClick={() => setPage('catalog')}
                    className="bg-white text-black px-8 py-3 rounded-full text-[15px] font-medium hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
                 >
                    Перейти в каталог
                 </button>
              </div>
           ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {orders.map((order, i) => (
                    <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.05 }}
                       key={order.id} 
                       className="glass p-6 rounded-3xl flex flex-col gap-4 border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                    >
                       <div className="flex items-center justify-between gap-3">
                          <span className="text-[11px] font-mono tracking-wider text-white/40 uppercase">ID: {order.id}</span>
                          <span className="text-[10px] text-white/30">
                             {new Date(order.date).toLocaleDateString('ru-RU')}
                          </span>
                       </div>
                       <h3 className="text-xl font-display font-medium text-white leading-tight">{order.serviceTitle}</h3>
                       
                       <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider font-semibold text-emerald-400">
                             <CircleDashed className="w-4 h-4" />
                             Заявка отправлена
                          </div>
                          <a 
                             href="https://t.me/neuro_0ps"
                             target="_blank"
                             rel="noreferrer"
                             className="bg-white/5 hover:bg-white/10 text-white/80 px-4 py-2 rounded-xl text-[12px] font-medium transition-all border border-white/5 whitespace-nowrap text-center"
                          >
                             Написать в Telegram
                          </a>
                       </div>
                    </motion.div>
                 ))}
              </div>
           )}
        </motion.div>
      </div>
    </div>
  );
}
