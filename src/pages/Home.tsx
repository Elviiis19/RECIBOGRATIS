import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { receiptModels } from '../data/receiptModels';
import { 
  CheckCircle2, FileText, BadgeDollarSign, Briefcase, Home as HomeIcon, 
  ShoppingCart, Store, Sparkles, HeartHandshake, Scale, HandCoins, 
  Heart, Banknote, CheckCircle, Bed, Car, Hammer, Paintbrush, Zap, 
  Wrench, Truck, Settings, Smile, Brain, Activity, Apple, Camera, 
  GraduationCap, Baby, HeartPulse, Scissors, Sofa, Monitor, Leaf, 
  Building, PenTool, HardHat, Stethoscope, Dog 
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O Recibo Grátis tem validade legal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Desde que preenchido corretamente com os dados de quem paga (pagador), de quem recebe (recebedor), valores, data e, principalmente, a assinatura do recebedor, o recibo gerado tem total validade legal como comprovante de pagamento no Brasil."
        }
      },
      {
        "@type": "Question",
        "name": "Preciso de CNPJ para emitir um recibo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não. Pessoas físicas (usando o CPF) podem emitir recibos normalmente para comprovar o recebimento de valores por prestação de serviços eventuais, vendas de bens, aluguéis, entre outros."
        }
      },
      {
        "@type": "Question",
        "name": "Como salvar o recibo em PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Após preencher os dados no gerador, clique no botão 'Imprimir / Salvar PDF'. Na tela de impressão do seu navegador, altere o destino de 'Impressora' para 'Salvar como PDF' e confirme."
        }
      },
      {
        "@type": "Question",
        "name": "É seguro colocar meus dados e do meu cliente no site?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, é 100% seguro. O Recibo Grátis funciona inteiramente no seu navegador (client-side). Nós não possuímos banco de dados e nenhuma informação digitada é enviada ou salva em nossos servidores."
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Recibo Grátis: Gerador de Recibos Online em PDF (40+ Modelos)" 
        description="O maior portal de recibos do Brasil. Gere recibos online grátis em PDF: simples, pagamento, aluguel, MEI e mais 40 modelos. Pronto para imprimir e enviar por WhatsApp."
        keywords="gerador de recibo, recibo online, recibo simples, recibo de pagamento, recibo pdf, imprimir recibo, modelos de recibo, fazer recibo online, recibo pronto"
        schema={JSON.stringify([websiteSchema, faqSchema])}
        url="https://recibogratis.com.br"
      />
      
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            O Maior Portal de Recibos do Brasil
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-10">
            Escolha o modelo ideal para a sua necessidade. Preencha online, gere o PDF ou envie por WhatsApp na hora. Tudo 100% gratuito e sem cadastro.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-emerald-50 font-medium text-lg">
            <div className="flex items-center gap-2 bg-emerald-700/50 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>40+ Modelos Exclusivos</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-700/50 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Envio por WhatsApp</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-700/50 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Privacidade Total</span>
            </div>
          </div>
        </div>
      </section>

      {/* Models Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Escolha o Modelo de Recibo</h2>
            <p className="text-lg text-gray-600">Selecione abaixo a opção que melhor se adapta à sua transação financeira.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {receiptModels.map((model) => (
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
                <div className="mt-6 text-emerald-600 font-medium flex items-center gap-2">
                  Gerar Recibo 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-emerald prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Por que usar o Recibo Grátis?</h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed text-center">
            O <strong>Recibo Grátis</strong> foi criado pelo idealizador Elvis Dias para ser a ferramenta definitiva e mais completa da internet brasileira para geração de comprovantes de pagamento. Diferente de outras opções no mercado, nós focamos na experiência do usuário, segurança e diversidade de modelos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacidade em Primeiro Lugar</h3>
              <p className="text-gray-600 leading-relaxed">
                Nós não possuímos banco de dados para armazenar as informações que você digita. Todo o processamento do recibo (nomes, CPFs, valores) é feito <strong>exclusivamente no seu navegador</strong>. Ao fechar a página, os dados desaparecem. Sua privacidade e a dos seus clientes estão 100% garantidas.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mais de 40 Modelos Atualizados</h3>
              <p className="text-gray-600 leading-relaxed">
                Nossos modelos de recibo foram revisados para atender às exigências legais e comerciais atuais. Seja você um MEI, um profissional liberal, um locador de imóveis ou apenas alguém precisando de um recibo simples, temos o formato exato que você precisa para gerar seu PDF.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Como fazer um recibo online?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-center">
              Fazer um recibo online nunca foi tão fácil. Nosso gerador de recibos foi projetado para ser intuitivo e rápido, permitindo que você crie documentos com validade comercial em poucos cliques.
            </p>
            
            <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h4 className="font-bold text-emerald-900 mb-2">Escolha o Modelo</h4>
                  <p className="text-emerald-800 text-sm">Selecione o tipo de recibo que melhor se adapta à sua necessidade na lista acima (ex: recibo de pagamento, aluguel, prestação de serviços).</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h4 className="font-bold text-emerald-900 mb-2">Preencha os Dados</h4>
                  <p className="text-emerald-800 text-sm">Digite os valores, nomes e documentos. Veja a prévia do recibo sendo montada em tempo real na sua tela.</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h4 className="font-bold text-emerald-900 mb-2">Imprima ou Envie</h4>
                  <p className="text-emerald-800 text-sm">Clique no botão para imprimir, salvar o arquivo em formato PDF ou enviar diretamente via WhatsApp para o seu cliente.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Perguntas Frequentes (FAQ)</h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.name}</h3>
                  <p className="text-gray-600 m-0 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

