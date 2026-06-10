/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ReceiptPage } from './pages/ReceiptPage';
import { Termos } from './pages/Termos';
import { Privacidade } from './pages/Privacidade';
import { Contato } from './pages/Contato';
import { PixGenerator } from './pages/PixGenerator';
import { Faq } from './pages/Faq';
import { AllModels } from './pages/AllModels';
import { BlogIndex } from './pages/blog/BlogIndex';
import { BlogPostView } from './pages/blog/BlogPostView';
import { ValorPorExtenso } from './pages/tools/ValorPorExtenso';
import { RetencaoImpostos } from './pages/tools/RetencaoImpostos';
import { DescontosMultas } from './pages/tools/DescontosMultas';
import { MaquininhaCartao } from './pages/tools/MaquininhaCartao';
import { DiasUteis } from './pages/tools/DiasUteis';
import { ConversorHoras } from './pages/tools/ConversorHoras';
import { ValidadorCpfCnpj } from './pages/tools/ValidadorCpfCnpj';
import { ConsultadorIbge } from './pages/tools/ConsultadorIbge';
import { GeradorPixCopiaECola } from './pages/tools/GeradorPixCopiaECola';

export default function App({ url, helmetContext = {} }: { url?: string, helmetContext?: any }) {
  const isServer = typeof window === 'undefined';

  const ApplicationRoutes = (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gerador-qr-code-pix" element={<PixGenerator />} />
        
        {/* Ferramentas */}
        <Route path="ferramentas/gerador-pix-copia-e-cola" element={<GeradorPixCopiaECola />} />
        <Route path="ferramentas/valor-por-extenso" element={<ValorPorExtenso />} />
        <Route path="ferramentas/calculadora-retencao-impostos" element={<RetencaoImpostos />} />
        <Route path="ferramentas/calculadora-desconto-multa" element={<DescontosMultas />} />
        <Route path="ferramentas/calculadora-maquininha-cartao" element={<MaquininhaCartao />} />
        <Route path="ferramentas/calculadora-dias-uteis" element={<DiasUteis />} />
        <Route path="ferramentas/conversor-horas-trabalhadas" element={<ConversorHoras />} />
        <Route path="ferramentas/validador-formatador-cpf-cnpj" element={<ValidadorCpfCnpj />} />
        <Route path="ferramentas/consultador-codigo-ibge" element={<ConsultadorIbge />} />

        <Route path="termos-de-uso" element={<Termos />} />
        <Route path="politica-de-privacidade" element={<Privacidade />} />
        <Route path="contato" element={<Contato />} />
        <Route path="faq" element={<Faq />} />
        <Route path="modelos" element={<AllModels />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/categoria/:category" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPostView />} />
        <Route path=":slug" element={<ReceiptPage />} />
      </Route>
    </Routes>
  );

  return (
    <HelmetProvider context={helmetContext}>
      {isServer ? (
        <StaticRouter location={url || '/'}>
          {ApplicationRoutes}
        </StaticRouter>
      ) : (
        <BrowserRouter>
          <RemoveTrailingSlash />
          {ApplicationRoutes}
        </BrowserRouter>
      )}
    </HelmetProvider>
  );
}

function RemoveTrailingSlash() {
  const location = useLocation();
  if (location.pathname !== '/' && location.pathname.endsWith('/')) {
    return <Navigate to={{ ...location, pathname: location.pathname.slice(0, -1) }} replace />;
  }
  return null;
}

