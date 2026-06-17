import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ArrowRight, Server, Database, Code2, Network, Cpu, Lock } from 'lucide-react';
import { SEO } from '../components/SEO';

const cases = [
  {
    id: 'case-1',
    title: 'Веб-тренажер для Onboarding',
    category: 'Internal / EdTech',
    tech: ['React', 'WebSockets', 'LLM Agents'],
    problem: 'Высокая стоимость адаптации новых сотрудников технической поддержки (L1). Длительный цикл перевода сотрудника на ' + 
             'самостоятельную работу из-за необходимости постоянного менторства.',
    solution: 'Разработан обучающий веб-тренажер с симуляцией реальных пользовательских обращений. Внедрена LLM-модель для ' +
              'генерации непредсказуемых сценариев диалога и автоматической оценки действий стажера.',
    result: 'Сокращение времени адаптации на 40%. Снижение затрат на менторство (Senior->Junior) на 60%. ' +
            'Тренажер переведен в статус автономного внутреннего продукта.'
  },
  {
    id: 'case-2',
    title: 'Data Flow Orchestrator',
    category: 'Business Operations',
    tech: ['Node.js', 'PostgreSQL', 'Redis'],
    problem: 'Разрозненность данных между тремя CRM-системами и биллингом после слияния макрорегиональных филиалов. ' +
             'Регулярные коллизии данных и ручная сверка.',
    solution: 'Создан единый коммуникационный хаб (API Gateway) с микросервисом оркестрации. Разработан ' +
              'адаптер для асинхронной синхронизации данных через очередь сообщений с гарантией доставки.',
    result: 'Нулевой уровень потери данных. Сокращение времени на сверку отчетов с 12 часов до 15 минут в неделю. ' +
            'Архитектура готова к подключению новых ERP без переписывания ядра.'
  },
  {
    id: 'case-3',
    title: 'Auto-QA для легаси систем',
    category: 'Quality Assurance',
    tech: ['Python', 'Selenium', 'Docker'],
    problem: 'Регулярные регрессионные ошибки в критически важном легаси-модуле без тестового покрытия. ' +
             'Невозможность рефакторинга из-за жестких бизнес-процессов.',
    solution: 'Внедрен E2E фреймворк автоматизированного тестирования. Реализована система фиксации ' +
              'состояния БД перед тестом и генерация отчетов в пайплайне CI/CD.',
    result: 'Покрытие критических путей составило 100%. Уверенность бизнес-заказчика в релизах выросла, ' +
            'количество hotfix-патчей сократилось в 9 раз за квартал.'
  }
];

export function Cases({ setPage }: { setPage: (page: any) => void }) {
  const [activeCase, setActiveCase] = useState(cases[0].id);

  return (
    <div className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
      <SEO title="Кейсы и проекты" description="Наши реализованные проекты в веб-разработке и внедрении ИИ. Практические результаты и решения." />
      <div className="max-w-3xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-white/80 tracking-wide font-medium mb-8"
        >
          <Briefcase className="w-4 h-4" />
          Cases & Solutions
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium text-white mb-6 tracking-tight leading-tight"
        >
          Реализованные <span className="premium-gradient-text">проекты</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-white/60 leading-relaxed"
        >
          От внутренних R&D компонентов до полноценных бизнес-интеграций. Строгая техническая подача,
          фокус на проблематике и измеримых результатах.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-4 flex flex-col gap-3"
        >
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCase(c.id)}
              className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                activeCase === c.id 
                  ? 'glass border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] bg-white/10' 
                  : 'border-transparent hover:bg-white/5 hover:border-white/10'
              }`}
            >
              <div className="text-[11px] font-mono tracking-wider text-purple-400 mb-2 uppercase">{c.category}</div>
              <div className={`text-lg font-display font-medium ${activeCase === c.id ? 'text-white' : 'text-white/70'}`}>
                {c.title}
              </div>
            </button>
          ))}
          
          <button 
            onClick={() => setPage('playground')}
            className="mt-8 flex items-center justify-between p-6 rounded-2xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors group text-left"
          >
            <div>
              <div className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">Попробовать в демо-стенде</div>
              <div className="text-sm text-white/50">Протестируйте AI сценарии</div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-purple-400 transition-colors" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8"
        >
          <div className="glass p-8 sm:p-10 rounded-[2rem] border border-white/10 min-h-[500px]">
            <AnimatePresence mode="wait">
              {cases.map((c) => c.id === activeCase && (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 mb-8">
                    {c.tech.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-3xl font-display font-medium text-white mb-10 pb-6 border-b border-white/10">
                    {c.title}
                  </h2>

                  <div className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
                      <div className="text-sm font-mono tracking-wider text-white/40 uppercase pt-1">Проблема (Problem)</div>
                      <div className="text-white/80 leading-relaxed">{c.problem}</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
                      <div className="text-sm font-mono tracking-wider text-white/40 uppercase pt-1">Решение (Solution)</div>
                      <div className="text-white/80 leading-relaxed">{c.solution}</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
                      <div className="text-sm font-mono tracking-wider text-white/40 uppercase pt-1 text-purple-400">Результат (Result)</div>
                      <div className="text-white/90 font-medium leading-relaxed">{c.result}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
