import { SEO } from '../components/SEO';
import { AdSense } from '../components/AdSense';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Faq() {
  const faqs = [
    {
      question: "O Recibo Grátis tem validade legal?",
      answer: "Sim. Desde que preenchido corretamente com os dados de quem paga (pagador), de quem recebe (recebedor), valores, data e, principalmente, a assinatura do recebedor, o recibo gerado tem total validade legal como comprovante de pagamento no Brasil."
    },
    {
      question: "Preciso de CNPJ para emitir um recibo?",
      answer: "Não. Pessoas físicas (usando o CPF) podem emitir recibos normalmente para comprovar o recebimento de valores por prestação de serviços eventuais, vendas de bens, aluguéis, entre outros."
    },
    {
      question: "Como salvar o recibo em PDF?",
      answer: "Após preencher os dados no gerador, clique no botão 'Imprimir / Salvar PDF'. Na tela de impressão do seu navegador, altere o destino de 'Impressora' para 'Salvar como PDF' e confirme."
    },
    {
      question: "É seguro colocar meus dados e do meu cliente no site?",
      answer: "Sim, é 100% seguro. O Recibo Grátis funciona inteiramente no seu navegador (client-side). Nós não possuímos banco de dados e nenhuma informação digitada é enviada ou salva em nossos servidores."
    },
    {
      question: "Qual a diferença entre Recibo e Nota Fiscal?",
      answer: "O recibo é um documento que atesta o recebimento de um valor, servindo como comprovante de quitação. A Nota Fiscal (NF) é um documento oficial exigido pelo governo para registrar transações comerciais e recolher impostos. Empresas são obrigadas a emitir NF, mas pessoas físicas podem usar o recibo simples."
    },
    {
      question: "Posso enviar o recibo pelo WhatsApp?",
      answer: "Sim! Após gerar o recibo, você pode clicar no botão de compartilhar via WhatsApp. O sistema criará um link ou você pode salvar o PDF e enviar o arquivo diretamente para o seu cliente."
    },
    {
      question: "O site cobra alguma taxa?",
      answer: "Não. O Recibo Grátis é uma ferramenta 100% gratuita, sem limites de emissão e sem necessidade de criar conta ou fazer login."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Perguntas Frequentes (FAQ) - Recibo Grátis" 
        description="Tire suas dúvidas sobre como gerar recibos online, validade legal, segurança de dados e como salvar em PDF. Suporte completo do Recibo Grátis."
        keywords="faq recibo, perguntas frequentes recibo, duvidas recibo online, como fazer recibo, validade recibo simples"
        schema={JSON.stringify(faqSchema)}
        url="https://recibogratis.com.br/faq"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-600 text-white py-12 md:py-20 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6 shadow-sm">
            <HelpCircle className="w-8 h-8 text-emerald-50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Perguntas Frequentes
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
            Tire todas as suas dúvidas sobre a emissão de recibos online, validade jurídica e segurança da nossa plataforma.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSense />
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600 m-0 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para gerar seu recibo?</h3>
          <p className="text-gray-600 mb-8">
            Escolha um dos nossos mais de 40 modelos e gere seu comprovante em segundos.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
          >
            Ver Modelos de Recibo <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <AdSense />
      </div>
    </div>
  );
}
