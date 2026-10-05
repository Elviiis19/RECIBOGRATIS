import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ReceiptGenerator } from '../components/ReceiptGenerator';
import { AdSense } from '../components/AdSense';
import { AdsKeeper } from '../components/AdsKeeper';
import { receiptModels } from '../data/receiptModels';
import { CheckCircle2, ChevronRight, FileText, Video, Download, Copy, Check, ArrowRight, Zap, Sparkles, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import { richSeoData } from '../data/richSeoContent';
import { YoutubeEmbed } from '../components/YoutubeEmbed';
import { getReceiptGuide } from '../data/receiptGuides';

export function ReceiptPage() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [copiedExampleIndex, setCopiedExampleIndex] = useState<number | null>(null);
  
  // Find the specific model based on the URL slug
  const model = receiptModels.find(m => m.slug === slug);
  const guide = model ? getReceiptGuide(model.slug, model.title) : null;

  const handleCopyTemplate = () => {
    const templateText = `RECIBO Nº 01\n\nRecebi de JOSÉ APARECIDO DA SILVA, CPF: 123.456.789-00, a importância de R$ 130,00 (cento e trinta reais), referente a serviço de manutenção em computador.\n\nObservações: Pagamento recebido em dinheiro.\n\nPara maior clareza, firmo o presente recibo para que produza os seus efeitos, dando plena, rasa e irrevogável quitação.\n\nRio de Janeiro - RJ, 28 de setembro de 2026\n\n________________________________________\nANTÔNIO JOSÉ PINHEIRO\nCPF: 123.456.789-00\n\nDocumento gerado gratuitamente pelo site recibogratis.com.br`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(templateText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const handleCopyExample = (index: number, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedExampleIndex(index);
        setTimeout(() => setCopiedExampleIndex(null), 3000);
      });
    }
  };

  // If the slug doesn't match any model, redirect to home
  if (!model) {
    return <Navigate to="/" replace />;
  }

  const currentUrl = `https://recibogratis.com.br/${model.slug}`;

  // Helper de categoria para estrutura de 4 níveis
  const getModelCategory = (slug: string) => {
    if (slug.includes('aluguel') || slug.includes('chaves') || slug.includes('sinal')) {
      return { name: 'Locação e Imóveis', slug: 'locacao-e-imoveis' };
    }
    if (slug.includes('mei') || slug.includes('salario') || slug.includes('adiantamento') || slug.includes('diaria') || slug.includes('vale') || slug.includes('pensao')) {
      return { name: 'Trabalho e Salários', slug: 'trabalho-e-salarios' };
    }
    if (slug === 'recibo-simples' || slug === 'recibo-pix' || slug === 'recibo-com-logo' || slug === 'recibo-de-compra-e-venda' || slug === 'recibo-de-quitacao' || slug === 'recibo-de-doacao' || slug.includes('promissoria') || slug.includes('ordem-de-servico') || slug.includes('orcamento')) {
      return { name: 'Comercial e Pagamentos', slug: 'comercial-e-pagamentos' };
    }
    return { name: 'Serviços e Autônomos', slug: 'servicos-e-autonomos' };
  };

  const categoryInfo = getModelCategory(model.slug);

  // Generate JSON-LD Schemas com 4 níveis hierárquicos
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${currentUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://recibogratis.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Modelos de Recibo",
        "item": "https://recibogratis.com.br/modelos"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryInfo.name,
        "item": `https://recibogratis.com.br/modelos#${categoryInfo.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": model.title,
        "item": currentUrl
      }
    ]
  };

  const richData = richSeoData[model.id];

  const titleLower = model.title.toLowerCase();
  const baseTitle = `${model.title} | Gerador Online em PDF Grátis`;
  const dynamicTitle = model.seoTitle || baseTitle;
  const dynamicDesc = model.seoDescription || richData?.intro || `Gere gratuitamente seu ${titleLower} online. Preencha, imprima em PDF ou envie por WhatsApp. Rápido, seguro e grátis.`;

  const heroSubtitle = model.seoDescription || `Gere seu documento de ${titleLower} grátis, preencha online e baixe em PDF na hora. Sem burocracia e sem cadastro.`;

  const defaultIntro = `O ${titleLower} é um instrumento contábil fundamental utilizado para comprovar formalmente e legalmente que uma transação, investimento ou serviço financeiro foi pago e quitado. Emitido por quem recebe os fundos em favor do pagador, sua guarda garante segurança patrimonial. Ter um recibo bem estruturado é indispensável para evitar dupla tributação e cobranças indevidas, além de manter o controle rigoroso de fluxo de caixa, garantir a organização contábil da sua empresa e servir como lastro documental para o faturamento mensal.`;

  const defaultSpecificDetailsList = [
    'Separação explícita entre custos operacionais, juros, descontos financeiros e o valor principal da prestação de serviço.',
    'Detalhamento fiduciário do local, formato e circunstâncias da operação para transparência da contabilidade.',
    'Indicação transparente da fase de liquidação de pagamento (sinal, parcela bancária, quitação de dívida ou adiantamento).',
    'Menção de cadastros, conselhos de classe ou alvarás, ajudando no balanço patrimonial e apuração tributária (IRPF e IRPJ).'
  ];

  const defaultLsiText = `Integrar a emissão deste documento ao seu planejamento financeiro diário é um passo de excelência na gestão orçamentária e regularidade fiscal das suas atividades comerciais. O documento serve como suporte contábil robusto perante a Receita Federal durante a declaração do Imposto de Renda e afasta a necessidade de controles paralelos de contabilidade, blindando sua receita contra multas. Manter o histórico de operações de caixa 100% documentado facilita a aprovação de linhas de crédito, obtenção de empréstimos e consolidação do crédito bancário e financeiro da empresa.`;

  const defaultCtaText = `Pare de usar folhas soltas ou arquivos antigos em Word. Crie, emprima em PDF e envie este comprovante por WhatsApp imediatamente.`;

  const finalFaqs = model.faqs || [];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${currentUrl}#software`,
    "name": model.id === 'simples' ? "Gerador de Recibo Simples Online e em Word" : `Gerador de ${model.title}`,
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "BRL"
    },
    "description": dynamicDesc,
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": `${currentUrl}#aggregateRating`,
      "ratingValue": "4.9",
      "reviewCount": "1420",
      "bestRating": "5",
      "worstRating": "1",
      "itemReviewed": {
        "@type": "SoftwareApplication",
        "@id": `${currentUrl}#software`,
        "name": model.id === 'simples' ? "Gerador de Recibo Simples Online e em Word" : `Gerador de ${model.title}`
      }
    },
    "publisher": {
      "@id": "https://recibogratis.com.br/#organization"
    }
  };

  const howToSchema: any = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": model.id === 'simples' ? "Como fazer um recibo simples online ou em Word" : `Como preencher o ${model.title}`,
    "description": model.id === 'simples'
      ? "Passo a passo para gerar um recibo simples em PDF ou baixar o modelo em Word (.docx) grátis sem cadastro."
      : `Aprenda passo a passo como gerar seu ${titleLower} facilmente.`,
    "step": model.id === 'simples' ? [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Preencha os dados essenciais",
        "text": "Informe valor numérico, pagador, recebedor, motivo (referente a) e a data do pagamento."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Revise a prévia em tempo real",
        "text": "Confira os dados na tela com conversão automática do valor por extenso e opção de QR Code Pix."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Baixe em PDF ou em Word (.docx)",
        "text": "Gere o documento final em PDF para imprimir ou compartilhar no WhatsApp, ou baixe o modelo em Word para editar no computador."
      }
    ] : [
      {
        "@type": "HowToStep",
        "name": "Acessar o gerador",
        "text": "Abra a página do gerador de recibos online."
      },
      {
        "@type": "HowToStep",
        "name": "Informar o valor",
        "text": "Digite o valor numérico exato da transação."
      },
      {
        "@type": "HowToStep",
        "name": "Preencher dados",
        "text": "Insira o nome, CPF/CNPJ de quem paga e de quem recebe."
      },
      {
        "@type": "HowToStep",
        "name": "Descrever o pagamento",
        "text": "Preencha com exatidão a que se refere o pagamento."
      },
      {
        "@type": "HowToStep",
        "name": "Gerar PDF",
        "text": "Clique no botão de imprimir ou gerar PDF para baixar e utilizar o recibo."
      }
    ]
  };

  if (model.id === 'simples') {
    howToSchema.video = {
      "@type": "VideoObject",
      "name": "Como preencher recibo simples online passo a passo",
      "description": "Aprenda a preencher e gerar um recibo simples ou recibo comercial online com nosso gerador gratuito em PDF.",
      "thumbnailUrl": "https://img.youtube.com/vi/l4102DNZ0NE/maxresdefault.jpg",
      "contentUrl": "https://www.youtube.com/watch?v=l4102DNZ0NE",
      "embedUrl": "https://www.youtube.com/embed/l4102DNZ0NE",
      "uploadDate": "2026-06-28T08:00:00-03:00",
      "duration": "PT2M",
      "publisher": {
        "@type": "Organization",
        "name": "Recibo Grátis",
        "logo": {
          "@type": "ImageObject",
          "url": "https://recibogratis.com.br/logo.png"
        }
      }
    };
  }

  const faqSchema = finalFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": finalFaqs.map((faq: {question: string, answer: string}) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Combine schemas into an array
  const schemas: any[] = [
    { ...breadcrumbSchema, "@context": undefined }, 
    { ...softwareSchema, "@context": undefined },
    { ...howToSchema, "@context": undefined }
  ];
  if (faqSchema) schemas.push({ ...faqSchema, "@context": undefined });
  
  const schemaString = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas
  });

  const rawH1 = richData?.h1 || dynamicTitle;
  const renderH1WithBreak = () => {
    const parts = rawH1.split(' | ');
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && <br className="hidden md:block" />}
      </span>
    ));
  };

  return (
    <>
      <SEO 
        title={dynamicTitle} 
        description={dynamicDesc}
        keywords={model.keywords}
        schema={schemaString}
        url={currentUrl}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-600 text-white py-8 md:py-12 overflow-hidden">
        {/* Modern background pattern/glow */}
        <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumbs - Hierarquia Agêntica de 4 Níveis */}
          <nav className="flex items-center text-emerald-100 text-sm mb-6 flex-wrap" aria-label="Navegação estrutural">
            <ol className="flex items-center space-x-2 flex-wrap text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-300/70" />
              </li>
              <li>
                <Link to="/modelos" className="hover:text-white transition-colors">
                  <span>Modelos</span>
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-300/70" />
              </li>
              <li>
                <Link to={`/modelos#${categoryInfo.slug}`} className="hover:text-white transition-colors">
                  <span>{categoryInfo.name}</span>
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-300/70" />
              </li>
              <li className="text-white font-semibold" aria-current="page">
                <span>{model.title}</span>
              </li>
            </ol>
            
            <div className="hidden sm:flex ml-auto items-center">
               <Link to="/modelos" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium bg-black/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                  Ver Todos os Modelos
               </Link>
            </div>
          </nav>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight mb-4 mt-2 leading-tight">
              {renderH1WithBreak()}
            </h1>
            <p className="text-lg md:text-xl text-emerald-50 max-w-3xl mx-auto mb-8 font-medium leading-relaxed drop-shadow-sm">
              {heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-emerald-50 font-medium text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Sem Cadastro</span>
              </div>
              <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Gera PDF na Hora</span>
              </div>
            </div>
            
            <div className="flex sm:hidden justify-center mt-6">
               <Link to="/modelos" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium bg-black/10 px-4 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
                  Ver Todos os Modelos
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Intro Above Fold */}
      <section className="relative z-20 -mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-emerald-100 shadow-md text-center">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium m-0">
            {richData?.intro || model.seoContent?.p1 || defaultIntro}
          </p>

          {model.id === 'simples' && (
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('generator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer hover:shadow-md"
              >
                <Zap className="w-4 h-4 text-emerald-200" />
                <span>Preencher Online (PDF)</span>
              </button>

              <a
                href="/modelos/modelo-recibo-simples.docx"
                download="modelo-recibo-simples.docx"
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-sm transition-all cursor-pointer hover:shadow-md"
              >
                <Download className="w-4 h-4 text-blue-200" />
                <span>Baixar Modelo em Word</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('exemplos-prontos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-bold text-sm border border-gray-300 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-gray-600" />
                <span>Ver Modelos Prontos</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="pb-12 bg-gray-50 relative z-10 pt-4 scroll-mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReceiptGenerator 
            key={model.slug}
            title={model.title} 
            defaultReferenteA={model.defaultReferenteA}
          />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="space-y-16">
            {model.seoContent && model.seoContent.h2 && (
              <article>
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  {model.seoContent.h2}
                </h2>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                  {model.seoContent.p1 && (
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{model.seoContent.p1}</p>
                  )}
                  {model.seoContent.h3 && (
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{model.seoContent.h3}</h3>
                  )}
                  {model.seoContent.p2 && (
                    <p className="text-gray-600 text-lg leading-relaxed">{model.seoContent.p2}</p>
                  )}
                </div>
              </article>
            )}

            {/* Seções de Alta Confiança E-E-A-T: Aviso Legal, Erros Comuns e Quando Não Usar */}
            {guide && (
              <>
                {/* Box de Segurança e Aviso Legal */}
                <article>
                  <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full">
                            {guide.legalDisclaimer.badge}
                          </span>
                          <span className="text-xs text-emerald-800 font-semibold">
                            {guide.legalDisclaimer.lawReference}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-emerald-950">
                          {guide.legalDisclaimer.title}
                        </h3>
                        <p className="text-emerald-900/90 text-base leading-relaxed">
                          {guide.legalDisclaimer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>

                {/* 4 Erros Comuns */}
                <article>
                  <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
                    {guide.commonErrors.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {guide.commonErrors.errors.map((err) => (
                      <div key={err.number} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-amber-300 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center mb-3">{err.number}</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{err.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {err.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>

                {/* Quando NÃO Usar */}
                <article>
                  <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                    {guide.whenNotToUse.title}
                  </h2>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 space-y-4">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {guide.whenNotToUse.description}
                    </p>
                    <ul className="space-y-3 text-gray-700 text-base">
                      {guide.whenNotToUse.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-red-500 font-bold text-lg leading-none mt-1">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-emerald-100/70 border border-emerald-300 rounded-xl p-4 text-emerald-950 text-sm font-medium mt-4">
                      💡 <strong>Regra prática:</strong> {guide.whenNotToUse.practicalRule}
                    </div>
                  </div>
                </article>
              </>
            )}

            {/* Seção Exclusiva: Modelo de Recibo Pronto (Exemplo Preenchido e Download Word DOCX) */}
            {model.id === 'simples' && (
              <article id="modelo-word-exemplo" className="scroll-mt-6">
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Modelo de recibo de pagamento pronto (exemplo preenchido)
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Veja abaixo um exemplo real de recibo preenchido conforme as normas jurídicas brasileiras. Você pode <strong>baixar o arquivo original em Word (.docx)</strong> diretamente do nosso site para editar em seu computador, imprimir em branco para preencher com caneta, ou usar nosso gerador online no topo da página:
                </p>

                {/* Card visual do modelo fiel à imagem enviada */}
                <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-md p-6 md:p-10 mb-8 transition-shadow hover:shadow-lg">
                  <div className="text-center text-xs text-gray-500 mb-4 pb-2 border-b border-gray-100 font-sans">
                    Documento gerado gratuitamente pelo site <span className="font-semibold text-emerald-700">recibogratis.com.br</span>
                  </div>

                  <div className="border-2 border-gray-800 rounded-lg p-6 md:p-8 bg-white max-w-2xl mx-auto shadow-sm">
                    <div className="text-center mb-6">
                      <span className="text-2xl md:text-3xl font-black text-blue-900 tracking-wider uppercase block">
                        RECIBO
                      </span>
                      <span className="text-base font-bold text-gray-700 block mt-1">
                        Nº 01
                      </span>
                    </div>

                    <div className="space-y-4 text-gray-900 text-base md:text-lg leading-relaxed font-sans">
                      <p>
                        Recebi de <strong>JOSÉ APARECIDO DA SILVA</strong>, CPF: 123.456.789-00, a importância de <strong>R$ 130,00</strong> (cento e trinta reais), referente a <strong>serviço de manutenção em computador</strong>.
                      </p>

                      <p>
                        <strong>Observações:</strong> Pagamento recebido em dinheiro.
                      </p>

                      <p className="text-sm md:text-base text-gray-800">
                        Para maior clareza, firmo o presente recibo para que produza os seus efeitos, dando plena, rasa e irrevogável quitação.
                      </p>

                      <div className="text-right pt-4 text-sm md:text-base font-medium text-gray-800">
                        Rio de Janeiro - RJ, 28 de setembro de 2026
                      </div>

                      <div className="pt-8 text-center">
                        <div className="w-64 sm:w-80 h-0.5 bg-gray-700 mx-auto mb-2"></div>
                        <p className="font-bold text-gray-900 tracking-wide text-base uppercase">
                          ANTÔNIO JOSÉ PINHEIRO
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          CPF: 123.456.789-00
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                      href="/modelos/modelo-recibo-simples.docx" 
                      download="modelo-recibo-simples.docx"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-base shadow-sm transition-all hover:shadow-md cursor-pointer"
                    >
                      <Download className="w-5 h-5" />
                      Baixar modelo em Word (.docx)
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyTemplate}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-base transition-colors border border-gray-300 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5 text-emerald-600" />
                          <span className="text-emerald-700">Modelo Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 text-gray-600" />
                          <span>Copiar Texto do Recibo</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const gen = document.getElementById('generator');
                        if (gen) gen.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-base shadow-sm transition-colors cursor-pointer"
                    >
                      <FileText className="w-5 h-5" />
                      Preencher no Gerador Online
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Arquivo Word 100% editável (.docx), sem vírus e com download direto do nosso próprio domínio.
                  </p>
                </div>
              </article>
            )}

            {/* Modelos Prontos para Copiar por Situação Real */}
            {model.id === 'simples' && (
              <article id="exemplos-prontos" className="scroll-mt-6">
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Modelos de recibo prontos para copiar (por situação)
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Precisa de um modelo pronto para mandar pelo WhatsApp, imprimir ou colar no seu editor? Escolha a sua situação abaixo e clique em <strong>"Copiar Modelo"</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Exemplo 1: Prestação de Serviços */}
                  <div className="bg-white rounded-2xl border-2 border-emerald-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full uppercase tracking-wider">
                          Mão de Obra
                        </span>
                        <Zap className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Serviços Autônomos</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        Para pedreiros, diaristas, pintores, encanadores, mecânicos e freelancers.
                      </p>
                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs text-gray-800 font-mono leading-relaxed mb-4 select-all">
                        {`RECEBI de [Nome do Cliente], CPF nº [000.000.000-00], a quantia de R$ 350,00 (trezentos e cinquenta reais), referente a serviços de reparos e pintura residencial realizados no endereço [Endereço], dando plena e geral quitação.`}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyExample(1, `RECEBI de [Nome do Cliente], CPF nº [000.000.000-00], a quantia de R$ 350,00 (trezentos e cinquenta reais), referente a serviços de reparos e pintura residencial realizados no endereço [Endereço], dando plena e geral quitação.\n\n[Cidade - UF], [Data]\n_______________________\n[Nome de Quem Recebeu]\nCPF: [000.000.000-00]`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-sm border border-emerald-200 transition-colors cursor-pointer"
                    >
                      {copiedExampleIndex === 1 ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Copiado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-emerald-700" />
                          <span>Copiar Modelo</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Exemplo 2: Venda de Veículo ou Item Usado */}
                  <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-bold text-xs rounded-full uppercase tracking-wider">
                          Compra e Venda
                        </span>
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Venda de Veículo / Item</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        Para venda de carros, motos, celulares e móveis usados no OLX ou Marketplace.
                      </p>
                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs text-gray-800 font-mono leading-relaxed mb-4 select-all">
                        {`RECEBI de [Nome do Comprador], CPF nº [000.000.000-00], a quantia de R$ 15.000,00 (quinze mil reais), referente à compra do veículo [Marca/Modelo], Placa [ABC-1234], no estado em que se encontra.`}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyExample(2, `RECEBI de [Nome do Comprador], CPF nº [000.000.000-00], a quantia de R$ 15.000,00 (quinze mil reais), referente à compra do veículo [Marca/Modelo], Placa [ABC-1234], Renavam [00000000000], no estado em que se encontra, nada mais havendo a reclamar.\n\n[Cidade - UF], [Data]\n_______________________\n[Nome de Quem Vendeu]\nCPF: [000.000.000-00]`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-sm border border-blue-200 transition-colors cursor-pointer"
                    >
                      {copiedExampleIndex === 2 ? (
                        <>
                          <Check className="w-4 h-4 text-blue-600" />
                          <span>Copiado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-blue-700" />
                          <span>Copiar Modelo</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Exemplo 3: Pagamento de Sinal / Acerto */}
                  <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-purple-100 text-purple-800 font-bold text-xs rounded-full uppercase tracking-wider">
                          Sinal ou Acerto
                        </span>
                        <Sparkles className="w-4 h-4 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Sinal / Acerto de Contas</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        Para garantir reserva de serviços, entrada de compras ou acertos entre conhecidos.
                      </p>
                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs text-gray-800 font-mono leading-relaxed mb-4 select-all">
                        {`RECEBI de [Nome do Pagador], CPF nº [000.000.000-00], a quantia de R$ 800,00 (oitocentos reais), a título de sinal e início de pagamento referente a [Descrever o Serviço ou Negócio].`}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyExample(3, `RECEBI de [Nome do Pagador], CPF nº [000.000.000-00], a quantia de R$ 800,00 (oitocentos reais), a título de sinal e início de pagamento referente a [Descrever o Serviço ou Negócio], restando o saldo a ser quitado na conclusão.\n\n[Cidade - UF], [Data]\n_______________________\n[Nome de Quem Recebeu]\nCPF: [000.000.000-00]`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-sm border border-purple-200 transition-colors cursor-pointer"
                    >
                      {copiedExampleIndex === 3 ? (
                        <>
                          <Check className="w-4 h-4 text-purple-600" />
                          <span>Copiado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-purple-700" />
                          <span>Copiar Modelo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* Recibo de Pagamento x Recibo Simples: É a mesma coisa? */}
            {model.id === 'simples' && (
              <article>
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Recibo de pagamento × recibo simples: é a mesma coisa?
                </h2>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    <strong>Sim! Perante a lei brasileira eles têm exatamente o mesmo valor e a mesma validade jurídica.</strong> Ambos são o comprovante oficial de quitação que prova que o pagador entregou o dinheiro e o recebedor deu baixa na dívida.
                  </p>
                  <p>
                    A única diferença é na forma como as pessoas pesquisam no dia a dia:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <strong className="text-gray-900 block mb-1">Recibo Simples</strong>
                      <span className="text-sm text-gray-600">
                        Termo mais popular para transações do dia a dia entre pessoas físicas: venda de itens usados (carros, motos, celulares), diárias de pedreiros e faxineiras, e pequenos acertos.
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <strong className="text-gray-900 block mb-1">Recibo de Pagamento</strong>
                      <span className="text-sm text-gray-600">
                        Termo muito buscado para ambientes de trabalho, contratos de prestação de serviços continuados, honorários profissionais ou quitação de parcelas financeiras.
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 text-base font-medium">
                    Portanto, quem busca por <em>"recibo simples"</em> ou por <em>"recibo de pagamento"</em> pode utilizar o gerador e o modelo desta página com 100% de segurança e tranquilidade jurídica.
                  </div>
                </div>
              </article>
            )}

            {/* Recibo simples, nota fiscal ou recibo profissional: quando usar cada um */}
            {model.id === 'simples' && (
              <article>
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Recibo simples, nota fiscal ou recibo profissional: quando usar cada um
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-300 transition-colors">
                    <div>
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                        Mais Utilizado
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Recibo Simples</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Ideal para autônomos sem CNPJ, venda de itens particulares, acertos de contas, diárias e serviços informais. Simples, rápido e sem burocracia contábil.
                      </p>
                    </div>
                    <span className="text-emerald-700 font-bold text-sm inline-flex items-center gap-1">
                      Você está nesta página
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:border-blue-300 transition-colors">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                        Para Prestadores
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Recibo de Prestação de Serviços</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Recomendado quando o cliente exige discriminação técnica minuciosa da mão de obra, materiais, etapas de execução ou retenção tributária de INSS/ISS.
                      </p>
                    </div>
                    <Link to="/recibo-de-prestacao-de-servicos" className="text-blue-700 font-bold text-sm hover:underline inline-flex items-center gap-1">
                      Acessar Recibo de Serviços <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:border-amber-300 transition-colors">
                    <div>
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                        Imobiliário
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Recibo de Aluguel</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Desenvolvido especialmente para locação de imóveis direto com proprietário, com campos de endereço do imóvel, mês de competência e condomínio/IPTU.
                      </p>
                    </div>
                    <Link to="/recibo-de-aluguel" className="text-amber-700 font-bold text-sm hover:underline inline-flex items-center gap-1">
                      Acessar Recibo de Aluguel <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:border-purple-300 transition-colors">
                    <div>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                        Tributário Obrigatório
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Nota Fiscal (NF-e / NFS-e)</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Documento fiscal obrigatório por lei quando empresas (CNPJ) realizam vendas de mercadorias ou quando MEIs prestam serviços para outras pessoas jurídicas.
                      </p>
                    </div>
                    <span className="text-gray-500 font-medium text-xs">
                      Emitido via portal da Receita Federal ou prefeitura
                    </span>
                  </div>
                </div>
              </article>
            )}

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                {richData?.specificDetailsTitle || `Como preencher o ${model.title} corretamente`}
              </h2>
              
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
                <div className="p-6 md:p-8 bg-gray-50/80 border-b border-gray-200">
                  <p className="text-gray-700 text-lg font-medium m-0">Siga este passo a passo para preencher e validar seu documento de forma rápida e segura:</p>
                </div>
                <div className="p-6 md:p-8">
                  {model.id === 'simples' && (
                    <div className="mb-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Video className="w-6 h-6 text-emerald-500" />
                        Vídeo Tutorial: Como preencher Recibo Simples
                      </h3>
                      <YoutubeEmbed videoId="l4102DNZ0NE" title="Como preencher recibo simples online passo a passo" />
                      <p className="text-sm text-gray-500 mt-3 text-center">Assista ao vídeo para tirar suas dúvidas ou siga o passo a passo abaixo.</p>
                    </div>
                  )}

                  <ul className="space-y-6">
                    {model.id === 'simples' ? (
                      <>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">1</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Valor e Data</strong>
                            <span className="text-gray-600 leading-relaxed block">Informe o valor recebido e a data do pagamento.<br/><span className="text-sm text-gray-500">Exemplo: 150,00 em 10/07/2025</span></span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">2</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Pagador</strong>
                            <span className="text-gray-600 leading-relaxed block">Preencha o nome completo e CPF/CNPJ de quem pagou.<br/><span className="text-sm text-gray-500">Dica: Use sempre o nome completo, sem abreviações.</span></span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">3</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Recebedor</strong>
                            <span className="text-gray-600 leading-relaxed block">Informe o nome completo e CPF/CNPJ de quem recebeu.<br/><span className="text-sm text-gray-500">Importante para MEI e autônomos.</span></span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">4</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Descrição</strong>
                            <span className="text-gray-600 leading-relaxed block">Escreva o motivo do pagamento (ex: "referente à prestação de serviço").</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">5</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Forma de Pagamento</strong>
                            <span className="text-gray-600 leading-relaxed block">Selecione como foi feito (dinheiro, PIX, transferência, etc).</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">6</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Cidade, Estado e Data de Emissão</strong>
                            <span className="text-gray-600 leading-relaxed block">Complete para garantir validade.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">7</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Assinatura</strong>
                            <span className="text-gray-600 leading-relaxed block">Recomenda-se imprimir duas vias e colher assinaturas físicas.</span>
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">1</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Informar o valor</strong>
                            <span className="text-gray-600 leading-relaxed block">Digite a quantia monetária exata da transação.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">2</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Preencher dados das partes</strong>
                            <span className="text-gray-600 leading-relaxed block">Insira o nome completo ou Razão Social, acompanhado de CPF/CNPJ válidos de quem paga e quem recebe.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">3</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Descrever o pagamento</strong>
                            <span className="text-gray-600 leading-relaxed block">Nos campos de descrição, detalhe em poucas palavras a que se refere o pagamento, produto ou serviço.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">4</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Gerar e Baixar</strong>
                            <span className="text-gray-600 leading-relaxed block">Após revisar, clique em Próximo e escolha fazer o Download do PDF ou imprimir diretamente da tela.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">5</div>
                          <div>
                            <strong className="block text-gray-900 text-lg mb-1">Assinar</strong>
                            <span className="text-gray-600 leading-relaxed block">A pessoa ou empresa que recebeu o dinheiro deve assinar presencialmente, atestando o fim do débito.</span>
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {richData?.exampleImageSrc && (
                  <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Exemplo Visual</h4>
                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white p-2 md:p-4 text-center">
                      <img 
                        src={richData.exampleImageSrc} 
                        alt={richData.exampleImageAlt || `Modelo de ${model.title} Preenchido e Pronto para Imprimir`} 
                        loading="lazy"
                        title={richData.exampleImageTitle || `Exemplo de ${model.title}`}
                        className="w-full h-auto object-contain mx-auto max-w-xl rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      Veja como deve ficar seu recibo pronto para imprimir ou salvar em PDF.
                    </p>
                  </div>
                )}
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                O que não pode faltar na estrutura do documento
              </h3>
              
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                {richData?.specificDetailsList ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {richData.specificDetailsList.map((item, idx) => {
                      const parts = item.split(':');
                      if (parts.length > 1) {
                        return (
                          <li key={idx} className="flex flex-col">
                            <strong className="text-gray-900 mb-1 text-lg">{parts[0]}</strong>
                            <span className="text-gray-600 leading-relaxed">{parts.slice(1).join(':')}</span>
                          </li>
                        );
                      }
                      return <li key={idx} className="text-gray-600 leading-relaxed">{item}</li>;
                    })}
                  </ul>
                ) : (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {defaultSpecificDetailsList.map((item, idx) => {
                      const parts = item.split(':');
                      if (parts.length > 1) {
                        return (
                          <li key={idx} className="flex flex-col">
                            <strong className="text-gray-900 mb-1 text-lg">{parts[0]}</strong>
                            <span className="text-gray-600 leading-relaxed">{parts.slice(1).join(':')}</span>
                          </li>
                        );
                      }
                      return <li key={idx} className="text-gray-600 leading-relaxed">{item}</li>;
                    })}
                  </ul>
                )}
              </div>
            </article>

            {richData?.useCasesList && richData.useCasesList.length > 0 && (
              <article>
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  {richData?.useCasesTitle || 'Casos de Uso'}
                </h2>
                
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                  <ul className="space-y-4">
                    {richData.useCasesList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-gray-700 text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {richData?.useCasesConclusion && (
                    <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-emerald-800 m-0 font-medium">{richData.useCasesConclusion}</p>
                    </div>
                  )}
                </div>
              </article>
            )}

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Importância do Comprovante e Validade Jurídica
              </h2>
              
              <div className="text-gray-600 text-lg leading-relaxed max-w-none">
                {richData?.legalText ? (
                  <div className="space-y-6">
                    {richData.legalText.map((p, i) => {
                      const isAttention = p.startsWith('Atenção:');
                      if (isAttention) {
                        return (
                          <div key={i} className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
                            <p className="m-0 text-amber-900"><strong className="font-bold">Atenção:</strong> {p.replace(/^Atenção:\s*/i, '')}</p>
                          </div>
                        );
                      }
                      return <p key={i}>{p}</p>;
                    })}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p>
                      {richData?.lsiText || defaultLsiText}
                    </p>
                    <p>
                      Quando preenchido corretamente, ele funciona como a sua defesa contra cobranças duplicadas perante a justiça e o Procon.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mt-8">
                      <p className="m-0 text-amber-900"><strong className="font-bold">Atenção:</strong> O recibo tem ampla validade civil, mas não substitui a emissão da Nota Fiscal (NF) para empresas que precisam declarar recolhimento de impostos ao Governo.</p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 md:p-12 mt-16 text-center shadow-xl shadow-emerald-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mx-20 -my-20 pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Gere seu Documento Agora</h3>
              <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {richData?.ctaText || defaultCtaText}
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex justify-center items-center px-8 py-4 bg-white hover:bg-gray-50 text-emerald-700 font-bold rounded-full transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5 mr-2 text-emerald-700" />
                Preencher Novo Recibo
              </button>
            </div>
          </div>

          {/* FAQs Section */}
          {finalFaqs.length > 0 ? (
            <div className="mt-20">
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">
                Perguntas Frequentes (FAQ)
              </h2>
              <div className="space-y-4">
                {finalFaqs.map((faq, index) => (
                  <details key={index} className="group bg-white rounded-2xl border border-gray-200 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 font-bold hover:text-emerald-700 transition-colors list-none">
                      <h3 className="text-xl font-bold m-0">{faq.question}</h3>
                      <span className="shrink-0 rounded-full bg-emerald-50 p-1.5 text-emerald-700 sm:p-3 group-open:bg-emerald-700 group-open:text-emerald-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </summary>
                    <div className="border-t border-gray-100 p-6 leading-relaxed text-gray-700 bg-gray-50/50 rounded-b-2xl">
                      <p className="m-0 text-lg">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-20 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tem alguma dúvida?</h2>
              <p className="text-gray-600 mb-6">Consulte nossa página de Perguntas Frequentes para saber mais sobre validade legal e uso da ferramenta.</p>
              <Link to="/faq" className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-medium transition-colors">
                Acessar FAQ <CheckCircle2 className="w-5 h-5" />
              </Link>
            </div>
          )}

          {/* E-E-A-T Editorial Review & Author Credentials Badge */}
          <div className="mt-14 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-800 font-black text-xl flex items-center justify-center shrink-0 shadow-inner">
              ED
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Revisão Editorial Verificada
                </span>
                <span className="text-xs text-gray-500">
                  Atualizado em Outubro de 2026
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Conteúdo elaborado e revisado tecnicamente por Elvis Dias
              </h3>
              <p className="text-xs text-emerald-800 font-bold mb-2">
                Jornalista Profissional (Registro MTE / DRT 1466/RO) • Especialista em Direito do Consumidor e Documentos Fiscais
              </p>
              <p className="text-gray-600 text-sm leading-relaxed m-0">
                Todo o conteúdo explicativo, regras jurídicas e modelos de documentos disponibilizados no <strong>Recibo Grátis</strong> são estruturados e auditados em rigorosa conformidade com o Código Civil Brasileiro (Lei 10.406/2002) e as normativas do Banco Central do Brasil para arranjos de pagamentos instantâneos (PIX).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-emerald-900 mb-3">Por que usar o Recibo Grátis?</h3>
              <p className="text-emerald-800/80 leading-relaxed m-0">
                Nossa ferramenta foi desenvolvida para ser a mais rápida e prática do mercado. Não exigimos criação de conta, não guardamos seus dados (tudo é processado no seu navegador) e oferecemos um layout moderno e atualizado.
              </p>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Dica de Gestão Financeira</h3>
              <p className="text-blue-800/80 leading-relaxed text-sm m-0">
                Para profissionalizar ainda mais suas vendas e serviços, considere utilizar um <strong>software de gestão (ERP)</strong>, abrir uma <strong>conta PJ</strong> sem taxas ou adquirir uma <strong>maquininha de cartão</strong>. A <strong>contabilidade online</strong> e a emissão de <strong>nota fiscal eletrônica</strong> também são passos fundamentais.
              </p>
            </div>
          </div>

          {/* Cross-linking SEO context */}
          <div className="text-gray-500 text-sm mt-8 pb-4 border-b border-gray-100">
            <p className="leading-relaxed">
              <span>Também precisa emitir documentos financeiros para outros serviços? Veja nossas ferramentas relacionadas: </span>
              {receiptModels
                .filter(m => m.id !== model.id)
                .sort(() => 0.5 - Math.random()) // Sort randomly for now
                .slice(0, 3)
                .map((relatedModel, idx, arr) => (
                  <span key={relatedModel.id}>
                    <Link to={`/${relatedModel.slug}`} className="text-emerald-700 hover:underline hover:text-emerald-700">
                      {relatedModel.title}
                    </Link>
                    {idx < arr.length - 1 ? ', ' : '.'}
                  </span>
                ))}
            </p>
          </div>

          <AdSense />

          <AdsKeeper key={`receipt-seo-ad-${model.slug}`} desktopWidgetId="2090668" mobileWidgetId="2089552" refreshKey={model.slug} className="my-8" />

          {/* Related Models (Internal Linking) */}
          <div className="mt-16 border-t border-gray-100 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Veja também outros modelos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {receiptModels
                .filter(m => m.id !== model.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 4)
                .map(relatedModel => (
                  <Link 
                    key={relatedModel.id} 
                    to={`/${relatedModel.slug}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors group no-underline"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                      <FileText className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base m-0 group-hover:text-emerald-700 transition-colors">{relatedModel.title}</h3>
                      <p className="text-sm text-gray-500 m-0 line-clamp-1">{relatedModel.shortDescription}</p>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/" className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-700 transition-colors no-underline">
                Ver todos os 40+ modelos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
