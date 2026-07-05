import {  useState  } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { CreditCard, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, Calculator } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function MaquininhaCartao() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [valorDesejado, setValorDesejado] = useState('');
  const [taxa, setTaxa] = useState('');

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

  const valorLiquido = parseCurrency(valorDesejado);
  const taxaNum = parseCurrency(taxa) / 100;
  
  // Fórmula de Repasse: Valor a Cobrar = Valor Desejado / (1 - taxa)
  const cobrarDoCliente = 1 - taxaNum > 0 ? valorLiquido / (1 - taxaNum) : 0;
  const diferencaTx = cobrarDoCliente - valorLiquido;

  return (
    <>
      <SEO 
        title="Calculadora de Taxas de Maquininha de Cartão - Quanto Receber?"
        description="Descubra quanto você vai receber ou quanto deve cobrar do cliente para repassar as taxas da maquininha de cartão (Stone, PagSeguro, Mercado Pago, etc)."
        keywords="calculadora maquininha, calcular taxa cartao, repassar taxa cartao, desconto maquininha, simulador maquininha de cartao"
        
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <CreditCard className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Taxas da Maquininha</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Descubra quanto cobrar do seu cliente para não sair no prejuízo e receber o valor exato.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Valor Líquido Desejado (R$)</label>
                <input
                  type="text"
                  value={valorDesejado}
                  onChange={(e) => setValorDesejado(formatCurrencyInput(e.target.value))}
                  placeholder="Ex: 100,00"
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Taxa da Maquininha (%)</label>
                <input
                  type="text"
                  value={taxa}
                  onChange={(e) => setTaxa(formatCurrencyInput(e.target.value))}
                  placeholder="Ex: 4,99"
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border flex flex-col justify-center">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-4">Solução</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Você deve cobrar na maquininha:</p>
                  <p className="text-3xl font-extrabold text-blue-700">R$ {formatCurrency(cobrarDoCliente.toFixed(2).replace('.', ','))}</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700">
                    A maquininha vai descontar: <span className="text-red-500 font-bold">R$ {formatCurrency(diferencaTx.toFixed(2).replace('.', ','))}</span>
                  </p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    E irá sobrar para você: <span className="text-emerald-700 font-bold">R$ {formatCurrency(valorLiquido.toFixed(2).replace('.', ','))}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdSense />
        
                    </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"É legal repassar a taxa da maquininha para o cliente?","acceptedAnswer":{"@type":"Answer","text":"Sim. A Lei 13.455/2017 autorizou a diferenciação de preços de bens e serviços oferecidos ao público em função do prazo ou do instrumento de pagamento utilizado. Ou seja, você pode cobrar um valor diferente no PIX/dinheiro e no Cartão de Crédito."}},{"@type":"Question","name":"O que significa 'Descontar da Venda'?","acceptedAnswer":{"@type":"Answer","text":"Significa que o lojista vai absorver o custo da tarifa. Se a venda for R$ 100,00 com taxa de 5%, você recebe R$ 95,00 e a operadora do cartão fica com R$ 5,00. O cliente paga apenas R$ 100,00."}},{"@type":"Question","name":"Como repassar a taxa da maquininha garantindo que receberei o valor cheio?","acceptedAnswer":{"@type":"Answer","text":"Para você receber exatos R$ 100,00 com uma tarifa de 5%, você não pode simplesmente cobrar R$ 105,00, pois 5% de R$ 105,00 é R$ 5,25. Nossa calculadora faz a conta reversa (Valor / (1 - Taxa%)), resultando no preço de cobrança de R$ 105,26. Assim, ao deduzir 5%, sobram exatamente os R$ 100,00 para você."}}]}` }} />
      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Calcular as Taxas da Maquininha de Cartão
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>A <strong>Calculadora de Maquininha de Cartão</strong> é a ferramenta ideal para autônomos, MEIs e empreendedores simularem o impacto das tarifas cobradas por operadoras de cartão de crédito e débito (como PagSeguro, Stone, Mercado Pago, Cielo, SumUp, Ton) no seu fluxo de caixa.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Descontar da Venda vs Repassar a Taxa
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <ul>
                  <li><strong>Descontar (Assumir a Taxa):</strong> O cliente vê apenas o valor de etiqueta. Essa estratégia atrai o consumidor e evita atritos na hora da cobrança, mas reduz sua margem de lucro final. O empreendedor inteligente já inclui a taxa da maquininha no preço base (precificação embutida).</li>
                  <li><strong>Repassar (Cobrar do Cliente):</strong> Você garante que receberá a quantia exata que orçou, enquanto o cliente paga a tarifa financeira. É muito comum no comércio de veículos, materiais de construção e atacadistas, onde a margem é estreita.</li>
                </ul>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como a matemática de repasse funciona?
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Muitos empreendedores cometem o erro de apenas somar a taxa da operadora ao preço do produto. Exemplo errado: Produto de R$ 1.000 + 10% da maquininha = Cobrar R$ 1.100. Contudo, a operadora vai cobrar 10% sobre os R$ 1.100 (ou seja, R$ 110). Você acabará recebendo R$ 990 (prejuízo de R$ 10,00). O correto é usar o <strong>cálculo de markup (preço reverso)</strong> que nossa ferramenta faz automaticamente, informando que você precisa cobrar R$ 1.111,11.</p>
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
                    question: "É legal repassar a taxa da maquininha para o cliente?",
                    answer: "Sim. A Lei 13.455/2017 autorizou a diferenciação de preços de bens e serviços oferecidos ao público em função do prazo ou do instrumento de pagamento utilizado. Ou seja, você pode cobrar um valor diferente no PIX/dinheiro e no Cartão de Crédito."
                  },
                  {
                    question: "O que significa 'Descontar da Venda'?",
                    answer: "Significa que o lojista vai absorver o custo da tarifa. Se a venda for R$ 100,00 com taxa de 5%, você recebe R$ 95,00 e a operadora do cartão fica com R$ 5,00. O cliente paga apenas R$ 100,00."
                  },
                  {
                    question: "Como repassar a taxa da maquininha garantindo que receberei o valor cheio?",
                    answer: "Use o recurso 'Repassar ao cliente' em nossa calculadora. A fórmula matemática divide o valor desejado pelo fator multiplicador da taxa (ex: se a taxa é 5%, o fator é 0,95). Receber R$ 100 / 0,95 = Cobrar R$ 105,26. Assim, 5% de R$ 105,26 dá R$ 5,26 para a operadora, sobrando exatos R$ 100,00 para você."
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