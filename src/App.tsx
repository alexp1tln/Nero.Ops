/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AppProvider } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { SLA } from './pages/SLA';
import { Stack } from './pages/Stack';
import { Contact } from './pages/Contact';
import { Cases } from './pages/Cases';
import { Footer } from './components/Footer';

export type Page = 'home' | 'about' | 'catalog' | 'dashboard' | 'faq' | 'privacy' | 'sla' | 'stack' | 'contact' | 'cases';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <AppProvider>
      <AnimatedBackground />
      <div className="min-h-screen bg-transparent text-[#f5f5f7] flex flex-col font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-white relative z-0">
        <Navigation currentPage={page} setPage={setPage} />
        <main className="flex-1 flex flex-col relative w-full">
          {page === 'home' && <Home setPage={setPage} />}
          {page === 'about' && <About setPage={setPage} />}
          {page === 'catalog' && <Catalog setPage={setPage} />}
          {page === 'faq' && <FAQ />}
          {page === 'privacy' && <Privacy />}
          {page === 'sla' && <SLA />}
          {page === 'stack' && <Stack />}
          {page === 'contact' && <Contact />}
          {page === 'cases' && <Cases setPage={setPage} />}
        </main>
        <Footer setPage={setPage} />
      </div>
      <SpeedInsights />
    </AppProvider>
  );
}
