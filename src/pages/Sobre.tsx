import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { 
  ShieldCheck, 
  Scale, 
  FileCheck2, 
  CheckCircle2, 
  Lock, 
  Building2, 
  Phone, 
  FileText, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Sobre() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Recibo Grátis",
      "url": "https://recibogratis.com.br",
      "logo": "https://recibogratis.com.br/logo.png",
      "description": "Plataforma brasileira de emissão online e gratuita de recibos e documentos de quitação financeira com processamento seguro no navegador e sem cadastro.",
      "founder": {
        "@type": "Person",
        "name": "Elvis Dias",
        "jobTitle": "Jornalista Profissional (DRT 1466/RO) e Editor Responsável"
      },
      "taxID": "43.027.941/0001-21",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-69-98103-9664",
        "contactType": "customer service"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SEO
        title="Sobre Nós e Compromisso Editorial | Recibo Grátis"
        description="Conheça a história, a equipe editorial e as diretrizes jurídicas e de privacidade do Recibo Grátis. Mais de 40 modelos auditados conforme a legislação brasileira."
        url="https://recibogratis.com.br/sobre"
        schema={JSON.stringify(aboutSchema)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Transparência • Rigor Jurídico • Privacidade LGPD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            Sobre o Recibo Grátis
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Democratizando o acesso a documentos civis e comprovantes de quitação com validade legal, segurança e sem custo para milhões de brasileiros.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-12">
        
        {/* Missão e Propósito */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-emerald-600" />
            Nossa Missão
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            O <strong>Recibo Grátis</strong> nasceu com um propósito claro: eliminar as barreiras burocráticas e financeiras que autônomos, pequenos comerciantes, MEIs, inquilinos e prestadores de serviços enfrentam para formalizar suas transações do dia a dia.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Em vez de exigir cadastros extensos, planos pagos ou downloads de planilhas complexas, desenvolvemos ferramentas ágeis que rodam <strong>diretamente no navegador</strong>, formatadas para impressão em papel A4 ou salvamento imediato em PDF e Word (.docx).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="block text-2xl font-black text-emerald-800">100% Gratuito</span>
              <span className="text-xs text-emerald-700 font-medium">Sem planos pagos ou letras miúdas</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="block text-2xl font-black text-emerald-800">Sem Cadastro</span>
              <span className="text-xs text-emerald-700 font-medium">Uso imediato sem pedir seu e-mail</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="block text-2xl font-black text-emerald-800">Privacidade Total</span>
              <span className="text-xs text-emerald-700 font-medium">Processamento local no seu navegador</span>
            </div>
          </div>
        </div>

        {/* Autor e Equipe Editorial (E-E-A-T) */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Award className="w-7 h-7 text-emerald-600" />
            Responsabilidade Editorial e Autoria
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-2">
            <div className="w-24 h-24 rounded-full bg-emerald-700 text-white font-black text-3xl flex items-center justify-center shrink-0 shadow-md">
              ED
            </div>
            <div className="space-y-3 text-center md:text-left">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Elvis Dias</h3>
                <p className="text-emerald-700 text-sm font-semibold">
                  Jornalista Profissional (Registro MTE / DRT 1466/RO) • Editor e Fundador
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">
                Com trajetória dedicada à comunicação informativa, direitos do consumidor e desburocratização de serviços essenciais, Elvis Dias coordena a elaboração de conteúdos, pesquisas de jurisprudência prática e a curadoria dos mais de 40 modelos de recibos, contratos e declarações disponibilizados no site.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Fundador também das plataformas irmãs <em>Declaração Online</em> e <em>Gera Contrato</em>, tem como foco transformar normas complexas do Direito Civil em soluções práticas, acessíveis e seguras para o trabalhador brasileiro.
              </p>
            </div>
          </div>
        </div>

        {/* Embasamento Jurídico e Fontes Primárias */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Scale className="w-7 h-7 text-emerald-600" />
            Fundamentação Jurídica e Fontes Primárias
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Todos os modelos de documentos e orientações técnicas presentes no portal são elaborados com base rigorosa na legislação federal brasileira e nas normativas de órgãos oficiais:
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <strong className="text-gray-900 block text-base mb-1">
                1. Código Civil Brasileiro (Lei Federal nº 10.406/2002)
              </strong>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                Os artigos 319 a 326 regulamentam a <em>prova do pagamento e da quitação</em>. O artigo 319 estabelece expressamente que o devedor que paga tem direito a quitação regular e pode reter o pagamento enquanto esta não lhe for dada.
              </p>
              <a 
                href="https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                Consultar Código Civil no Portal do Planalto &rarr;
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <strong className="text-gray-900 block text-base mb-1">
                2. Lei do Inquilinato (Lei Federal nº 8.245/1991)
              </strong>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                O artigo 22, inciso VI, determina a obrigação do locador em fornecer ao locatário recibo discriminado das importâncias pagas, vedada a quitação genérica, garantindo transparência sobre aluguel, condomínio e impostos.
              </p>
              <a 
                href="https://www.planalto.gov.br/ccivil_03/leis/l8245.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                Consultar Lei nº 8.245/1991 no Planalto &rarr;
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <strong className="text-gray-900 block text-base mb-1">
                3. Arranjo de Pagamentos Pix (Banco Central do Brasil)
              </strong>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                Nossos recibos com QR Code Pix seguem a padronização oficial do Banco Central (Resolução BCB nº 1/2020 e padrão EMV BR Code), gerando códigos compatíveis com todos os aplicativos bancários do país.
              </p>
              <a 
                href="https://www.bcb.gov.br/estabilidadefinanceira/pix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                Consultar Normativas do Pix no Banco Central &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Compromisso com a Privacidade e LGPD */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Lock className="w-7 h-7 text-emerald-600" />
            Privacidade por Design (LGPD)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Diferente da maioria dos softwares corporativos, o <strong>Recibo Grátis adota uma arquitetura de privacidade absoluta</strong>:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Sem armazenamento remoto:</strong> Os dados que você digita (nomes, CPFs, valores e endereços) não são gravados em nossos servidores.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Processamento no cliente (Client-side):</strong> A montagem do documento, o cálculo de valores por extenso e a renderização do PDF acontecem exclusivamente dentro da memória do seu próprio navegador.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Total conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018):</strong> Sem venda ou compartilhamento de cadastros com terceiros.</span>
            </li>
          </ul>
        </div>

        {/* Dados Institucionais */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <Building2 className="w-7 h-7 text-emerald-600" />
            Dados Institucionais e Contato
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <p className="font-bold text-gray-900 mb-1">Razão e Titularidade</p>
              <p>Elvis Dias</p>
              <p>CNPJ: 43.027.941/0001-21</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-1">Canais de Contato</p>
              <p>Telefone / WhatsApp: (69) 98103-9664</p>
              <p>
                <Link to="/contato" className="text-emerald-700 font-semibold hover:underline">
                  Formulário de Contato Direto &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center pt-4">
          <Link
            to="/modelos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-lg shadow-md hover:shadow-lg transition-all"
          >
            <FileText className="w-5 h-5" />
            <span>Explorar Todos os 40+ Modelos de Recibo</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </main>
    </div>
  );
}
