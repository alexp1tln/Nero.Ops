import { motion } from 'motion/react';
import { Database, Code, Cpu, Server, Globe, Key } from 'lucide-react';
import { InteractiveCard } from '../components/InteractiveCard';
import { SEO } from '../components/SEO';

interface TechItem {
  name: string;
  category: string;
}

export function Stack() {
  const stackList: TechItem[] = [
    { name: "React / Next.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "UI/UX" },
    { name: "TypeScript", category: "Languages" },
    { name: "Node.js (Express/Nest)", category: "Backend" },
    { name: "Python", category: "Data / AI" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Cache" },
    { name: "Docker / Kubernetes", category: "DevOps" },
    { name: "AWS / Google Cloud", category: "Cloud" },
    { name: "Make.com / Zapier", category: "Automation" },
    { name: "OpenAI API", category: "AI / LLM" }
  ];

  const categories = Array.from(new Set(stackList.map(item => item.category)));

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen bg-transparent relative">
       <SEO title="Технологический стек" description="Используемые Neuro.Ops технологии: React, Node.js, PostgreSQL, LLM Models." />
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="mb-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs text-white/50 tracking-widest font-semibold uppercase mb-10 shadow-[0_4px_24px_rgba(255,255,255,0.02)] cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Технологии
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-semibold text-white tracking-tight mb-8">Наш Стек</h1>
        <p className="text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
          Инструменты, которые мы используем для создания отказоустойчивых, масштабируемых и безопасных ИТ-решений.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {categories.map((category, idx) => (
          <InteractiveCard key={category} className="glass-panel p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-6 pb-2 border-b border-white/10">{category}</h3>
            <ul className="space-y-4">
              {stackList.filter(item => item.category === category).map((item) => (
                <li key={item.name} className="flex items-center gap-3 text-white/80 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  {item.name}
                </li>
              ))}
            </ul>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}
