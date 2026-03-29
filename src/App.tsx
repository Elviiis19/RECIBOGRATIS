/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ReceiptPage } from './pages/ReceiptPage';
import { Termos } from './pages/Termos';
import { Privacidade } from './pages/Privacidade';
import { Contato } from './pages/Contato';
import { PixGenerator } from './pages/PixGenerator';
import { Faq } from './pages/Faq';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </HelmetProvider>
  );
}
