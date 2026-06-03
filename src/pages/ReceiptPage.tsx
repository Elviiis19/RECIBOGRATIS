import { useParams, Navigate, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ReceiptGenerator } from '../components/ReceiptGenerator';
import { AdSense } from '../components/AdSense';
import { receiptModels } from '../data/receiptModels';
import { CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { richSeoData } from '../data/richSeoContent';

export function ReceiptPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the specific model based on the URL slug
  const model = receiptModels.find(m => m.slug === slug);

  // If the slug doesn't match any model, redirect to home
  if (!model) {
    return <Navigate to="/" replace />;
  }

  const currentUrl = `https://recibogratis.com.br/${model.slug}`;

  // Generate JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": model.title,
        "item": currentUrl
      }
    ]
  };

  const richData = richSeoData[model.id];

  const titleLower = model.title.toLowerCase();
  const baseTitle = `${model.title} | Gerador Online em PDF Grátis`;
  const dynamicTitle = richData?.h1 || baseTitle;
  const dynamicDesc = richData?.intro || model.seoDescription || `Gere gratuitamente seu ${titleLower} online. Preencha, imprima em PDF ou envie por WhatsApp. Rápido, seguro e grátis.`;

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

  const finalFaqs = richData?.faqs || model.faqs || [
    {
      question: `Qualquer pessoa pode emitir o ${titleLower}?`,
      answer: `Sim. Tanto pessoas físicas quanto jurídicas podem emitir o documento, desde que contenha os dados completos (Nome e CPF ou CNPJ) de quem está recebendo e de quem está pagando o valor.`
    },
    {
      question: `O ${titleLower} substitui a Nota Fiscal?`,
      answer: `Não. O recibo serve apenas como comprovante de pagamento entre as partes. A Nota Fiscal é o documento oficial obrigatório para fins de recolhimento de impostos em atividades comerciais ou empresariais regulamentadas.`
    },
    {
      question: `Quais dados não podem faltar no ${titleLower}?`,
      answer: `É obrigatório conter: o valor pago (numérico e por extenso), o nome e documento (CPF/CNPJ) do pagador e do recebedor, a descrição exata do que está sendo pago, a data, o local e, imprescindivelmente, a assinatura de quem recebeu o valor.`
    },
    {
      question: `Preciso reconhecer firma neste recibo?`,
      answer: `Na grande maioria dos casos cotidianos, não é exigido o reconhecimento de firma em cartório. Apenas a assinatura conferindo com o documento de identidade já possui validade como recibo de quitação.`
    },
    {
      question: `O comprovante de PIX serve como recibo?`,
      answer: `O comprovante de transferência do PIX atesta apenas que o dinheiro saiu de uma conta e foi para outra. Ele não descreve a que o pagamento se refere. Portanto, é altamente recomendado emitir um recibo formal com a descrição precisa do serviço ou produto.`
    }
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Gerador de ${model.title}`,
    "operatingSystem": "Any",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "description": dynamicDesc
  };

  const faqSchema = finalFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": finalFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Combine schemas into an array
  const schemas: any[] = [{ ...breadcrumbSchema, "@context": undefined }, { ...softwareSchema, "@context": undefined }];
  if (faqSchema) schemas.push({ ...faqSchema, "@context": undefined });
  
  const schemaString = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas
  });

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
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-emerald-100 text-sm mb-6 flex-wrap" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Início</Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4" />
              </li>
              <li className="text-white font-medium" aria-current="page">
                {model.title}
              </li>
            </ol>
            
            <div className="hidden sm:flex ml-auto items-center">
               <Link to="/modelos" className="text-emerald-100 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium bg-black/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                  Ver Todos os Modelos
               </Link>
            </div>
          </nav>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 mt-2 leading-tight">
              {richData?.h1 || dynamicTitle}
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

      {/* Generator Section */}
      <section className="py-12 bg-gray-50 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReceiptGenerator 
            key={model.slug}
            title={model.title} 
            defaultReferenteA={model.defaultReferenteA}
          />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-emerald prose-lg">
          
          <p className="lead text-xl text-gray-700 leading-relaxed border-l-4 border-emerald-500 pl-6 mb-12">
            {richData?.intro || defaultIntro}
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8">
            {richData?.specificDetailsTitle || `O que não pode faltar no ${model.title}`}
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            {(richData?.specificDetailsList || defaultSpecificDetailsList).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8">Como preencher corretamente</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li><strong>Valor:</strong> Preencha com o valor exato da transação, tanto em numerais quanto por extenso.</li>
            <li><strong>Recebedor:</strong> Nome completo ou Razão Social de quem está recebendo o dinheiro.</li>
            <li><strong>Pagador:</strong> Nome completo ou Razão Social de quem está pagando.</li>
            <li><strong>CPF/CNPJ:</strong> Essencial para identificação e validade das partes (e emissão de nota fiscal se for o caso).</li>
            <li><strong>Referente a:</strong> Relate os pormenores, sem abreviações, com as justificativas da transação ou entrega.</li>
            <li><strong>Data e Local:</strong> Adicione a cidade e a data em que o repasse foi completado.</li>
            <li><strong>Assinatura:</strong> O recebedor necessita obrigatoriamente assinar ao final.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8">Este recibo tem validade legal?</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Sim. {richData?.lsiText || defaultLsiText} Quando preenchido corretamente, ele possui ampla <strong>validade jurídica e comercial</strong> perante a justiça comum, relações de consumo e transações privadas no Brasil. É o documento que defende o pagador de ser cobrado duas vezes pelo mesmo fato e comprova as quitações conforme a lei civil enuncia, bastando ter a identificação legível das partes, o valor apurado e o ateste em assinatura do credor do recebimento. Para maior cautela e formalidade fiscal ou contábil, consulte emissores obrigatórios de notas.
          </p>

          <div className="bg-emerald-50 border border-emerald-500 rounded-xl p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">Gere seu Documento Agora</h3>
            <p className="text-emerald-800 mb-6">
              {richData?.ctaText || defaultCtaText}
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex max-w-sm justify-center items-center w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-colors text-lg shadow-lg shadow-emerald-200"
            >
              <FileText className="w-5 h-5 mr-2" />
              Preencher Novo Recibo
            </button>
          </div>

          {/* FAQs Section */}
          {finalFaqs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Perguntas Frequentes</h2>
              <div className="space-y-6">
                {finalFaqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 m-0 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mt-12">
            <h3 className="text-lg font-bold text-emerald-900 mb-2">Por que usar o Recibo Grátis?</h3>
            <p className="text-emerald-800 m-0">
              Nossa ferramenta foi desenvolvida para ser a mais rápida e prática do mercado. Não exigimos criação de conta, não guardamos seus dados (tudo é processado no seu navegador) e oferecemos um layout moderno e atualizado.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Dica de Gestão Financeira</h3>
            <p className="text-blue-800 m-0 text-sm leading-relaxed">
              Para profissionalizar ainda mais suas vendas e serviços, considere utilizar um <strong>software de gestão (ERP)</strong>, abrir uma <strong>conta PJ</strong> sem taxas ou adquirir uma <strong>maquininha de cartão</strong> com as melhores taxas do mercado. A <strong>contabilidade online</strong> e a emissão de <strong>nota fiscal eletrônica</strong> também são passos fundamentais para o crescimento seguro e escalável da sua receita, melhorando o controle de fluxo de caixa e o retorno financeiro.
            </p>
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
                    <Link to={`/${relatedModel.slug}`} className="text-emerald-600 hover:underline hover:text-emerald-700">
                      {relatedModel.title}
                    </Link>
                    {idx < arr.length - 1 ? ', ' : '.'}
                  </span>
                ))}
            </p>
          </div>

          <AdSense />

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
              <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors no-underline">
                Ver todos os 40+ modelos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
