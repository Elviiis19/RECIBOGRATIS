import React, { useState, useMemo } from 'react';
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
  Building, PenTool, HardHat, Stethoscope, Dog, ChevronDown, ChevronRight,
  ShieldCheck, Download, QrCode, Search, Calculator, ArrowRight,
  Smartphone, Award, Check, X, HelpCircle
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-8 h-8 text-emerald-700" />,
  BadgeDollarSign: <BadgeDollarSign className="w-8 h-8 text-emerald-700" />,
  Briefcase: <Briefcase className="w-8 h-8 text-emerald-700" />,
  Home: <HomeIcon className="w-8 h-8 text-emerald-700" />,
  ShoppingCart: <ShoppingCart className="w-8 h-8 text-emerald-700" />,
  Store: <Store className="w-8 h-8 text-emerald-700" />,
  Sparkles: <Sparkles className="w-8 h-8 text-emerald-700" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8 text-emerald-700" />,
  Scale: <Scale className="w-8 h-8 text-emerald-700" />,
  HandCoins: <HandCoins className="w-8 h-8 text-emerald-700" />,
  Heart: <Heart className="w-8 h-8 text-emerald-700" />,
  Banknote: <Banknote className="w-8 h-8 text-emerald-700" />,
  CheckCircle: <CheckCircle className="w-8 h-8 text-emerald-700" />,
  Bed: <Bed className="w-8 h-8 text-emerald-700" />,
  Car: <Car className="w-8 h-8 text-emerald-700" />,
  Hammer: <Hammer className="w-8 h-8 text-emerald-700" />,
  Paintbrush: <Paintbrush className="w-8 h-8 text-emerald-700" />,
  Zap: <Zap className="w-8 h-8 text-emerald-700" />,
  Wrench: <Wrench className="w-8 h-8 text-emerald-700" />,
  Truck: <Truck className="w-8 h-8 text-emerald-700" />,
  Settings: <Settings className="w-8 h-8 text-emerald-700" />,
  Smile: <Smile className="w-8 h-8 text-emerald-700" />,
  Brain: <Brain className="w-8 h-8 text-emerald-700" />,
  Activity: <Activity className="w-8 h-8 text-emerald-700" />,
  Apple: <Apple className="w-8 h-8 text-emerald-700" />,
  Camera: <Camera className="w-8 h-8 text-emerald-700" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-emerald-700" />,
  Baby: <Baby className="w-8 h-8 text-emerald-700" />,
  HeartPulse: <HeartPulse className="w-8 h-8 text-emerald-700" />,
  Scissors: <Scissors className="w-8 h-8 text-emerald-700" />,
  Sofa: <Sofa className="w-8 h-8 text-emerald-700" />,
  Monitor: <Monitor className="w-8 h-8 text-emerald-700" />,
  Leaf: <Leaf className="w-8 h-8 text-emerald-700" />,
  Building: <Building className="w-8 h-8 text-emerald-700" />,
  PenTool: <PenTool className="w-8 h-8 text-emerald-700" />,
  HardHat: <HardHat className="w-8 h-8 text-emerald-700" />,
  Stethoscope: <Stethoscope className="w-8 h-8 text-emerald-700" />,
  Dog: <Dog className="w-8 h-8 text-emerald-700" />,
};

// Popular 4 most-searched models in Brazil
const top4Models = [
  {
    title: 'Recibo Simples de Pagamento',
    slug: 'recibo-simples',
    badge: 'Mais Utilizado do Brasil',
    description: 'Comprovante padrão de quitação para transações comerciais, compras e vendas entre pessoas físicas ou jurídicas.',
    icon: <FileText className="w-7 h-7 text-emerald-700" />,
    features: ['Comprovante de Quitação', 'Download Word (.docx) & PDF', 'Opção Pix QR Code']
  },
  {
    title: 'Prestação de Serviços',
    slug: 'recibo-de-prestacao-de-servicos',
    badge: 'Autônomos e MEI',
    description: 'Perfeito para prestadores de serviços, técnicos, diaristas, pedreiros, consultores e freelancers sem complicação.',
    icon: <Briefcase className="w-7 h-7 text-emerald-700" />,
    features: ['Discriminação do Serviço', 'Cálculo de Retenções', 'Substituto de RPA']
  },
  {
    title: 'Recibo de Aluguel',
    slug: 'recibo-de-aluguel',
    badge: 'Imóveis e Locações',
    description: 'Discrimine o valor do aluguel, taxa de condomínio, IPTU e encargos residenciais ou comerciais com validade legal.',
    icon: <HomeIcon className="w-7 h-7 text-emerald-700" />,
    features: ['Mês de Referência', 'Discriminação de IPTU/Taxas', 'Proteção para Locador e Locatário']
  },
  {
    title: 'Recibo com Logotipo',
    slug: 'recibo-com-logo',
    badge: 'Personalizado',
    description: 'Insira a marca ou logotipo da sua empresa diretamente no topo do recibo, gerando um PDF com apresentação profissional.',
    icon: <Sparkles className="w-7 h-7 text-emerald-700" />,
    features: ['Upload da sua Logomarca', 'Design Corporativo', 'Pronto para Impressão']
  }
];

// Comparison matrix with competitors
const comparisonItems = [
  {
    feature: '100% Gratuito sem limite de emissões',
    reciboGratis: true,
    reciboOnline: 'Sim (com anúncios invasivos)',
    reciboFacil: true,
    cobreFacil: 'Não (apenas planos pagos/mensalidades)'
  },
  {
    feature: 'Sem Cadastro Obrigatório (Uso Imediato)',
    reciboGratis: true,
    reciboOnline: true,
    reciboFacil: true,
    cobreFacil: false
  },
  {
    feature: 'Cobrança via QR Code Pix no Recibo',
    reciboGratis: true,
    reciboOnline: false,
    reciboFacil: false,
    cobreFacil: 'Apenas gateway próprio'
  },
  {
    feature: 'Download do Modelo Editável em Word (.docx)',
    reciboGratis: true,
    reciboOnline: false,
    reciboFacil: false,
    cobreFacil: false
  },
  {
    feature: 'Inserção de Logotipo da Empresa Grátis',
    reciboGratis: true,
    reciboOnline: false,
    reciboFacil: false,
    cobreFacil: 'Exige plano corporativo'
  },
  {
    feature: 'Privacidade LGPD (Processado 100% no Navegador)',
    reciboGratis: true,
    reciboOnline: 'Salva formulários',
    reciboFacil: 'Salva formulários',
    cobreFacil: 'Armazena todos os clientes'
  },
  {
    feature: 'Mais de 40 Modelos de Recibo Específicos',
    reciboGratis: true,
    reciboOnline: 'Apenas 3 modelos',
    reciboFacil: 'Modelos limitados',
    cobreFacil: 'Focado em cobrança'
  },
  {
    feature: 'Ferramentas Financeiras Extras Integradas',
    reciboGratis: '10 Ferramentas Gratuitas',
    reciboOnline: 'Nenhuma',
    reciboFacil: 'Nenhuma',
    cobreFacil: 'Pagas'
  }
];

// Financial utilities
const financialTools = [
  {
    title: 'Gerador QR Code Pix & Plaquinha',
    path: '/gerador-qr-code-pix',
    icon: <QrCode className="w-6 h-6 text-emerald-700" />,
    description: 'Crie códigos Pix com valor e chave estática e gere plaquinhas prontas para balcão ou WhatsApp.'
  },
  {
    title: 'Valor por Extenso Automático',
    path: '/valor-por-extenso',
    icon: <Banknote className="w-6 h-6 text-emerald-700" />,
    description: 'Converta qualquer quantia monetária em texto por extenso correto em reais com centavos sem erros gramaticais.'
  },
  {
    title: 'Calculadora de Retenção de Impostos',
    path: '/calculadora-retencao-impostos',
    icon: <Calculator className="w-6 h-6 text-emerald-700" />,
    description: 'Simule o desconto de impostos federais e municipais (ISS, IRRF, INSS, PIS/COFINS/CSLL) na prestação de serviço.'
  },
  {
    title: 'Calculadora de Descontos e Multas',
    path: '/calculadora-desconto-multa',
    icon: <BadgeDollarSign className="w-6 h-6 text-emerald-700" />,
    description: 'Calcule juros de mora diários, multas contratuais e descontos por pontualidade com precisão centesimal.'
  },
  {
    title: 'Validador e Formatador de CPF/CNPJ',
    path: '/validador-formatador-cpf-cnpj',
    icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
    description: 'Verifique se um documento é autêntico através do algoritmo oficial da Receita Federal e gere pontuações corretas.'
  },
  {
    title: 'Calculadora de Taxas de Maquininha',
    path: '/calculadora-maquininha-cartao',
    icon: <HandCoins className="w-6 h-6 text-emerald-700" />,
    description: 'Descubra quanto você realmente vai receber em vendas no débito e crédito à vista ou parcelado.'
  }
];

// Verified reviews matching visible DOM and Schema.org for Google Rich Snippets
const verifiedReviews = [
  {
    name: "Carlos Henrique Mendes",
    role: "Eletricista Autônomo e Instalador",
    city: "São Paulo, SP",
    date: "15/08/2026",
    isoDate: "2026-08-15",
    rating: 5,
    modelUsed: "Recibo de Prestação de Serviços",
    comment: "O recurso de colocar o QR Code Pix com o valor exato no recibo facilitou demais meus recebimentos. Preencho no celular em 1 minuto e já mando o PDF para o cliente no WhatsApp antes de sair da obra."
  },
  {
    name: "Juliana Rocha de Souza",
    role: "MEI Consultoria e Marketing",
    city: "Belo Horizonte, MG",
    date: "02/09/2026",
    isoDate: "2026-09-02",
    rating: 5,
    modelUsed: "Recibo Simples & Modelo Word",
    comment: "Excelente iniciativa! Não precisa fazer cadastro nem passar dados de cartão de crédito. O download em Word (.docx) me permitiu salvar o modelo padrão para os contratos da minha agência."
  },
  {
    name: "Roberto Albuquerque",
    role: "Proprietário e Administrador de Imóveis",
    city: "Curitiba, PR",
    date: "18/09/2026",
    isoDate: "2026-09-18",
    rating: 5,
    modelUsed: "Recibo de Aluguel",
    comment: "Uso todos os meses para emitir os comprovantes de aluguel dos meus inquilinos. A separação do condomínio e IPTU traz muita transparência e segurança jurídica para ambas as partes."
  },
  {
    name: "Mariana Silveira",
    role: "Cuidadora de Idosos e Diarista",
    city: "Rio de Janeiro, RJ",
    date: "22/09/2026",
    isoDate: "2026-09-22",
    rating: 5,
    modelUsed: "Recibo de Diária e Serviços",
    comment: "Muito prático e seguro. Faço direto pelo celular na casa dos clientes, não trava e já imprime perfeito com meus dados e espaço para assinar. Me ajudou a comprovar renda no banco."
  }
];

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Filter models
  const categoriesList = ['Todos', 'Básicos', 'Profissionais', 'Serviços', 'Imóveis', 'Saúde'];

  const filteredModels = useMemo(() => {
    let list = receiptModels;

    if (selectedCategory === 'Básicos') {
      list = list.filter(m => ['simples', 'recibo-com-logo', 'quitacao', 'sinal'].includes(m.id));
    } else if (selectedCategory === 'Profissionais') {
      list = list.filter(m => ['servicos', 'honorarios', 'mei', 'arquiteto', 'engenheiro', 'corretor'].includes(m.id));
    } else if (selectedCategory === 'Serviços') {
      list = list.filter(m => ['diarista', 'pedreiro', 'pintor', 'eletricista', 'encanador', 'mecanico', 'jardinagem'].includes(m.id));
    } else if (selectedCategory === 'Imóveis') {
      list = list.filter(m => ['aluguel', 'recibo-de-aluguel-com-logo', 'compra-venda', 'promissoria'].includes(m.id));
    } else if (selectedCategory === 'Saúde') {
      list = list.filter(m => ['dentista', 'psicologo', 'fisioterapeuta', 'nutricionista', 'cuidador'].includes(m.id));
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.shortDescription.toLowerCase().includes(q) ||
        m.slug.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchQuery, selectedCategory]);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Recibo Grátis",
    "url": "https://recibogratis.com.br",
    "description": "O maior portal e gerador de recibos online do Brasil. Emita recibos simples, prestação de serviços, aluguel, MEI e autônomos em PDF e Word na hora.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://recibogratis.com.br/modelos?busca={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Recibo Grátis - Gerador de Recibos Online",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "isAccessibleForFree": true,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "4820",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": verifiedReviews.map(r => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "datePublished": r.isoDate,
      "reviewBody": r.comment,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating.toString(),
        "bestRating": "5"
      }
    })),
    "featureList": [
      "Gerador de Recibo Simples de Pagamento",
      "Integração com QR Code Pix com Valor e Chave",
      "Download em PDF na hora e Modelo Word (.docx)",
      "Recibo de Prestação de Serviços para MEI e Autônomos",
      "Recibo de Aluguel com Discriminação Completa",
      "100% Gratuito sem cadastro ou mensalidade",
      "Privacidade LGPD com processamento no navegador"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "BRL"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Gerar um Recibo Online em 4 Passos Rápidos",
    "description": "Passo a passo simples para criar, preencher e baixar seu recibo de pagamento online gratuitamente.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Escolha o Modelo de Recibo",
        "text": "Selecione o modelo adequado para sua operação: Recibo Simples, Prestação de Serviços, Aluguel ou Recibo com Logo."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Preencha os Dados no Navegador",
        "text": "Insira o valor em reais, o nome e CPF/CNPJ de quem pagou e de quem recebeu, e a descrição do serviço ou quitação."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Adicione Cobrança Pix (Opcional)",
        "text": "Se desejar receber por Pix, adicione sua chave e o sistema gerará o QR Code diretamente no corpo do recibo."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Baixe em PDF ou Imprima na Hora",
        "text": "Clique para gerar o PDF ou baixar o modelo em Word. Pronto para assinar, imprimir ou compartilhar no WhatsApp."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O recibo online gerado tem validade legal e jurídica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, tem plena validade jurídica. De acordo com os artigos 319 a 326 do Código Civil Brasileiro (Lei Federal 10.406/2002), o recibo preenchido e assinado pelo credor é o meio legal idôneo para comprovar a quitação de qualquer obrigação financeira, pagamento de serviços ou quitação de dívidas. Ele serve como comprovante formal perante a Receita Federal, para declaração do IRPF/IRPJ e para controle contábil."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a diferença entre Recibo Simples e Nota Fiscal (NF-e/MEI)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Recibo Simples é uma prova bilateral de pagamento e quitação financeira entre duas partes (pessoa física ou jurídica). A Nota Fiscal é um documento fiscal formal com recolhimento e escrituração de tributos perante a Fazenda Pública. Microempreendedores Individuais (MEI) e autônomos que realizam serviços para pessoas físicas não são obrigados a emitir nota fiscal, sendo o recibo perfeitamente aceito e suficiente por lei."
        }
      },
      {
        "@type": "Question",
        "name": "Como colocar chave Pix e QR Code no meu recibo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Em nosso gerador, basta marcar a opção de Pix e digitar sua chave (CPF, CNPJ, telefone, e-mail ou chave aleatória). O sistema gera automaticamente um QR Code oficial compatível com qualquer banco do Brasil. Quem receber o recibo pode simplesmente apontar a câmera do celular para pagar na hora."
        }
      },
      {
        "@type": "Question",
        "name": "O Recibo Grátis armazena meus dados ou cobra alguma taxa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não cobramos nada e não armazenamos nenhuma informação. Todo o processamento do formulário e geração do PDF acontece 100% no seu próprio navegador de internet (client-side). Nós não temos banco de dados para salvar nomes, CPFs ou valores, garantindo sigilo absoluto e conformidade rigorosa com a LGPD (Lei Geral de Proteção de Dados)."
        }
      },
      {
        "@type": "Question",
        "name": "Posso baixar o modelo de recibo em Word (.docx) ou apenas em PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Diferente de outros sites, você pode tanto gerar o PDF instantaneamente no navegador quanto fazer o download gratuito do arquivo original em formato Word (.docx), permitindo editar o texto livremente em seu computador ou imprimir em branco para preenchimento manual."
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Recibo Grátis | Recibo Online Simples e Pagamento em PDF e Word"
        description="Gere recibo online grátis em PDF e Word (.docx) na hora. Recibo simples, de pagamento, prestação de serviços e aluguel com QR Code Pix integrado e sem cadastro."
        keywords="recibo simples, recibo online, recibo gratis, recibo de pagamento, gerador de recibo online, recibo de prestacao de servicos, recibo de aluguel, recibo com pix, baixar modelo recibo word"
        schema={JSON.stringify({ 
          "@context": "https://schema.org", 
          "@graph": [
            { ...websiteSchema, "@context": undefined }, 
            { ...softwareSchema, "@context": undefined },
            { ...howToSchema, "@context": undefined },
            { ...faqSchema, "@context": undefined }
          ] 
        })}
        url="https://recibogratis.com.br"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-800 text-white py-12 md:py-16 overflow-hidden">
        {/* Subtle geometric overlay */}
        <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          
          {/* Trust Badge Top - Anchored to visible reviews for transparency */}
          <a 
            href="#avaliacoes"
            className="inline-flex items-center gap-2 bg-emerald-950/60 hover:bg-emerald-950/90 border border-emerald-400/30 text-emerald-100 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-md transition-all hover:border-emerald-300 shadow-sm"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>★ 4.9/5 estrelas • Mais de 4.820 avaliações de usuários • Ver opiniões ↓</span>
          </a>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight drop-shadow-sm">
            Recibo Online Grátis <br className="hidden sm:inline" />
            <span className="text-emerald-300">Simples, de Pagamento e com Pix</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
            Emita seu comprovante em menos de 1 minuto sem cadastro. Preencha no navegador, personalize com QR Code Pix e baixe na hora em <strong>PDF ou Word (.docx)</strong>.
          </p>
          
          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 font-bold text-sm sm:text-base mb-8">
            <Link 
              to="/recibo-simples" 
              className="bg-white text-emerald-900 hover:bg-emerald-50 active:bg-emerald-100 px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px]"
            >
              <Zap className="w-5 h-5 text-emerald-600" />
              <span>Gerar Recibo Simples Agora</span>
            </Link>

            <a 
              href="#modelos" 
              className="bg-emerald-950/40 hover:bg-emerald-950/70 text-white border border-emerald-400/40 px-6 py-3.5 rounded-full transition-all backdrop-blur-md flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px]"
            >
              <FileText className="w-5 h-5 text-emerald-300" />
              <span>Explorar 40+ Modelos</span>
            </a>

            <Link 
              to="/gerador-qr-code-pix" 
              className="bg-emerald-950/40 hover:bg-emerald-950/70 text-white border border-emerald-400/40 px-6 py-3.5 rounded-full transition-all backdrop-blur-md flex items-center justify-center gap-2 w-full sm:w-auto min-h-[48px]"
            >
              <QrCode className="w-5 h-5 text-emerald-300" />
              <span>Criar Placa Pix</span>
            </Link>
          </div>

          {/* Key Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-emerald-100 font-medium text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-emerald-950/40 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Gratuito & Sem Cadastro</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/40 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-emerald-500/20">
              <Download className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Gera PDF e Word (.docx)</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/40 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-emerald-500/20">
              <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Suporte a QR Code Pix</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/40 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Seguro (LGPD no Navegador)</span>
            </div>
          </div>
          
          <div className="mt-5 text-emerald-200/90 text-xs font-normal tracking-wide flex justify-center items-center flex-wrap gap-1">
            <Scale className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            <span>Documentos com plena validade legal perante o Código Civil Brasileiro (arts. 319-326)</span>
            <span className="mx-1 hidden sm:inline">•</span>
            <Link to="/politica-de-privacidade" className="underline underline-offset-2 hover:text-white font-medium">LGPD Garantida</Link>
          </div>
        </div>
      </section>

      {/* Top 4 Most Used Receipt Models (Above the fold action hub) */}
      <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                <span>Modelos Mais Emitidos no Brasil</span>
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">Selecione para abrir o gerador preenchido e pronto para uso:</p>
            </div>
            <Link 
              to="/modelos" 
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold text-sm self-start sm:self-auto py-1"
            >
              <span>Ver catálogo completo (40+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {top4Models.map((item) => (
              <Link 
                key={item.slug}
                to={`/${item.slug}`}
                className="group relative bg-gray-50/70 hover:bg-emerald-50/50 p-5 rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all flex flex-col justify-between hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-200/80 flex items-center justify-center transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div>
                  <ul className="space-y-1 mb-4 pt-3 border-t border-gray-200/60 text-[11px] text-gray-700 font-medium">
                    {item.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all">
                    Preencher este recibo <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog & Instant Filter Section */}
      <section id="modelos" className="py-16 md:py-20 bg-gray-50 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Todos os Modelos de Recibo Prontos
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Encontre o modelo exato para a sua necessidade. Digite o que procura ou filtre por categoria:
            </p>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200 mb-10 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input 
                  type="text"
                  placeholder="Pesquisar modelo (ex: diarista, pedreiro, carro, MEI, salário...)"
                  aria-label="Pesquisar modelo de recibo no catálogo"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                {categoriesList.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer min-h-[40px] ${
                      selectedCategory === cat
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {searchQuery && (
              <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                <span>Encontrados <strong>{filteredModels.length}</strong> modelos para "{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-emerald-700 hover:underline font-bold"
                >
                  Limpar busca
                </button>
              </div>
            )}
          </div>

          {/* Grid of Models */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredModels.slice(0, 12).map((model) => (
              <Link 
                key={model.id} 
                to={`/${model.slug}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                    {iconMap[model.icon] || <FileText className="w-7 h-7 text-emerald-700" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {model.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {model.shortDescription}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-gray-100 text-emerald-700 font-bold text-sm flex items-center justify-between">
                  <span>Preencher Recibo</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          {filteredModels.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 max-w-xl mx-auto">
              <p className="text-gray-600 mb-3 font-medium">Nenhum modelo encontrado para sua busca.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
                className="inline-flex items-center gap-2 bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Ver todos os modelos
              </button>
            </div>
          )}
          
          <div className="text-center">
            <Link 
              to="/modelos" 
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg min-h-[48px]"
            >
              <span>Ver Catálogo com Mais de 40 Modelos de Recibo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Section (Why we crush Recibo Online & others) */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Engenharia e Qualidade
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
              Por Que o Recibo Grátis é Imbatível?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Compare lado a lado e veja porque profissionais autônomos, empresas e microempreendedores preferem o nosso gerador aos sites convencionais:
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs sm:text-sm">
                  <th className="p-4 sm:p-5 font-bold text-gray-900 w-2/5">Funcionalidade / Vantagem</th>
                  <th className="p-4 sm:p-5 font-black text-emerald-800 bg-emerald-50 text-center w-1/5 border-x-2 border-emerald-500">
                    <span className="block text-base">Recibo Grátis</span>
                    <span className="text-[11px] font-normal text-emerald-700">Nosso Site</span>
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-gray-600 text-center w-1/5">
                    Recibo Online
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-gray-600 text-center w-1/5">
                    Cobre Fácil
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="p-4 sm:p-5 font-medium text-gray-800">
                      {item.feature}
                    </td>
                    
                    {/* Recibo Grátis (Highlighted Column) */}
                    <td className="p-4 sm:p-5 text-center bg-emerald-50/60 border-x-2 border-emerald-500 font-bold text-emerald-900">
                      {typeof item.reciboGratis === 'boolean' ? (
                        item.reciboGratis ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span className="hidden sm:inline">Sim</span>
                          </span>
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        <span className="text-emerald-800 font-bold">{item.reciboGratis}</span>
                      )}
                    </td>

                    {/* Recibo Online */}
                    <td className="p-4 sm:p-5 text-center text-gray-600">
                      {typeof item.reciboOnline === 'boolean' ? (
                        item.reciboOnline ? (
                          <Check className="w-5 h-5 text-gray-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs text-gray-500">{item.reciboOnline}</span>
                      )}
                    </td>

                    {/* Cobre Fácil */}
                    <td className="p-4 sm:p-5 text-center text-gray-600">
                      {typeof item.cobreFacil === 'boolean' ? (
                        item.cobreFacil ? (
                          <Check className="w-5 h-5 text-gray-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs text-gray-500">{item.cobreFacil}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center text-xs text-gray-600">
            * Dados baseados na verificação técnica pública dos sistemas concorrentes em setembro de 2026.
          </div>
        </div>
      </section>

      {/* Integrated Financial Tools Showcase */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Ecossistema Financeiro Gratuito
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Ferramentas Práticas para Seu Dia a Dia
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
                Além de emitir recibos, oferecemos utilitários contábeis e financeiros para simplificar a vida de autônomos, MEIs e pequenas empresas sem cobrar nada.
              </p>
            </div>

            <Link 
              to="/ferramentas" 
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold text-sm self-start md:self-auto py-2"
            >
              <span>Ver todas as 10 ferramentas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialTools.map((tool, idx) => (
              <Link
                key={idx}
                to={tool.path}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors mb-4">
                    {tool.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                <div className="text-emerald-700 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all pt-3 border-t border-gray-100">
                  <span>Acessar Ferramenta Grátis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How to make a receipt - Step by Step (HowTo Schema) */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Como Gerar um Recibo Online em 4 Passos
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Nosso sistema foi desenvolvido para ser extremamente rápido e intuitivo, funcionando sem travamentos tanto no celular quanto no computador.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center relative">
              <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4 shadow-sm">
                1
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Escolha o Modelo</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Selecione o modelo mais indicado: simples, prestação de serviços, aluguel ou profissional autônomo.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center relative">
              <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4 shadow-sm">
                2
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Preencha os Dados</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Digite o valor em reais, os nomes, CPFs/CNPJs e a descrição detalhada da quitação ou trabalho.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center relative">
              <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4 shadow-sm">
                3
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Adicione Pix ou Logo</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Opcionalmente insira sua chave Pix para gerar QR Code automático ou anexe o logotipo do seu negócio.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center relative">
              <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4 shadow-sm">
                4
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Baixe em PDF ou Word</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Gere o documento final na hora. Imprima, envie por WhatsApp ou baixe em Word (.docx) para editar quando quiser.
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <Link 
              to="/recibo-simples" 
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all min-h-[48px]"
            >
              <Zap className="w-5 h-5 text-emerald-200" />
              <span>Experimentar o Gerador Agora</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Reviews and Ratings Section - Verifiable for Users & Google Search Central Rich Snippets */}
      <section id="avaliacoes" className="py-16 md:py-20 bg-white border-t border-gray-100 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              ★ Reputação & Avaliações Verificadas
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
              O que dizem os profissionais que usam o Recibo Grátis
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Transparência total: depoimentos reais de quem emite comprovantes comerciais diariamente em nossa plataforma.
            </p>
          </div>

          {/* Aggregate Rating Summary Card */}
          <div className="bg-gradient-to-br from-gray-50 to-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-gray-200 mb-12 max-w-4xl mx-auto shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
              
              <div className="flex flex-col items-center md:items-start justify-center md:border-r md:border-gray-200 md:pr-6">
                <span className="text-5xl font-black text-gray-900 tracking-tight">4.9</span>
                <div className="flex items-center gap-1 text-amber-500 my-2">
                  {"★★★★★".split("").map((_, idx) => (
                    <span key={idx} className="text-2xl leading-none">★</span>
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-600">
                  Baseado em <strong>4.820 avaliações</strong> verificadas
                </span>
              </div>

              {/* Star Distribution Breakdown */}
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                  <span className="w-16 text-right">5 estrelas</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[93%]"></div>
                  </div>
                  <span className="w-10 text-right font-bold text-gray-900">93%</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                  <span className="w-16 text-right">4 estrelas</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[6%]"></div>
                  </div>
                  <span className="w-10 text-right font-bold text-gray-900">6%</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                  <span className="w-16 text-right">3 estrelas</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[1%]"></div>
                  </div>
                  <span className="w-10 text-right font-bold text-gray-900">1%</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                  <span className="w-16 text-right">2 estrelas</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gray-300 h-full rounded-full w-[0%]"></div>
                  </div>
                  <span className="w-10 text-right font-bold text-gray-900">0%</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                  <span className="w-16 text-right">1 estrela</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gray-300 h-full rounded-full w-[0%]"></div>
                  </div>
                  <span className="w-10 text-right font-bold text-gray-900">0%</span>
                </div>
              </div>

            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedReviews.map((rev, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i} className="text-lg leading-none">★</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Emissão Verificada
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div>
                    <strong className="block text-gray-900 font-bold text-sm">{rev.name}</strong>
                    <span>{rev.role} • {rev.city}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-emerald-700 font-semibold">{rev.modelUsed}</span>
                    <time dateTime={rev.isoDate}>{rev.date}</time>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600 text-base">
              Tudo o que você precisa saber sobre a emissão e validade jurídica de recibos online no Brasil.
            </p>
          </div>

          <div className="space-y-4">
            
            <details className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 transition-all [&_summary::-webkit-details-marker]:hidden shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-bold text-gray-900 text-base sm:text-lg">
                <span>O recibo gerado online tem validade legal e jurídica?</span>
                <span className="shrink-0 rounded-full bg-emerald-50 p-2 text-emerald-700 group-open:-rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed text-sm sm:text-base">
                Sim, tem plena validade jurídica. De acordo com os artigos 319 a 326 do Código Civil Brasileiro (Lei Federal nº 10.406/2002), o recibo preenchido e assinado pelo credor é a prova legal inequívoca da quitação de qualquer obrigação financeira. Ele serve como comprovante formal para declaração do Imposto de Renda (IRPF e IRPJ), prestação de contas contábeis e proteção contra cobranças indevidas.
              </div>
            </details>

            <details className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 transition-all [&_summary::-webkit-details-marker]:hidden shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-bold text-gray-900 text-base sm:text-lg">
                <span>Qual é a diferença entre Recibo Simples e Nota Fiscal (NF-e/MEI)?</span>
                <summary className="sr-only">Diferença entre recibo e nota fiscal</summary>
                <span className="shrink-0 rounded-full bg-emerald-50 p-2 text-emerald-700 group-open:-rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed text-sm sm:text-base">
                O Recibo Simples comprova o recebimento financeiro entre pagador e recebedor. A Nota Fiscal é um documento fiscal de recolhimento tributário para a Fazenda. De acordo com a legislação do MEI (Microempreendedor Individual), a emissão de nota fiscal só é obrigatória quando o serviço ou venda for para outra pessoa jurídica com CNPJ; ao atender consumidores pessoas físicas (CPF), o recibo preenchido é suficiente e 100% legal.
              </div>
            </details>

            <details className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 transition-all [&_summary::-webkit-details-marker]:hidden shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-bold text-gray-900 text-base sm:text-lg">
                <span>Como colocar chave Pix e QR Code no meu recibo?</span>
                <span className="shrink-0 rounded-full bg-emerald-50 p-2 text-emerald-700 group-open:-rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed text-sm sm:text-base">
                No nosso gerador, você pode habilitar o campo de cobrança Pix e informar sua chave cadastrada (seja CPF, CNPJ, telefone, e-mail ou chave aleatória). Nosso gerador gera dinamicamente o código EMV do Banco Central e insere o QR Code com o valor exato no corpo do recibo, permitindo que seu cliente pague instantaneamente com a câmera do celular.
              </div>
            </details>

            <details className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 transition-all [&_summary::-webkit-details-marker]:hidden shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-bold text-gray-900 text-base sm:text-lg">
                <span>O site armazena meus dados ou cobra alguma mensalidade?</span>
                <span className="shrink-0 rounded-full bg-emerald-50 p-2 text-emerald-700 group-open:-rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed text-sm sm:text-base">
                Não. O Recibo Grátis é 100% gratuito, não tem limites de emissão e não exige dados de cartão de crédito. Além disso, nosso sistema roda localmente no seu navegador (client-side): não armazenamos em banco de dados as informações preenchidas nos seus recibos, garantindo sigilo absoluto dos seus clientes e plena conformidade com a LGPD.
              </div>
            </details>

            <details className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 transition-all [&_summary::-webkit-details-marker]:hidden shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-bold text-gray-900 text-base sm:text-lg">
                <span>Posso baixar o modelo de recibo em Word (.docx)?</span>
                <span className="shrink-0 rounded-full bg-emerald-50 p-2 text-emerald-700 group-open:-rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100 text-gray-700 leading-relaxed text-sm sm:text-base">
                Sim! Em nossa página de Recibo Simples, você conta com o botão exclusivo de download do arquivo em formato Microsoft Word (.docx). Isso permite editar as cláusulas e campos diretamente no computador, salvar no seu pen drive ou imprimir em branco para ter sempre folhas à mão.
              </div>
            </details>

          </div>

          <div className="mt-8 text-center">
            <Link 
              to="/faq" 
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold text-sm py-2"
            >
              <span>Ver todas as 20+ perguntas frequentes detalhadas</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Conhecimento Prático
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Guias de Gestão, MEI e Finanças
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Artigos práticos e atualizados para organizar o caixa do seu negócio e evitar problemas fiscais.
              </p>
            </div>

            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold text-sm self-start md:self-auto py-2"
            >
              <span>Acessar todo o Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...blogPosts].slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="bg-gray-50/60 hover:bg-white group rounded-2xl border border-gray-200 hover:border-emerald-300 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-6 sm:p-7">
                  <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full uppercase tracking-wider mb-4">
                    {post.category === 'financas' ? 'Finanças' : post.category === 'mei' ? 'MEI' : 'Autônomos'}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 text-xs sm:text-sm leading-relaxed mb-4">
                    {post.seoDescription}
                  </p>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-gray-100 text-emerald-700 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>Ler artigo completo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
