import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { receiptModels } from '../data/receiptModels';
import { blogPosts } from '../data/blogPosts';
import { 
  CheckCircle2, FileText, BadgeDollarSign, Briefcase, Home as HomeIcon, 
  ShoppingCart, Store, Sparkles, HeartHandshake, Scale, HandCoins, 
  Heart, Banknote, CheckCircle, Bed, Car, Hammer, Paintbrush, Zap, 
  Wrench, Truck, Settings, Smile, Brain, Activity, Apple, Camera, 
  GraduationCap, Baby, HeartPulse, Scissors, Sofa, Monitor, Leaf, 
  Building, PenTool, HardHat, Stethoscope, Dog, ChevronDown, ChevronRight
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-8 h-8 text-emerald-600" />,
  BadgeDollarSign: <BadgeDollarSign className="w-8 h-8 text-emerald-600" />,
  Briefcase: <Briefcase className="w-8 h-8 text-emerald-600" />,
  Home: <HomeIcon className="w-8 h-8 text-emerald-600" />,
  ShoppingCart: <ShoppingCart className="w-8 h-8 text-emerald-600" />,
  Store: <Store className="w-8 h-8 text-emerald-600" />,
  Sparkles: <Sparkles className="w-8 h-8 text-emerald-600" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8 text-emerald-600" />,
  Scale: <Scale className="w-8 h-8 text-emerald-600" />,
  HandCoins: <HandCoins className="w-8 h-8 text-emerald-600" />,
  Heart: <Heart className="w-8 h-8 text-emerald-600" />,
  Banknote: <Banknote className="w-8 h-8 text-emerald-600" />,
  CheckCircle: <CheckCircle className="w-8 h-8 text-emerald-600" />,
  Bed: <Bed className="w-8 h-8 text-emerald-600" />,
  Car: <Car className="w-8 h-8 text-emerald-600" />,
  Hammer: <Hammer className="w-8 h-8 text-emerald-600" />,
  Paintbrush: <Paintbrush className="w-8 h-8 text-emerald-600" />,
  Zap: <Zap className="w-8 h-8 text-emerald-600" />,
  Wrench: <Wrench className="w-8 h-8 text-emerald-600" />,
  Truck: <Truck className="w-8 h-8 text-emerald-600" />,
  Settings: <Settings className="w-8 h-8 text-emerald-600" />,
  Smile: <Smile className="w-8 h-8 text-emerald-600" />,
  Brain: <Brain className="w-8 h-8 text-emerald-600" />,
  Activity: <Activity className="w-8 h-8 text-emerald-600" />,
  Apple: <Apple className="w-8 h-8 text-emerald-600" />,
  Camera: <Camera className="w-8 h-8 text-emerald-600" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-emerald-600" />,
  Baby: <Baby className="w-8 h-8 text-emerald-600" />,
  HeartPulse: <HeartPulse className="w-8 h-8 text-emerald-600" />,
  Scissors: <Scissors className="w-8 h-8 text-emerald-600" />,
  Sofa: <Sofa className="w-8 h-8 text-emerald-600" />,
  Monitor: <Monitor className="w-8 h-8 text-emerald-600" />,
  Leaf: <Leaf className="w-8 h-8 text-emerald-600" />,
  Building: <Building className="w-8 h-8 text-emerald-600" />,
  PenTool: <PenTool className="w-8 h-8 text-emerald-600" />,
  HardHat: <HardHat className="w-8 h-8 text-emerald-600" />,
  Stethoscope: <Stethoscope className="w-8 h-8 text-emerald-600" />,
  Dog: <Dog className="w-8 h-8 text-emerald-600" />,
};

export function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Recibo Grátis",
    "url": "https://recibogratis.com.br",
    "description": "O maior portal de recibos do Brasil. Gere recibo simples, de pagamento, aluguel, prestação de serviços, MEI e muito mais.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://recibogratis.com.br/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Recibo Grátis",
    "operatingSystem": "Any",
    "applicationCategory": "BusinessApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "3142"
    },
    "featureList": [
      "Gerador de Recibo Simples",
      "Integração com QR Code Pix",
      "Recibo de Prestação de Serviços",
      "Nota Promissória"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    }
  };

  return (
    <>
      <SEO 
        title="Recibo Online Grátis | Crie seu PDF em Segundos"
        description="Crie recibos online grátis. Escolha o modelo, preencha no navegador e baixe PDF. Sem cadastro e sem instalação."
        keywords="recibo simples, recibo online grátis, recibo de pagamento, recibo de pedreiro, recibo de pintor, emitir recibo online, gerador de recibos, recibo fácil preencher"
        schema={JSON.stringify({ 
          "@context": "https://schema.org", 
          "@graph": [
            { ...websiteSchema, "@context": undefined }, 
            { ...softwareSchema, "@context": undefined }
          ] 
        })}
        url="https://recibogratis.com.br"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-600 text-white py-10 md:py-12 overflow-hidden">
        {/* Modern background pattern/glow */}
        <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-sm leading-tight">
            Gere recibo simples e profissional <br className="hidden md:block" />em segundos
          </h1>
          <h2 className="text-base md:text-lg text-emerald-50 max-w-3xl mx-auto mb-6 font-medium leading-relaxed drop-shadow-sm">
            Preencha e visualize na hora. Imprima ou baixe seu recibo em PDF sem precisar de cadastro. Totalmente grátis e com opção de cobrança via Pix.
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-emerald-900 font-semibold text-sm md:text-base mb-8">
            <Link to="/recibo-simples" className="bg-white hover:bg-emerald-50 px-5 py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center">
              Gerar Recibo Simples
              <FileText className="w-5 h-5" />
            </Link>
            <Link to="/modelos" className="bg-emerald-900/40 hover:bg-emerald-900/60 text-white border border-emerald-400/30 px-5 py-3 rounded-full transition-all backdrop-blur-md flex items-center gap-2 w-full sm:w-auto justify-center">
              Escolher modelo
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-emerald-50 font-medium text-[11px] sm:text-xs">
            <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Multiplataforma</span>
            </div>
            <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>40+ Modelos</span>
            </div>
            <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>100% Seguro</span>
            </div>
          </div>
          
          <div className="mt-5 text-emerald-100 text-[11px] sm:text-xs font-medium tracking-wide flex justify-center items-center opacity-90 transition-opacity flex-wrap gap-1">
            <Scale className="w-3.5 h-3.5 mr-1" />
            Documentos conforme Código Civil Brasileiro (art. 319-326) <span className="mx-1 sm:mx-2 hidden sm:inline">•</span> 
            <Link to="/politica-de-privacidade" className="underline underline-offset-2 hover:text-white mt-1 sm:mt-0">LGPD Compliance</Link>
          </div>
        </div>
      </section>

      {/* Models Grid Section */}
      <section id="modelos" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Modelos de Recibo Mais Usados</h2>
            <p className="text-lg text-gray-600">Selecione abaixo a opção que melhor se adapta à sua transação financeira.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {receiptModels.slice(0, 6).map((model) => (
              <Link 
                key={model.id} 
                to={`/${model.slug}`}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  {iconMap[model.icon] || <FileText className="w-8 h-8 text-emerald-600" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {model.title}
                </h3>
                <p className="text-gray-600 flex-grow">
                  {model.shortDescription}
                </p>
                <div className="mt-6 text-emerald-700 font-medium flex items-center gap-2">
                  Gerar Recibo 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/modelos" className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-8 py-3 rounded-xl font-medium transition-colors">
              Ver Todos os Modelos
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Por que somos o melhor Gerador de Recibo Online?</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              O <strong>Recibo Grátis</strong> foi criado para ser a ferramenta definitiva e mais moderna da internet brasileira. Superamos as alternativas do mercado focando em ser <strong>multiplataforma</strong>, oferecendo a melhor experiência tanto no computador quanto no celular.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Integração com Pix</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Diferente dos concorrentes, nosso gerador permite incluir seu QR Code Pix diretamente no recibo. Facilite o pagamento para o seu cliente e receba na hora.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Monitor className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Multiplataforma</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Gere recibos perfeitamente no seu smartphone, tablet ou computador. Nossa interface responsiva garante que você possa emitir comprovantes de qualquer lugar.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacidade Absoluta</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Não usamos banco de dados. Todo o processamento é feito <strong>exclusivamente no seu navegador</strong>. Seus dados e os do seu cliente estão 100% seguros.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mais de 40 Modelos</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Temos o formato exato que você precisa. Desde <Link to="/recibo-simples" className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2">recibo simples</Link>, <Link to="/recibo-de-aluguel" className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2">aluguel</Link>, <Link to="/recibo-de-prestacao-de-servicos" className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2">prestação de serviços</Link> até modelos específicos para médicos, pedreiros e MEIs.
              </p>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">Como fazer um recibo online?</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed text-center max-w-4xl mx-auto">
              Fazer um recibo, nota fiscal avulsa ou documento online nunca foi tão simples. Nosso sistema de RPA e emissão foi projetado para ser intuitivo, permitindo criar um comprovante de transação comercial com preenchimento automático. São recibos 100% válidos para declaração de IRPF e controle contábil, prontos para coletar a assinatura.
            </p>
            
            <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-bold text-emerald-900 mb-2">Escolha o Documento</h3>
                  <p className="text-emerald-800 text-sm">Selecione o tipo de modelo ideal (recibo simples, pagamento, MEI, aluguel ou promissória).</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-bold text-emerald-900 mb-2">Preencha os Dados</h3>
                  <p className="text-emerald-800 text-sm">Digite os valores e os dados requeridos e continue passo a passo.</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-bold text-emerald-900 mb-2">Pré-visualize</h3>
                  <p className="text-emerald-800 text-sm">Veja a prévia do documento sendo montada em tempo real na sua tela, exatamente como será impresso.</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                  <h3 className="font-bold text-emerald-900 mb-2">Baixe em PDF ou Imprima</h3>
                  <p className="text-emerald-800 text-sm">Pronto! Salve o documento em PDF de graça, mande por WhatsApp ou imprima já.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 border border-gray-100 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-semibold">
                  <h3 className="text-lg">O recibo online tem validade legal?</h3>
                  <span className="shrink-0 rounded-full bg-white p-1.5 text-emerald-900 group-open:-rotate-180 transition-transform">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="p-6 pt-0 leading-relaxed text-gray-600">
                  Sim! O recibo online, quando devidamente preenchido e assinado (comprovante de transação comercial), funciona como um comprovante com validade legal plena, atendendo aos requisitos do Código Civil Brasileiro. Ele serve para organização de caixa, quitação de dívidas e declaração de imposto de renda (IRPF/IRPJ).
                </div>
              </details>

              <details className="group bg-gray-50 border border-gray-100 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-semibold">
                  <h3 className="text-lg">Posso usar o recibo simples como nota fiscal avulsa ou RPA?</h3>
                  <span className="shrink-0 rounded-full bg-white p-1.5 text-emerald-900 group-open:-rotate-180 transition-transform">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="p-6 pt-0 leading-relaxed text-gray-600">
                  O recibo simples atua como comprovante de pagamento entre pessoas físicas ou profissionais autônomos sem CNPJ. Para contabilidade pesada empresarial, a nota fiscal é ideal, mas o recibo simples preenchido com seu CPF atua como um excelente substituto (estilo RPA) para pequenos trabalhos e transações B2C.
                </div>
              </details>

              <details className="group bg-gray-50 border border-gray-100 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-semibold">
                  <h3 className="text-lg">Vocês armazenam meus dados ou do meu cliente?</h3>
                  <span className="shrink-0 rounded-full bg-white p-1.5 text-emerald-900 group-open:-rotate-180 transition-transform">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="p-6 pt-0 leading-relaxed text-gray-600">
                  Não. Nosso gerador opera via preenchimento automático pelo navegador (client-side). Nós não temos um banco de dados que salva as informações dos recibos que você gera, garantindo total privacidade e conformidade com a LGPD.
                </div>
              </details>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/faq" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium transition-colors">
                Ver todas as perguntas frequentes <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Blog Section */}
          <div className="mt-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 pt-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Últimos artigos sobre MEI e Contabilidade</h2>
                  <p className="text-gray-600 mt-2">Dicas e guias práticos atualizados para organizar a vida financeira.</p>
                </div>
                <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors whitespace-nowrap">
                  Ir para o Blog <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="bg-white group rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col"
                  >
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4 w-max">
                        {post.category === 'financas' ? 'Finanças' : post.category === 'mei' ? 'MEI' : 'Autônomos'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-6 flex-grow">
                        {post.seoDescription}
                      </p>
                      <div className="text-emerald-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                        Ler artigo <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

