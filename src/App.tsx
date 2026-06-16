/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AppProvider } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { SLA } from './pages/SLA';
import { Stack } from './pages/Stack';
import { Contact } from './pages/Contact';
import { Footer } from './components/Footer';

export type Page = 'home' | 'about' | 'catalog' | 'dashboard' | 'faq' | 'privacy' | 'sla' | 'stack' | 'contact';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [page]);

  return (
    <AppProvider>
      <CustomCursor />
      <AnimatedBackground />
      <div className="min-h-screen bg-transparent text-[#f5f5f7] flex flex-col font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-white relative z-0">
        <Navigation currentPage={page} setPage={setPage} />
        <main className="flex-1 flex flex-col relative w-full">
          {page === 'home' && <Home setPage={setPage} />}
          {page === 'about' && <About setPage={setPage} />}
          {page === 'catalog' && <Catalog setPage={setPage} />}
          {page === 'faq' && <FAQ />}
          {page === 'dashboard' && <Dashboard setPage={setPage} />}
          {page === 'privacy' && <Privacy />}
          {page === 'sla' && <SLA />}
          {page === 'stack' && <Stack />}
          {page === 'contact' && <Contact />}
        </main>
        <Footer setPage={setPage} />
      </div>
      <SpeedInsights />
    </AppProvider>
  );
}
