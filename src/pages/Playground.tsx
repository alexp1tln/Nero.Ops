import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Send, MessageSquare, Bot, ArrowRight, Zap, Database, Lock, Search } from 'lucide-react';
import { SYSTEM_PROMPT } from '../../prompt';
import { SEO } from '../components/SEO';

export function Playground() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'bot', text: string}>>([
    { role: 'bot', text: 'Привет! Я виртуальный ассистент технической поддержки. Чем могу помочь?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentInput = input;
    setMessages(prev => [...prev, { role: 'user', text: currentInput }]);
    setInput('');
    setIsTyping(true);

    try {
      setMessages(prev => [...prev, { role: 'bot', text: '' }]);
      setIsTyping(false);

      const res = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          text: currentInput,
          systemInstruction: SYSTEM_PROMPT
        })
      });

      if (!res.ok) {
         const errData = await res.json().catch(() => ({}));
         throw new Error(errData.error || 'Ошибка сети или API заблокировано (попробуйте использовать VPN).');
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('Нет ридера');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunkStr = decoder.decode(value, { stream: true });
        
        if (chunkStr) {
           setMessages(prev => {
            const newMessages = [...prev];
            const lastIdx = newMessages.length - 1;
            newMessages[lastIdx] = {
              ...newMessages[lastIdx],
              text: newMessages[lastIdx].text + chunkStr
            };
            return newMessages;
          });
        }
      }
    } catch(err: any) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: err.message || 'К сожалению, произошла ошибка сети.' 
      }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
      <SEO title="Демо-стенд ИИ" description="Интерактивная песочница Neuro.Ops. Протестируйте работу ИИ-агентов на практике." />
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-xs text-purple-300 tracking-wide font-medium mb-8"
        >
          <Terminal className="w-4 h-4" />
          Interactive Hub
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium text-white mb-6 tracking-tight leading-tight"
        >
          Демонстрационный <span className="premium-gradient-text">стенд</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Оцените вживую качество промпт-инжиниринга и работу автоматизированных систем поддержки. 
          Строгая техническая база и предсказуемый результат.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Zap className="w-8 h-8 text-purple-400 mb-6" />
            <h3 className="text-xl font-display font-medium text-white mb-3">Сценарий 1: Саппорт</h3>
            <p className="text-white/60 leading-relaxed text-[15px]">
              Протестируйте, как ассистент, обученный на корпоративной базе знаний (RAG), отвечает на вопросы клиентов, классифицирует инциденты и предлагает решения без участия оператора.
            </p>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Database className="w-8 h-8 text-blue-400 mb-6" />
            <h3 className="text-xl font-display font-medium text-white mb-3">Контекстная база</h3>
            <p className="text-white/60 leading-relaxed text-[15px]">
              Векторный поиск обеспечивает точность ответов. В демо-версии контекст ограничен общими фактами, в проде — интегрируется с вашей BPM/CRM.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-7"
        >
          <div className="glass rounded-[2rem] border border-white/10 overflow-hidden flex flex-col h-[600px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="h-16 border-b border-white/10 flex items-center px-6 gap-4 bg-white/[0.02]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <div className="ml-4 text-xs font-mono text-white/40 tracking-wider">L2_SUPPORT_AGENT // NEURO.OPS</div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6" id="chat-container">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.role === 'bot' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                      : 'bg-white/10 text-white/70 border border-white/10'
                  }`}>
                    {msg.role === 'bot' ? <Bot className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                  </div>
                  <div className={`px-5 py-3.5 rounded-2xl max-w-[80%] text-[15px] leading-relaxed ${
                    msg.role === 'bot'
                      ? 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                      : 'bg-purple-600 border border-purple-500 text-white rounded-tr-none shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/90 rounded-tl-none flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Введите ваш запрос..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors text-[15px]"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
