import { useParams, Navigate, Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { DeclarationGenerator } from '../../components/DeclarationGenerator';
import { AdSense } from '../../components/AdSense';
import { AdsKeeper } from '../../components/AdsKeeper';
import { declarationModels } from '../../data/declarationModels';
import { CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { declarationSeoData } from '../../data/declarationSeoContent';
import React from 'react';

export default function DeclarationPage() {
  const { slug } = useParams<{ slug: string }>();
  const model = declarationModels.find((m) => m.slug === slug);

  if (!model) {
    return <Navigate to="/declaracoes" replace />;
  }

  const currentUrl = `https://recibogratis.com.br/declaracoes/${model.slug}`;

  const getDeclarationCategory = (slug: string) => {
    if (slug.includes('contrato')) {
      return { name: 'Contratos e Acordos', slug: 'contratos-e-acordos' };
    }
    if (slug.includes('renda') || slug.includes('hipossuficiencia') || slug.includes('economica') || slug.includes('isento') || slug.includes('divida')) {
      return { name: 'Financeiras e Fiscais', slug: 'financeiras-e-fiscais' };
    }
    if (slug.includes('trabalho') || slug.includes('aviso') || slug.includes('comparecimento') || slug.includes('abandono') || slug.includes('vinculo')) {
      return { name: 'Trabalhistas e RH', slug: 'trabalhistas-e-rh' };
    }
    if (slug.includes('comercial') || slug.includes('anuencia') || slug.includes('veracidade') || slug.includes('comodato') || slug.includes('perda') || slug.includes('veiculo')) {
      return { name: 'Jurídicas e Empresariais', slug: 'juridicas-e-empresariais' };
    }
    return { name: 'Civis e Pessoais', slug: 'civis-e-pessoais' };
  };

  const categoryInfo = getDeclarationCategory(model.slug);

  const breadcrumbsSchema = {
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
        "name": "Declarações",
        "item": "https://recibogratis.com.br/declaracoes"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryInfo.name,
        "item": `https://recibogratis.com.br/declaracoes#${categoryInfo.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": model.title,
        "item": currentUrl
      }
    ]
  };

  const richData = declarationSeoData[model.id];
  const titleLower = model.title.toLowerCase();
  const baseTitle = `${model.title} | Gerador Online em PDF Grátis`;
  const dynamicTitle = model.seoTitle || baseTitle;
  const dynamicDesc = model.seoDescription || richData?.intro || `Gere gratuitamente sua ${titleLower} online. Preencha, imprima em PDF ou envie por WhatsApp. Rápido, seguro e grátis.`;

  const softwareSchema = {
    "@type": "SoftwareApplication",
    "@id": `${currentUrl}#software`,
    "name": `Gerador de ${model.title}`,
    "operatingSystem": "Any",
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
      "reviewCount": "890",
      "bestRating": "5",
      "worstRating": "1",
      "itemReviewed": {
        "@type": "SoftwareApplication",
        "@id": `${currentUrl}#software`,
        "name": `Gerador de ${model.title}`
      }
    }
  };

  const finalFaqs = richData?.faqs || [];

  const faqSchema = finalFaqs.length > 0 ? {
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

  const schemaString = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { ...breadcrumbsSchema, "@context": undefined },
      { ...softwareSchema, "@context": undefined },
      ...(faqSchema ? [{ ...faqSchema, "@context": undefined }] : [])
    ]
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title={dynamicTitle}
        description={dynamicDesc}
        keywords={Array.isArray(model.keywords) ? model.keywords.join(", ") : model.keywords}
        url={currentUrl}
        schema={schemaString}
      />

      {/* Breadcrumbs - 4 Níveis */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-emerald-700 transition-colors">Início</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/declaracoes" className="hover:text-emerald-700 transition-colors">Declarações</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/declaracoes#${categoryInfo.slug}`} className="hover:text-emerald-700 transition-colors">{categoryInfo.name}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium truncate">{model.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {richData?.h1 || model.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {model.shortDescription} Amparado pela <strong className="text-gray-900">Lei 7.115/83</strong>. Preencha online e baixe em PDF.
          </p>
        </div>

        {/* Generator Section */}
        <div className="mb-16">
          <DeclarationGenerator modelId={model.id} />
        </div>

        <AdsKeeper className="mb-12" />

        <AdSense slot="1234567890" className="mb-16" />

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-16">
          <article className="prose prose-lg prose-emerald max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">O que é a {model.title}?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {richData?.intro || `A ${model.title} é um documento essencial com base legal na legislação brasileira, especificamente na Lei Federal 7.115/1983. Ele permite que o declarante afirme fatos sobre sua vida pessoal, residência ou situação econômica com presunção de veracidade, facilitando processos em órgãos públicos, bancos e empresas privadas sem burocracia excessiva.`}
            </p>

            <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 mb-8 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                {richData?.specificDetailsTitle || `O que não pode faltar na ${model.title}`}
              </h3>
              <ul className="space-y-4">
                {(richData?.specificDetailsList || [
                  "Amparo na Lei 7.115/1983 para atestar veracidade das informações.",
                  "Qualificação completa do declarante: Nome, CPF, RG, Estado Civil e Nacionalidade.",
                  "Endereço completo atualizado para atestar domicílio.",
                  "Assinatura física ou digital atestando que os dados são verdadeiros sob as penas da lei."
                ]).map((detail: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              Falsificar ou mentir em uma declaração firmada com base na <strong>Lei 7.115/83</strong> configura crime de Falsidade Ideológica, previsto no Art. 299 do Código Penal. Por isso, preencha o documento apenas com informações precisas e comprováveis perante as autoridades, se necessário.
            </p>
          </article>
        </div>

        {/* FAQs */}
        {finalFaqs.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Dúvidas Frequentes sobre a {model.title}
            </h2>
            <div className="space-y-6">
              {finalFaqs.map((faq: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                    <span className="text-emerald-700 font-black">Q.</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-8 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <AdSense slot="0987654321" />
      </div>
    </div>
  );
}