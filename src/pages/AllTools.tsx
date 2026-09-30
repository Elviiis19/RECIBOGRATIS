import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, Calculator, 
  CalendarDays, 
  Clock, 
  CreditCard, 
  FileText, 
  MapPin, 
  QrCode, 
  ShieldCheck, 
  Type
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdSense } from '../components/AdSense';
import { AdsKeeper } from '../components/AdsKeeper';

export function AllTools() {
  const tools = [
    {
      title: 'Leitor de QR Code',
      description: 'Envie uma imagem e decodifique o conteúdo de um QR Code (URL, texto ou PIX) diretamente no seu navegador com total segurança e privacidade.',
      icon: <QrCode className="w-8 h-8 text-pink-600" />,
      link: '/leitor-decodificador-qr-code',
      color: 'bg-pink-50 text-pink-700 border-pink-100',
      hover: 'hover:border-pink-300 hover:shadow-md'
    },

    {
      title: 'Gerador de Carnê',
      description: 'Gere páginas de carnê em PDF (com canhoto e parcelas) para imprimir e entregar ao seu cliente mensalmente.',
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      link: '/gerador-carne-pagamento',
      color: 'bg-blue-50 text-blue-700 border-blue-100',
      hover: 'hover:border-blue-300 hover:shadow-md'
    },
    {
      title: 'Precificação / Markup',
      description: 'Insira o custo e a margem de lucro para descobrir exatamente por quanto deve vender seu produto para não ter prejuízo.',
      icon: <Calculator className="w-8 h-8 text-indigo-600" />,
      link: '/calculadora-precificacao-produtos',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      hover: 'hover:border-indigo-300 hover:shadow-md'
    },
    {
      title: 'Cálculo de Hora Extra',
      description: 'Calcule online o valor exato das suas horas extras (50% e 100%) e adicional noturno com base no seu salário.',
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      link: '/calculadora-hora-extra',
      color: 'bg-amber-50 text-amber-700 border-amber-100',
      hover: 'hover:border-amber-300 hover:shadow-md'
    },
    {
      title: 'Controle de Fiados',
      description: 'Caderneta virtual: Anote vendas fiado, controle quem está te devendo e gere links de cobrança PIX pelo WhatsApp.',
      icon: <Book className="w-8 h-8 text-teal-600" />,
      link: '/controle-de-fiados',
      color: 'bg-teal-50 text-teal-700 border-teal-100',
      hover: 'hover:border-teal-300 hover:shadow-md'
    },

    {
      title: 'Gerador QR Code PIX',
      description: 'Gere códigos PIX estáticos gratuitos para seu negócio. Crie sua plaquinha PIX de forma segura, sem taxas.',
      icon: <QrCode className="w-8 h-8 text-emerald-600" />,
      link: '/gerador-qr-code-pix',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      hover: 'hover:border-emerald-300 hover:shadow-md'
    },
    {
      title: 'Gerador PIX Copia e Cola',
      description: 'Crie links de pagamento PIX rapidamente. Ideal para compartilhar via WhatsApp, Instagram ou e-mail com seus clientes.',
      icon: <QrCode className="w-8 h-8 text-blue-600" />,
      link: '/gerador-pix-copia-e-cola',
      color: 'bg-blue-50 text-blue-700 border-blue-100',
      hover: 'hover:border-blue-300 hover:shadow-md'
    },
    {
      title: 'Valor por Extenso',
      description: 'Converta qualquer número ou valor financeiro para texto escrito por extenso. Evite fraudes em cheques e contratos.',
      icon: <Type className="w-8 h-8 text-indigo-600" />,
      link: '/valor-por-extenso',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      hover: 'hover:border-indigo-300 hover:shadow-md'
    },
    {
      title: 'Retenção de Impostos',
      description: 'Calcule IRRF, INSS, ISS, PIS, COFINS e CSLL (PCC) retidos na fonte. Descubra o valor líquido exato das notas fiscais.',
      icon: <Calculator className="w-8 h-8 text-orange-600" />,
      link: '/calculadora-retencao-impostos',
      color: 'bg-orange-50 text-orange-700 border-orange-100',
      hover: 'hover:border-orange-300 hover:shadow-md'
    },
    {
      title: 'Descontos e Multas',
      description: 'Calcule juros de mora (pro rata die), multas por atraso ou conceda descontos percentuais exatos em cobranças e boletos.',
      icon: <Calculator className="w-8 h-8 text-rose-600" />,
      link: '/calculadora-desconto-multa',
      color: 'bg-rose-50 text-rose-700 border-rose-100',
      hover: 'hover:border-rose-300 hover:shadow-md'
    },
    {
      title: 'Taxas de Maquininha',
      description: 'Saiba o valor real das taxas de cartão. Calcule quanto cobrar do cliente para repassar tarifas de Stone, PagSeguro e outras.',
      icon: <CreditCard className="w-8 h-8 text-cyan-600" />,
      link: '/calculadora-maquininha-cartao',
      color: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      hover: 'hover:border-cyan-300 hover:shadow-md'
    },
    {
      title: 'Dias Úteis e Prazos',
      description: 'Adicione prazos ou calcule a diferença de dias úteis entre datas desconsiderando sábados, domingos e feriados.',
      icon: <CalendarDays className="w-8 h-8 text-fuchsia-600" />,
      link: '/calculadora-dias-uteis',
      color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
      hover: 'hover:border-fuchsia-300 hover:shadow-md'
    },
    {
      title: 'Horas p/ Decimal',
      description: 'Converta formato de relógio (HH:MM) para horas centesimais e calcule o valor financeiro correto para folhas e recibos.',
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      link: '/conversor-horas-trabalhadas',
      color: 'bg-amber-50 text-amber-700 border-amber-100',
      hover: 'hover:border-amber-300 hover:shadow-md'
    },
    {
      title: 'Validador de CPF/CNPJ',
      description: 'Formate, limpe pontuação e valide o dígito verificador matemático de documentos para emitir notas fiscais sem erro.',
      icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
      link: '/validador-formatador-cpf-cnpj',
      color: 'bg-teal-50 text-teal-700 border-teal-100',
      hover: 'hover:border-teal-300 hover:shadow-md'
    },
    {
      title: 'Consultador Código IBGE',
      description: 'Descubra os 7 dígitos oficiais (cMun) de qualquer município brasileiro, dados exigidos para a emissão de notas fiscais (NF-e).',
      icon: <MapPin className="w-8 h-8 text-violet-600" />,
      link: '/consultador-codigo-ibge',
      color: 'bg-violet-50 text-violet-700 border-violet-100',
      hover: 'hover:border-violet-300 hover:shadow-md'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Ferramentas Financeiras e Utilitários - Grátis | Recibo Grátis"
        description="Acesse nossa suíte de ferramentas financeiras gratuitas. Geradores de PIX, calculadoras de juros, conversores, código IBGE e muito mais para autônomos."
        keywords="ferramentas financeiras, utilitários, calculadora juros, gerador pix, valor por extenso, calculadoras para empresas, codigo ibge"
        url="https://recibogratis.com.br/ferramentas"
      />

      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Ferramentas e Utilitários</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Nossa suíte completa de ferramentas gratuitas desenvolvida para facilitar o dia a dia financeiro e burocrático de MEIs, autônomos e pequenas empresas.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              to={tool.link}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-200 ${tool.hover} flex flex-col h-full`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${tool.color}`}>
                {tool.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                {tool.description}
              </p>
              <div className="mt-6 text-emerald-600 font-semibold text-sm flex items-center group-hover:text-emerald-700 transition-colors">
                Acessar Ferramenta
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <AdSense />
        <AdsKeeper className="my-8" />
      </div>
    </div>
  );
}
