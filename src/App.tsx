/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as rrd from 'react-router-dom';
const { BrowserRouter, Routes, Route, StaticRouter } = rrd.default || rrd;
import * as rha from 'react-helmet-async';
const { HelmetProvider } = rha.default || rha;
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ReceiptPage } from './pages/ReceiptPage';
import { Termos } from './pages/Termos';
import { Privacidade } from './pages/Privacidade';
import { Contato } from './pages/Contato';
import { PixGenerator } from './pages/PixGenerator';
import { Faq } from './pages/Faq';

export default function App({ url }: { url?: string }) {
  const isServer = typeof window === 'undefined';
  const Router = isServer ? StaticRouter : BrowserRouter;
  const routerProps = isServer ? { location: url || '/' } : {};

  return (
    <HelmetProvider>
      <Router {...routerProps}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="gerador-qr-code-pix" element={<PixGenerator />} />
            <Route path="termos-de-uso" element={<Termos />} />
            <Route path="politica-de-privacidade" element={<Privacidade />} />
            <Route path="contato" element={<Contato />} />
            <Route path="faq" element={<Faq />} />
            <Route path=":slug" element={<ReceiptPage />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
