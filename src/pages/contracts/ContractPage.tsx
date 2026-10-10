import { useParams, Navigate, Link } from "react-router-dom";
import { SEO } from "../../components/SEO";
import { ContractGenerator } from "../../components/ContractGenerator";
import { AdSense } from "../../components/AdSense";
import { AdsKeeper } from "../../components/AdsKeeper";
import { contractModels, getContractBySlug } from "../../data/contractModels";
import {
  CheckCircle2,
  ChevronRight,
  FileCheck,
  ShieldCheck,
  Scale,
  Sparkles,
  ArrowRight,
  FileText
} from "lucide-react";
import React from "react";

interface ContractPageProps {
  customSlug?: string;
}

export function ContractPage({ customSlug }: ContractPageProps) {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const activeSlug = customSlug || routeSlug || "";
  const model = getContractBySlug(activeSlug);

  if (!model) {
    return <Navigate to="/contratos" replace />;
  }

  // Se o usuário acessou por um alias, redirecionar para a URL canônica solta
  if (model.slug !== activeSlug && model.aliases?.includes(activeSlug)) {
    return <Navigate to={`/${model.slug}`} replace />;
  }

  const currentUrl = `https://recibogratis.com.br/${model.slug}`;

  // Breadcrumbs Schema (4 níveis: Início > Contratos > Categoria > Nome do Contrato)
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${currentUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://recibogratis.com.br",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contratos",
        "item": "https://recibogratis.com.br/contratos",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": model.category,
        "item": `https://recibogratis.com.br/contratos#${model.category.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": model.title,
        "item": currentUrl,
      },
    ],
  };

  // SoftwareApplication Schema
  const softwareSchema = {
    "@type": "SoftwareApplication",
    "@id": `${currentUrl}#software`,
    name: `Gerador de ${model.title}`,
    operatingSystem: "Any",
    applicationCategory: "BusinessApplication",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "BRL",
    },
    description: model.seoDescription,
    aggregateRating: {
      "@type": "AggregateRating",
      "@id": `${currentUrl}#aggregateRating`,
      ratingValue: "4.9",
      reviewCount: "940",
      bestRating: "5",
      worstRating: "1",
      itemReviewed: {
        "@type": "SoftwareApplication",
        "@id": `${currentUrl}#software`,
        name: `Gerador de ${model.title}`,
      },
    },
  };

  // FAQ Schema
  const faqSchema = model.faqs && model.faqs.length > 0 ? {
    "@type": "FAQPage",
    mainEntity: model.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  const schemaString = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { ...breadcrumbsSchema, "@context": undefined },
      { ...softwareSchema, "@context": undefined },
      ...(faqSchema ? [{ ...faqSchema, "@context": undefined }] : []),
    ],
  });

  // Outros contratos para recomendação
  const otherContracts = contractModels.filter((c) => c.id !== model.id).slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title={model.seoTitle}
        description={model.seoDescription}
        keywords={model.keywords.join(", ")}
        url={currentUrl}
        schema={schemaString}
      />

      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-emerald-700 transition-colors">
              Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/contratos" className="hover:text-emerald-700 transition-colors">
              Contratos
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-500">{model.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium truncate">{model.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Hero */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pequeno Contrato de 1 Página A4 • Validade Jurídica</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            {model.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-4">
            {model.shortDescription}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1 font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              {model.legalBasis}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              100% Gratuito e Sem Cadastro
            </span>
          </div>
        </div>

        {/* Generator Section */}
        <div className="mb-16">
          <ContractGenerator model={model} />
        </div>

        {/* Middle Ad */}
        <AdsKeeper className="mb-12" />
        <AdSense slot="1234567890" className="mb-16" />

        {/* SEO Informative Content & Pillar Page Link Strategy */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-16 space-y-8">
          <article className="prose prose-lg prose-emerald max-w-none">
            <h2 className="text-2xl font-bold text-gray-900">
              Como Funciona o {model.title}?
            </h2>
            <p className="text-gray-600 leading-relaxed">{model.intro}</p>

            <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 my-8 border border-emerald-100 not-prose">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                <span>{model.specificDetailsTitle}</span>
              </h3>
              <ul className="space-y-3">
                {model.specificDetailsList.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              A Regra de Ouro: Contrato e Recibo Andam Juntos
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Enquanto o contrato estabelece as obrigações e os direitos de cada parte, a comprovação prática de que os valores foram efetivamente pagos exige um documento de quitação. Por isso, a cada parcela, sinal ou conclusão do serviço, emita sempre o{" "}
              <Link
                to="/recibo-simples"
                className="font-bold text-emerald-700 underline hover:text-emerald-800"
              >
                recibo
              </Link>{" "}
              de pagamento oficial. Ter em mãos o contrato assinado juntamente com os recibos de quitação blinda ambas as partes contra qualquer alegação indevida de inadimplência.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              Assinatura Digital no Celular ou à Mão
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Você pode assinar este documento na própria tela do smartphone com o dedo ou salvar em PDF para colher a assinatura à caneta após imprimir. Pela Medida Provisória nº 2.200-2/2001 e pelo Código Civil, as partes têm total autonomia para eleger o meio de assinatura como válido e eficaz entre si.
            </p>
          </article>
        </div>

        {/* FAQs */}
        {model.faqs && model.faqs.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Dúvidas Frequentes sobre o Contrato
            </h2>
            <div className="space-y-4">
              {model.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <h3 className="text-base font-bold text-gray-900 mb-2 flex items-start gap-2.5">
                    <span className="text-emerald-700 font-black">Q.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm text-gray-600 pl-6 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outros Contratos Relacionados */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Outros Pequenos Contratos de 1 Página
            </h2>
            <Link
              to="/contratos"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Ver todos os contratos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherContracts.map((c) => (
              <Link
                key={c.id}
                to={`/${c.slug}`}
                className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all group block"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors mb-1">
                  {c.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{c.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>

        <AdSense slot="0987654321" />
      </div>
    </div>
  );
}
export default ContractPage;
