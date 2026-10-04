/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ReceiptPage } from './pages/ReceiptPage';
import { Termos } from './pages/Termos';
import { Privacidade } from './pages/Privacidade';
import { Contato } from './pages/Contato';
import { ComoFunciona } from './pages/ComoFunciona';
import { PixGenerator } from './pages/PixGenerator';
import { Faq } from './pages/Faq';
import { AllModels } from './pages/AllModels';
import { AllTools } from './pages/AllTools';
import { GeradorCarnePagamento } from './pages/tools/GeradorCarnePagamento';
import { CalculadoraPrecificacao } from './pages/tools/CalculadoraPrecificacao';
import { CalculadoraHoraExtra } from './pages/tools/CalculadoraHoraExtra';
import { ControleFiados } from './pages/tools/ControleFiados';

import { BlogIndex } from './pages/blog/BlogIndex';
import { BlogPostView } from './pages/blog/BlogPostView';

import DeclarationIndex from './pages/declarations/DeclarationIndex';
import DeclarationPage from './pages/declarations/DeclarationPage';

import { ValorPorExtenso } from './pages/tools/ValorPorExtenso';
import { RetencaoImpostos } from './pages/tools/RetencaoImpostos';
import { DescontosMultas } from './pages/tools/DescontosMultas';
import { MaquininhaCartao } from './pages/tools/MaquininhaCartao';
import { DiasUteis } from './pages/tools/DiasUteis';
import { ConversorHoras } from './pages/tools/ConversorHoras';
import { ValidadorCpfCnpj } from './pages/tools/ValidadorCpfCnpj';
import { ConsultadorIbge } from './pages/tools/ConsultadorIbge';
import { GeradorPixCopiaECola } from './pages/tools/GeradorPixCopiaECola';
import { LeitorQrCode } from './pages/tools/LeitorQrCode';

import { DocumentHistory } from './pages/DocumentHistory';

export default function App({ url }: { url?: string }) {
  const isServer = typeof window === 'undefined';

  const ApplicationRoutes = (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gerador-qr-code-pix" element={<PixGenerator />} />
        <Route path="meus-documentos" element={<DocumentHistory />} />
        <Route path="historico" element={<Navigate to="/meus-documentos" replace />} />
        
        {/* Ferramentas */}
        <Route path="gerador-pix-copia-e-cola" element={<GeradorPixCopiaECola />} />
        <Route path="leitor-decodificador-qr-code" element={<LeitorQrCode />} />
        <Route path="valor-por-extenso" element={<ValorPorExtenso />} />
        <Route path="calculadora-retencao-impostos" element={<RetencaoImpostos />} />
        <Route path="calculadora-desconto-multa" element={<DescontosMultas />} />
        <Route path="calculadora-maquininha-cartao" element={<MaquininhaCartao />} />
        <Route path="calculadora-dias-uteis" element={<DiasUteis />} />
        <Route path="conversor-horas-trabalhadas" element={<ConversorHoras />} />
        <Route path="validador-formatador-cpf-cnpj" element={<ValidadorCpfCnpj />} />
        <Route path="consultador-codigo-ibge" element={<ConsultadorIbge />} />

        <Route path="termos-de-uso" element={<Termos />} />
        <Route path="politica-de-privacidade" element={<Privacidade />} />
        <Route path="contato" element={<Contato />} />
        <Route path="faq" element={<Faq />} />
        <Route path="como-funciona" element={<ComoFunciona />} />
        <Route path="modelos" element={<AllModels />} />
        <Route path="ferramentas" element={<AllTools />} />
        <Route path="ferramentas/:tool" element={<ToolRedirect />} />
        <Route path="gerador-carne-pagamento" element={<GeradorCarnePagamento />} />
        <Route path="calculadora-precificacao-produtos" element={<CalculadoraPrecificacao />} />
        <Route path="calculadora-hora-extra" element={<CalculadoraHoraExtra />} />
        <Route path="controle-de-fiados" element={<ControleFiados />} />

        
        {/* Declarações */}
        <Route path="declaracoes" element={<DeclarationIndex />} />
        <Route path="declaracoes/:slug" element={<DeclarationPage />} />

        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/categoria/:category" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPostView />} />
        {/* Unificação de autoridade SEO: recibo-de-pagamento redireciona para recibo-simples */}
        <Route path="recibo-de-pagamento" element={<Navigate to="/recibo-simples" replace />} />
        <Route path=":slug" element={<ReceiptPage />} />
      </Route>
    </Routes>
  );

  return (
    <>
      {isServer ? (
        <StaticRouter location={url || '/'}>
          <RemoveTrailingSlash />
          {ApplicationRoutes}
        </StaticRouter>
      ) : (
        <BrowserRouter>
          <RemoveTrailingSlash />
          {ApplicationRoutes}
        </BrowserRouter>
      )}
    </>
  );
}


function ToolRedirect() {
  const { tool } = useParams();
  return <Navigate to={`/${tool}`} replace />;
}

function RemoveTrailingSlash() {
  const location = useLocation();
  if (location.pathname !== '/' && location.pathname.endsWith('/')) {
    return <Navigate to={{ ...location, pathname: location.pathname.slice(0, -1) }} replace />;
  }
  return null;
}

