import {  useState  } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Percent, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, Clock, Calculator } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function DescontosMultas() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [valorAntigo, setValorAntigo] = useState('');
  const [percentual, setPercentual] = useState('');
  const [isDesconto, setIsDesconto] = useState(true);

  const parseCurrency = (val: string) => {
    return parseFloat(val.replace(/\./g, '').replace(',', '.') || '0');
  };

  const formatCurrencyInput = (val: string) => {
    let cleanVal = val.replace(/\D/g, '');
    if (cleanVal.length === 0) return '';
    cleanVal = cleanVal.padStart(3, '0');
    const integerPart = cleanVal.slice(0, -2);
    const decimalPart = cleanVal.slice(-2);
    const formattedInteger = parseInt(integerPart, 10).toLocaleString('pt-BR');
    return `${formattedInteger},${decimalPart}`;
  };

  const valorNum = parseCurrency(valorAntigo);
  const percentNum = parseCurrency(percentual);
  
  const diferenca = (valorNum * percentNum) / 100;
  const valorFinal = isDesconto ? valorNum - diferenca : valorNum + diferenca;

  return (
    <>
      <SEO 
        title="Calculadora de Desconto e Multa por Atraso - Online e Grátis"
        description="Calcule facilmente juros diários, multas por atraso de pagamento ou descontos percentuais em boletos, recibos e parcelas. Ferramenta online gratuita."
        keywords="calculadora de desconto, calcular multa por atraso, calcular juros de mora, juros diario boleto, calcular porcentagem desconto"
        
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Percent className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Descontos e Multas</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Descubra o valor final após descontos promocionais ou acréscimos de juros.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="flex gap-4 mb-8 justify-center">
            <button 
              onClick={() => setIsDesconto(true)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${isDesconto ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Calcular Desconto
            </button>
            <button 
              onClick={() => setIsDesconto(false)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${!isDesconto ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Acréscimo/Multa
            </button>
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Valor Inicial (R$)</label>
              <input
                type="text"
                value={valorAntigo}
                onChange={(e) => setValorAntigo(formatCurrencyInput(e.target.value))}
                placeholder="0,00"
                className="w-full px-4 py-4 text-xl border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Porcentagem (%)</label>
              <input
                type="text"
                value={percentual}
                onChange={(e) => setPercentual(formatCurrencyInput(e.target.value))}
                placeholder="0,00"
                className="w-full px-4 py-4 text-xl border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-center font-bold"
              />
            </div>

            <div className="pt-6 border-t mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Valor Inicial:</span>
                <span className="font-semibold text-lg">R$ {formatCurrency(valorNum.toFixed(2).replace('.', ','))}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">{isDesconto ? 'Desconto Aplicado:' : 'Acréscimo Adicionado:'}</span>
                <span className={`font-semibold text-lg ${isDesconto ? 'text-green-600' : 'text-red-600'}`}>
                  {isDesconto ? '-' : '+'} R$ {formatCurrency(diferenca.toFixed(2).replace('.', ','))}
                </span>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 text-center shadow-inner">
                <p className="text-emerald-800 text-sm font-bold mb-1">Valor Final Acordado</p>
                <p className="text-4xl font-extrabold text-emerald-700">
                  R$ {formatCurrency(Math.max(0, valorFinal).toFixed(2).replace('.', ','))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSense />
        
                    </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Qual é o limite de multa por atraso permitido por lei?","acceptedAnswer":{"@type":"Answer","text":"De acordo com o Código de Defesa do Consumidor (CDC), para relações de consumo, a multa de mora por atraso de pagamento não pode ser superior a <strong>2% do valor da prestação</strong>. Para contratos entre empresas (B2B) e condomínios, outras regras podem se aplicar (frequentemente 2% também)."}},{"@type":"Question","name":"O que são juros de mora 'pro rata die'?","acceptedAnswer":{"@type":"Answer","text":"São os juros cobrados de forma proporcional aos dias de atraso. Normalmente o limite legal (sem contrato específico) é de 1% ao mês. Assim, divide-se 1% por 30 dias para encontrar a taxa diária (0,033% ao dia) e multiplica-se pelos dias corridos em atraso."}},{"@type":"Question","name":"Como funciona o cálculo do desconto?","acceptedAnswer":{"@type":"Answer","text":"O cálculo do desconto subtrai um percentual sobre o valor total. Exemplo: um produto de R$ 100,00 com 15% de desconto. O valor do desconto é R$ 15,00, resultando num valor final a pagar de R$ 85,00."}}]}` }} />
      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Calcular Multa e Juros por Atraso de Pagamento
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>A calculadora de atrasos e descontos é essencial para lojistas, prestadores de serviços e locadores que precisam atualizar o valor de cobranças vencidas, recibos e notas promissórias ou conceder um abatimento em compras à vista. O sistema computa os valores seguindo as diretrizes básicas matemáticas e de consumo.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Regras do Código de Defesa do Consumidor (CDC)
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Ao emitir cobranças contra pessoas físicas em relações de consumo (mensalidades, cursos, produtos), você está restrito pela lei (Art. 52, § 1° do CDC): a multa máxima permitida para atraso é de <strong>2% (dois por cento)</strong> e os juros de mora não devem ultrapassar <strong>1% ao mês</strong>, a menos que estipulado diversamente em contratos específicos permitidos por lei.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Cálculo Pro Rata Die (Juros Diários)
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O termo <em>pro rata die</em> significa "proporcional ao dia". Quando o cliente atrasa 5 dias, você não cobra o juro cheio do mês, mas sim a fração diária. Com um juro padrão de 1% ao mês, a taxa diária é de aproximadamente 0,0333%. Ao preencher a nossa calculadora com os dias de atraso e a taxa mensal, ela converte e aplica exatamente os juros pro rata die de forma correta.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Calcular Descontos Percentuais
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Na negociação com fornecedores ou clientes, saber calcular um desconto rápido é fundamental. O percentual de desconto é transformado numa fração decimal e multiplicado pelo valor base. Por exemplo, conceder um abatimento por pagamento antecipado em um Recibo Simples de prestação de serviço garantirá rapidez e menos inadimplência.</p>
              </div>
            
              </div>
            </article>

            <hr className="border-gray-100" />

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                Perguntas Frequentes (FAQ)
              </h2>
              <div className="space-y-4">
                {[
                  {
                    question: "Qual é o limite de multa por atraso permitido por lei?",
                    answer: "De acordo com o Código de Defesa do Consumidor (CDC), para relações de consumo, a multa de mora por atraso de pagamento não pode ser superior a <strong>2% do valor da prestação</strong>. Para contratos entre empresas (B2B) e condomínios, outras regras podem se aplicar (frequentemente 2% também)."
                  },
                  {
                    question: "O que são juros de mora 'pro rata die'?",
                    answer: "São os juros cobrados de forma proporcional aos dias de atraso. Normalmente o limite legal (sem contrato específico) é de 1% ao mês. Assim, divide-se 1% por 30 dias para encontrar a taxa diária (0,033% ao dia) e multiplica-se pelos dias corridos em atraso."
                  },
                  {
                    question: "Como funciona o cálculo do desconto?",
                    answer: "A ferramenta pega o valor percentual, divide por 100 e multiplica pelo valor base. Por exemplo: um desconto de 15% sobre R$ 200 é igual a 0,15 * 200 = R$ 30, gerando um preço final de R$ 170."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-emerald-200 bg-white"
                  >
                    <button
                      type="button"
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-emerald-50/50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}