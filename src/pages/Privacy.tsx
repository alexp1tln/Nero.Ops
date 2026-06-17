import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Privacy() {
  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 max-w-5xl mx-auto px-4 sm:px-6 w-full min-h-screen bg-transparent relative">
      <SEO title="Политика конфиденциальности" description="Политика конфиденциальности Neuro.Ops. Узнайте, как мы защищаем ваши корпоративные и личные данные." />
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="mb-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-white/50 tracking-widest font-semibold uppercase mb-10 shadow-[0_4px_24px_rgba(255,255,255,0.02)] cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Политика
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-semibold text-white tracking-tight mb-8 break-words hyphens-auto sm:break-normal">Конфиденциальность</h1>
        <p className="text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
          Мы серьезно относимся к безопасности ваших данных. Ваш корпоративный и личный контекст защищен передовыми протоколами шифрования.
        </p>
      </motion.div>

      <div className="glass-panel p-8 md:p-12 relative z-10 text-white/70 font-light leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-display text-white font-medium mb-4 flex items-center gap-3">
            <Shield className="w-6 h-6 text-white/50" />
            1. Сбор и использование данных
          </h2>
          <p>
            Настоящая политика конфиденциальности описывает, как Neuro.Ops (далее «Мы», «Компания») собирает, использует и защищает вашу личную информацию и корпоративные данные при использовании наших ИТ-услуг, консалтинга и автоматизации.
          </p>
          <p className="mt-4">
            Мы собираем только те данные, которые абсолютно необходимы для предоставления заявленных сервисов, включая контактные данные (имя, email, телефон) и техническую информацию, необходимую для аудита и настройки бизнес-процессов.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-white font-medium mb-4">
            2. Хранение и защита
          </h2>
          <p>
            Вся инфраструктура Neuro.Ops развернута с использованием защищенных облачных хранилищ, соответствующих международным стандартам безопасности. Мы используем сквозное шифрование для обмена конфиденциальными ключами, API-токенами и коммерческой тайной клиентов.
          </p>
          <p className="mt-4">
            Доступ к данным проектов имеет строго ограниченный круг лиц, подписавших NDA (соглашение о неразглашении).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-display text-white font-medium mb-4">
            3. Передача третьим лицам
          </h2>
          <p>
            Мы никогда не продаем и не передаем ваши данные сторонним организациям в маркетинговых целях. Передача данных возможна только в случаях:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-white/60">
            <li>Привлечения субподрядчиков (сугубо в рамках выполнения задач по вашему проекту и под строгим NDA).</li>
            <li>Необходимости интеграции сторонних сервисов (например, OpenAI, Make.com), о которых вы предварительно уведомляетесь.</li>
            <li>Требований законодательства.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-display text-white font-medium mb-4">
            4. Ваши права
          </h2>
          <p>
            Вы имеете полное право запросить удаление всех ваших личных и корпоративных данных с наших серверов по окончании сотрудничества. Запрос на удаление или выгрузку данных обрабатывается в течение рабочего дня.
          </p>
        </section>
      </div>
    </div>
  );
}
