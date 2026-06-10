import { SEO } from '../components/SEO';
import { AdSense } from '../components/AdSense';
import { Shield } from 'lucide-react';

export function Privacidade() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Política de Privacidade e Proteção de Dados (LGPD) | Recibo Grátis",
        "description": "Entenda como o Recibo Grátis protege seus dados em conformidade com a LGPD. Nosso sistema opera 100% no navegador (client-side) para segurança absoluta.",
        "url": "https://recibogratis.com.br/politica-de-privacidade"
      },
      {
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
            "name": "Política de Privacidade",
            "item": "https://recibogratis.com.br/politica-de-privacidade"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Política de Privacidade e LGPD | Recibo Grátis" 
        description="Entenda como o Recibo Grátis protege seus dados. Processamento 100% no navegador (client-side), sem armazenamento de informações sensíveis e em conformidade estrita com a LGPD."
        keywords="política de privacidade, lgpd, proteção de dados, segurança da informação, privacidade de dados"
        schema={JSON.stringify(jsonLd)}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-600 to-teal-600 text-white py-12 md:py-20 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl mb-6 shadow-sm">
            <Shield className="w-8 h-8 text-emerald-50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Política de Privacidade
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
            Transparência e segurança em primeiro lugar. Saiba como garantimos que seus dados e os dados de seus clientes fiquem protegidos.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-none">
          <AdSense />
        
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed font-medium mb-8">
              No Recibo Grátis, a sua privacidade é nossa prioridade absoluta. Esta Política de Privacidade explica detalhadamente como lidamos com as informações que você insere em nosso sistema, nossa conformidade com a LGPD e o uso de dados de terceiros.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">1. Coleta de Dados Pessoais e LGPD</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-gray-900">Nós NÃO coletamos, armazenamos ou transmitimos nenhum dado pessoal inserido nos formulários de recibo.</strong> A nossa ferramenta foi concebida sob o princípio de <em>Privacy by Design</em>. Todo o processamento dos dados (como nomes, CPFs/CNPJs, valores, endereços e assinaturas) é realizado exclusivamente de maneira local, diretamente no navegador do usuário (client-side).
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">1.1. Processamento Local (Client-side)</h3>
            <p className="text-gray-600 leading-relaxed">
              Diferente de sistemas web tradicionais, nosso gerador emite o documento em PDF utilizando o próprio poder de processamento do seu computador ou celular. Quando você finaliza o preenchimento, imprime ou fecha a aba, todos os dados digitados são automaticamente descartados da memória da sua máquina. Não possuímos e não utilizamos estruturas de banco de dados em nossos servidores para recepcionar ou armazenar as informações presentes nos recibos.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">2. Conformidade com a LGPD (Lei Geral de Proteção de Dados)</h2>
            <p className="text-gray-600 leading-relaxed">
              O <strong>Recibo Grátis</strong> atua em estrita conformidade com e respeito à <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD)</strong> no Brasil. Dado que estruturamos nosso modelo de forma "stateless" (sem retenção de estado/sessão) para os formulários de documentos:
            </p>
            <ul className="list-none space-y-3 mt-4 mb-6">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">✓</span>
                <span className="text-gray-600 leading-relaxed">Não figuramos e não atuamos como "Controladores" nem como "Operadores" (conforme definido na LGPD) dos dados pessoais de terceiros informados nos campos do recibo.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">✓</span>
                <span className="text-gray-600 leading-relaxed">Não exigimos criação de conta, formulários de cadastro, login ou senhas.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">✓</span>
                <span className="text-gray-600 leading-relaxed">Não solicitamos, sob nenhuma hipótese, dados bancários como contas, agências ou números de cartão de crédito.</span>
              </li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">3. Uso de Cookies, Analytics e Anúncios</h2>
            <p className="text-gray-600 leading-relaxed">
              Enquanto o preenchimento dos recibos ocorre de modo invisível para nós, nosso site utiliza serviços de infraestrutura de terceiros que podem posicionar e ler rastreadores (cookies) no seu navegador, estritamente para o funcionamento técnico, análise de métricas de visitação e exibição de anúncios contextuais relevantes.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">3.1. Google Analytics</h3>
            <p className="text-gray-600 leading-relaxed">
              Utilizamos a solução estatística Google Analytics operando de forma anonimizada para entender nosso volume de tráfego, identificar as páginas mais acessadas, horários de pico e melhorar continuamente a velocidade e navegabilidade das nossas ferramentas.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">3.2. Google AdSense (Publicidade)</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Para custear nossos servidores e manter o <strong>Gerador de Recibo Online</strong> totalmente gratuito para você (para sempre e livre de taxas), exibimos espaços publicitários geridos pelo ecossistema do Google (Rede de Display e parceiros).
            </p>
            <p className="text-gray-600 leading-relaxed">
              O fornecedor terceirizado Google emprega tecnologias de cookies (como o cookie DART) para processar métricas e veicular anúncios com base em visitas anteriores dos usuários ao nosso site e a outras páginas na web. Caso deseje, você pode optar ativamente por desativar o uso de cookies para fins de publicidade personalizada diretamente no painel de <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline">Configurações de anúncios do Google</a>.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">4. Links Internos e para Sites de Terceiros</h2>
            <p className="text-gray-600 leading-relaxed">
              Para agregar valor de utilidade pública e prover uma experiência aprimorada para o ecossistema brasileiro de empreendedores, profissionais autônomos e trabalhadores, nosso site apresenta ferramentas úteis e pode vir a exibir hiperlinks apontando para portais governamentais oficiais (e.g. IBGE, Ministério da Fazenda) ou para outros geradores complementares ou de parceiros. Salientamos textualmente que o fato de dispormos tais atalhos não pressupõe responsabilidade ou controle editorial, legal nem sobre as práticas autônomas de privacidade governando esses endereços externos.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100">5. Atualizações em nossas Diretrizes de Segurança</h2>
            <p className="text-gray-600 leading-relaxed">
              Detemos e reservamo-nos no direito de proceder à revisão e evolução dos textos que compõem esta Política de Privacidade a qualquer tempo, com o propósito contínuo de abranger de forma diligente eventuais aprimoramentos técnicos implementados em nossos serviços ou em resposta ao cenário normativo pátrio. Instruímos aos nossos utilizadores regulares o acompanhamento consultivo desta mesma página para a manutenção de seu estado de plena ciência de proteção digital.
            </p>

            <div className="mt-10 mb-8">
              <AdSense />
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-100 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
                <Shield className="w-4 h-4" />
              </span>
              <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                Última atualização: <span className="text-emerald-700">09 de Junho de 2026</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
