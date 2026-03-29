import { useParams, Navigate, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ReceiptGenerator } from '../components/ReceiptGenerator';
import { receiptModels } from '../data/receiptModels';
import { CheckCircle2, ChevronRight } from 'lucide-react';

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
    "description": model.seoDescription
  };

  const faqSchema = model.faqs && model.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": model.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Combine schemas into an array
  const schemas: any[] = [breadcrumbSchema, softwareSchema];
  if (faqSchema) schemas.push(faqSchema);
  
  const schemaString = JSON.stringify(schemas);

  return (
    <>
      <SEO 
        title={model.seoTitle} 
        description={model.seoDescription}
        keywords={model.keywords}
        schema={schemaString}
        url={currentUrl}
      />
      
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-emerald-100 text-sm mb-8" aria-label="Breadcrumb">
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
          </nav>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              {model.title}
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-10">
              {model.shortDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-emerald-50 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Sem Cadastro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Gera PDF na Hora</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="py-12 bg-gray-50 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReceiptGenerator 
            title={model.title} 
            defaultReferenteA={model.defaultReferenteA}
          />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-emerald prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{model.seoContent.h2}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {model.seoContent.p1}
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{model.seoContent.h3}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {model.seoContent.p2}
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Como preencher este recibo corretamente?</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
            <li><strong>Valor:</strong> Preencha com o valor exato da transação.</li>
            <li><strong>Recebedor:</strong> Nome completo ou Razão Social de quem está recebendo o dinheiro.</li>
            <li><strong>Pagador:</strong> Nome completo ou Razão Social de quem está pagando.</li>
            <li><strong>CPF/CNPJ:</strong> Documentos de ambas as partes para validade legal.</li>
            <li><strong>Referente a:</strong> Descreva detalhadamente o motivo do pagamento.</li>
            <li><strong>Data e Local:</strong> Preencha a cidade e a data em que o pagamento foi realizado.</li>
            <li><strong>Assinatura:</strong> O recebedor deve assinar o documento após a impressão.</li>
          </ul>

          {/* FAQs Section */}
          {model.faqs && model.faqs.length > 0 && (
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Perguntas Frequentes</h3>
              <div className="space-y-6">
                {model.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h4>
                    <p className="text-gray-600 m-0 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mt-12">
            <h4 className="text-lg font-bold text-emerald-900 mb-2">Por que usar o Recibo Grátis?</h4>
            <p className="text-emerald-800 m-0">
              Nossa ferramenta foi desenvolvida para ser a mais rápida e prática do mercado. Não exigimos criação de conta, não guardamos seus dados (tudo é processado no seu navegador) e oferecemos um layout moderno e atualizado.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
