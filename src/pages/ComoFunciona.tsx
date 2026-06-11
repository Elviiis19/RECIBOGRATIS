import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { 
  CheckCircle2, FileText, Download, ShieldCheck, Lock, 
  Scale, FileSignature, Database, Printer, ChevronRight, Zap,
  Eye, Monitor, ChevronDown
} from 'lucide-react';

export function ComoFunciona() {
  return (
    <>
      <SEO 
        title="Como Funciona o Recibo Grátis | Fácil, Rápido e Seguro"
        description="Entenda de forma simples como nosso gerador de recibos online funciona. É rápido, 100% gratuito e protege seus dados de verdade."
        keywords="como funciona recibo online, passo a passo recibo, segurança recibo, lgpd recibos, como emitir recibo grátis"
      />

      {/* Hero Section */}
      <section className="bg-emerald-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <div className="inline-block px-4 py-1.5 bg-emerald-800/50 border border-emerald-700/50 text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wider mb-6">
            Fácil, Rápido e Seguro
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm">
            Como Funciona o Gerador
          </h1>
          <p className="text-xl text-emerald-100/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Entenda como você consegue criar recibos prontos para impressão em menos de 2 minutos, sem precisar de cadastro e com total proteção aos seus dados.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">4 Passos Simples</h2>
            <p className="text-gray-600 mt-4 text-lg">Sem complicação, direto ao ponto.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100/50 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-xl font-bold mb-6">01</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Escolha o Modelo Certo</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Temos recibos prontos para aluguel, prestação de serviços, MEI, compra e venda e muitos outros. É só escolher o que mais combina com a sua necessidade clicando nos botões.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100/50 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-xl font-bold mb-6">02</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preenchimento Inteligente</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Você digita os dados e nós formatamos tudo automaticamente (CPFs, CNPJs, etc). O sistema até converte o valor da transação e escreve o valor por extenso para você não perder tempo.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100/50 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-xl font-bold mb-6">03</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visualização na Hora</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Enquanto você digita, o recibo já vai aparecendo na tela idêntico a como será impresso no papel (tamanho A4). Não tem surpresas e você pode corrigir erros de digitação ali mesmo.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-100/50 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-xl font-bold mb-6">04</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pronto Para Imprimir</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Com um clique no botão de imprimir, seu documento vira um arquivo que você pode imprimir na folha ou salvar direto como PDF para mandar por e-mail e WhatsApp para seu cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Por que você pode confiar na nossa ferramenta?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nós sabemos que documentos e finanças precisam passar credibilidade e segurança. Por isso construímos uma página que te protege de qualquer dor de cabeça na hora de cobrar.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 bg-emerald-100/50 p-2 rounded-xl text-emerald-700">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 font-bold mb-1">100% Grátis de Verdade</strong>
                    <span className="text-gray-600 text-sm">Não tem pegadinha, não tem limite de uso, nem plano pago cobrando no cartão de crédito depois do 5º recibo. É uma ferramenta feita para facilitar a vida do pequeno empreendedor brasileiro, e sempre será assim.</span>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="mt-1 bg-emerald-100/50 p-2 rounded-xl text-emerald-700">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 font-bold mb-1">Privacidade Total dos Seus Dados</strong>
                    <span className="text-gray-600 text-sm">Nós respeitamos o sigilo do seu negócio e dos seus compradores (conforme a LGPD e outras leis). O que você digita fica apenas no seu celular ou computador. Nós da equipe do site não salvamos NADA em bancos de dados.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
              <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=600" alt="Auditoria contábil de Recibos e Finanças" className="rounded-2xl shadow-xl w-full object-cover aspect-video mb-8 opacity-90 mix-blend-multiply" />
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex gap-4 items-center">
                  <Scale className="w-10 h-10 text-emerald-600 flex-shrink-0" />
                  <p className="text-gray-800 text-sm font-medium">Todos os nossos modelos são embasados nas regras do <strong>Código Civil Brasileiro</strong> (sobre a prova de pagamento) para garantir que seu documento sirva perfeitamente como comprovante comercial e autônomo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-6 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-emerald-600" />
              Como Garantimos a Segurança das Suas Informações
            </h2>
            
            <div className="prose prose-emerald prose-lg max-w-none text-gray-600">
              <p>
                A maioria dos sites hoje pede que você faça um cadastro e, a cada recibo que você gera, eles salvam na internet informações completas sobre você, quanto você ganhou no mês e o que prestou de serviço.
              </p>
              <p>
                <strong>No Recibo Grátis, nós fizemos diferente. Fizemos seguro.</strong>
              </p>
              <p>
                O nosso gerador não funciona processando suas coisas nos nossos servidores. Quando você acessa o site, fazemos as contas ocorrerem diretamente de dentro do seu próprio navegador.
              </p>
              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <span><strong>Tudo no seu celular ou PC:</strong> Os CPFs, nomes e valores digitados jamais deixam a sua máquina para trafegar pela internet.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <span><strong>Descarte Automático:</strong> Assim que você fecha a janela do navegador onde tirou o recibo, tudo simplesmente "some" da memória do computador. Ninguém acessa depois.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <span><strong>Seu Arquivo, Cópia Única:</strong> Quando o PDF é gerado e baixado nas suas pastas, somos incapazes de re-imprimi-lo ou recuperar seus textos (já que, repetindo, não armazenamos eles).</span>
                </li>
              </ul>
              <p className="text-sm border-l-4 border-emerald-500 pl-4 bg-emerald-50/50 py-3 pr-3 rounded-r-lg font-bold text-emerald-900">
                Toda essa preocupação existe para te dar tranquilidade contra o vazamento de informações suas ou de quem você atende, ajudando a ficar 100% dentro das exigências da nova Lei de Proteção de Dados (LGPD).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center tracking-tight">Perguntas Dúvidas Comuns</h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 border border-gray-100 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-semibold">
                <h3 className="text-lg">Tenho que pagar depois de fazer alguns recibos?</h3>
                <span className="shrink-0 rounded-full bg-white p-1.5 text-emerald-900 group-open:-rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="p-6 pt-0 leading-relaxed text-gray-600">
                Não. Muitos sites na internet deixam você fazer 3 ou até 5 documentos grátis e, depois, bloqueiam seu PDF pedindo para assinar um "Plano Premium". Aqui não existe limites, você pode gerar quantos recibos quiser, o ano todo, sem colocar a mão no bolso.
              </div>
            </details>

            <details className="group bg-gray-50 border border-gray-100 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-semibold">
                <h3 className="text-lg">O recibo gerado tem validade para a Lei ou para imposto?</h3>
                <span className="shrink-0 rounded-full bg-white p-1.5 text-emerald-900 group-open:-rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="p-6 pt-0 leading-relaxed text-gray-600">
                Sim! A equipe do site estruturou os campos obrigatórios (tais como valor por extenso, assinaturas, identificação do CPF ou CNPJ e endereço). Desde que o recibo seja corretamente preenchido com dados verdadeiros e assinado por quem recebe o dinheiro, o documento é válido para a justiça, proteção do consumidor e inclusive para prestação de contas.
              </div>
            </details>

            <details className="group bg-gray-50 border border-gray-100 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-semibold">
                <h3 className="text-lg">Não achei o modelo que eu preciso. O que faço?</h3>
                <span className="shrink-0 rounded-full bg-white p-1.5 text-emerald-900 group-open:-rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="p-6 pt-0 leading-relaxed text-gray-600">
                Estamos sempre incluindo novos modelos no site (geralmente toda semana expandimos a biblioteca). Caso haja uma necessidade grande para a sua categoria (recibo para motoboy, pintor, pedreiro, salão de beleza), mande nas nossas redes!
              </div>
            </details>
          </div>
          
          <div className="mt-10 text-center text-gray-600">
            Quer saber mais sobre o uso da plataforma? Veja a nossa página de <Link to="/faq" className="text-emerald-700 font-bold hover:underline">Perguntas Frequentes (FAQ)</Link>.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-emerald-950 text-white border-t border-emerald-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Pronto para gerar o seu?</h2>
          <p className="text-emerald-100/80 text-xl mb-12 tracking-wide font-medium">
            Escolha seu modelo e tenha o documento na sua mão em questão de minutos de bate-pronto!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/recibo-simples" 
              className="bg-emerald-500 text-emerald-950 font-extrabold px-8 py-4 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Fazer Meu Primeiro Recibo <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/" 
              className="bg-emerald-900/50 text-emerald-100 border border-emerald-800 hover:bg-emerald-800 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
               Ver Todos os Modelos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
