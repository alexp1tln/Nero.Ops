import { motion } from 'motion/react';
import { Activity, Clock, ShieldAlert } from 'lucide-react';
import { InteractiveCard } from '../components/InteractiveCard';

export function SLA() {
  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 max-w-5xl mx-auto px-4 sm:px-6 w-full min-h-screen bg-transparent relative">
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="mb-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-white/50 tracking-widest font-semibold uppercase mb-10 shadow-[0_4px_24px_rgba(255,255,255,0.02)] cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Service Level Agreement
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-semibold text-white tracking-tight mb-8">Соглашение SLA</h1>
        <p className="text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
          Стандарты качества, метрики доступности и время реакции. Мы юридически фиксируем наши обязательства перед вашим бизнесом.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-16 relative z-10">
        <InteractiveCard className="glass-panel p-8 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-white/5 text-white/50 border border-white/10 mx-auto mb-6 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div className="text-3xl font-display font-bold text-white mb-2">99.9%</div>
          <div className="text-sm text-white/50 uppercase tracking-widest">Аптайм сервисов</div>
        </InteractiveCard>

        <InteractiveCard className="glass-panel p-8 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-white/5 text-white/50 border border-white/10 mx-auto mb-6 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div className="text-3xl font-display font-bold text-white mb-2">&lt; 15 мин</div>
          <div className="text-sm text-white/50 uppercase tracking-widest">Время ответа L1</div>
        </InteractiveCard>

        <InteractiveCard className="glass-panel p-8 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-white/5 text-white/50 border border-white/10 mx-auto mb-6 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="text-3xl font-display font-bold text-white mb-2">P1 / P2</div>
          <div className="text-sm text-white/50 uppercase tracking-widest">Обработка инцидентов</div>
        </InteractiveCard>
      </div>

      <div className="glass-panel p-8 md:p-12 relative z-10 text-white/70 font-light leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-display text-white font-medium mb-4">
            1. Доступность услуг
          </h2>
          <p>
            Neuro.Ops гарантирует доступность развернутой инфраструктуры и интеграционных решений на уровне 99.9% в месяц. Запланированные технические работы (Scheduled Maintenance) проводятся в часы наименьшей нагрузки по московскому времени (с 02:00 до 05:00) с предварительным уведомлением за 48 часов.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-white font-medium mb-4">
            2. Матрица приоритетов и время реакции
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white font-medium">
                  <th className="py-4 px-4">Приоритет</th>
                  <th className="py-4 px-4">Описание</th>
                  <th className="py-4 px-4">Время ответа</th>
                  <th className="py-4 px-4">Решение / Обход</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-red-400 font-medium">P1 - Критический</td>
                  <td className="py-4 px-4">Полная остановка бизнес-процессов, система недоступна.</td>
                  <td className="py-4 px-4 font-mono">15 минут</td>
                  <td className="py-4 px-4 font-mono">2-4 часа</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-orange-400 font-medium">P2 - Высокий</td>
                  <td className="py-4 px-4">Деградация сервиса, влияет на работу отдела.</td>
                  <td className="py-4 px-4 font-mono">1 час</td>
                  <td className="py-4 px-4 font-mono">8 часов</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-yellow-400 font-medium">P3 - Средний</td>
                  <td className="py-4 px-4">Проблема у одного пользователя или минорный баг.</td>
                  <td className="py-4 px-4 font-mono">4 часа</td>
                  <td className="py-4 px-4 font-mono">24 часа</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-blue-400 font-medium">P4 - Низкий</td>
                  <td className="py-4 px-4">Вопросы, консультации, запросы на изменение.</td>
                  <td className="py-4 px-4 font-mono">24 часа</td>
                  <td className="py-4 px-4 font-mono">3-5 дней</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display text-white font-medium mb-4">
            3. Штрафные санкции
          </h2>
          <p>
            В случае нарушения гарантированного аптайма или превышения сроков устранения инцидентов P1-P2, клиент вправе потребовать компенсацию в виде перерасчета абонентской платы. Процент компенсации указывается в индивидуальном договоре поддержки.
          </p>
        </section>
      </div>
    </div>
  );
}
