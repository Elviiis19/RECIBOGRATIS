import {  useState  } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Calculator, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function RetencaoImpostos() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [valorBruto, setValorBruto] = useState('');
  const [issPerc, setIssPerc] = useState('5');
  const [includesPISCOFINS, setIncludesPISCOFINS] = useState(false);
  const [includesIRRF, setIncludesIRRF] = useState(false);
  const [includesINSS, setIncludesINSS] = useState(false);

  const formatCurrencyInput = (val: string) => {
    let cleanVal = val.replace(/\D/g, '');
    if (cleanVal.length === 0) return '';
    cleanVal = cleanVal.padStart(3, '0');
    const integerPart = cleanVal.slice(0, -2);
    const decimalPart = cleanVal.slice(-2);
    const formattedInteger = parseInt(integerPart, 10).toLocaleString('pt-BR');
    return `${formattedInteger},${decimalPart}`;
  };

  const parseCurrency = (val: string) => {
    return parseFloat(val.replace(/\./g, '').replace(',', '.') || '0');
  };

  const numericBruto = parseCurrency(valorBruto);
  const issParsed = parseFloat(issPerc) || 0;
  
  const pcc = includesPISCOFINS && numericBruto >= 215.05 ? numericBruto * 0.0465 : 0;
  // Regra INSS: 11% (simplificado pf/pj autonomo)
  const inss = includesINSS ? numericBruto * 0.11 : 0;
  // Regra IRRF: 1.5%
  const irrf = includesIRRF && numericBruto >= 666.66 ? numericBruto * 0.015 : 0;
  // ISS
  const iss = (numericBruto * issParsed) / 100;

  const totalDeducoes = pcc + inss + irrf + iss;
  const valorLiquido = numericBruto - totalDeducoes;

  return (
    <>
      <SEO 
        title="Calculadora de Retenção de Impostos (IRRF, INSS, ISS, PCC) - Grátis"
        description="Calcule impostos retidos na fonte (IRRF, INSS, ISS e PCC) de notas fiscais e RPA de forma automática. Simule o valor líquido exato para emissão de recibos."
        keywords="calculadora retencao de impostos, calcular iss inss irrf, pis cofins csll retencao, calcular rpa, nota fiscal valor liquido, recibo pj, nota fiscal de servico"
        
      />
      
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Calculadora de Retenção de Impostos</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Simule o valor líquido de Notas Fiscais ou Recibos RPA com cálculos precisos de retenção na fonte.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Dados do Pagamento</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Valor Bruto (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">R$</span>
                  <input
                    type="text"
                    value={valorBruto}
                    onChange={(e) => setValorBruto(formatCurrencyInput(e.target.value))}
                    placeholder="0,00"
                    className="w-full pl-10 pr-3 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Alíquota ISS (%)</label>
                <select 
                  value={issPerc} 
                  onChange={(e) => setIssPerc(e.target.value)}
                  className="w-full px-3 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="0">0% (Isento/Retido)</option>
                  <option value="2">2%</option>
                  <option value="3">3%</option>
                  <option value="4">4%</option>
                  <option value="5">5%</option>
                </select>
              </div>

              <div className="pt-4 space-y-3">
                <p className="font-semibold text-gray-900 text-sm">Aplicar Impostos (PJ ou RPA)</p>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={includesPISCOFINS} onChange={(e) => setIncludesPISCOFINS(e.target.checked)} className="w-5 h-5 text-emerald-700 rounded" />
                  <span className="text-gray-700">PIS/COFINS/CSLL (4,65%) via CSRF</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={includesIRRF} onChange={(e) => setIncludesIRRF(e.target.checked)} className="w-5 h-5 text-emerald-700 rounded" />
                  <span className="text-gray-700">IRRF PJ (1,5%)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={includesINSS} onChange={(e) => setIncludesINSS(e.target.checked)} className="w-5 h-5 text-emerald-700 rounded" />
                  <span className="text-gray-700">INSS (11%)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col justify-center">
            <h3 className="text-gray-400 font-medium uppercase tracking-wider text-sm mb-4">Resultado da Retenção</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-300">Valor Bruto</span>
                <span className="font-medium">R$ {formatCurrency(numericBruto.toFixed(2).replace('.', ','))}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-300">ISS</span>
                <span className="font-medium text-red-400">- R$ {formatCurrency(iss.toFixed(2).replace('.', ','))}</span>
              </div>
              {includesPISCOFINS && (
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-300">PIS/COFINS/CSLL</span>
                  <span className="font-medium text-red-400">- R$ {formatCurrency(pcc.toFixed(2).replace('.', ','))}</span>
                </div>
              )}
              {includesIRRF && (
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-300">IRRF</span>
                  <span className="font-medium text-red-400">- R$ {formatCurrency(irrf.toFixed(2).replace('.', ','))}</span>
                </div>
              )}
              {includesINSS && (
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-300">INSS</span>
                  <span className="font-medium text-red-400">- R$ {formatCurrency(inss.toFixed(2).replace('.', ','))}</span>
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-xl p-6 text-center shadow-inner">
              <p className="text-gray-400 text-sm mb-1">Valor Líquido a Receber</p>
              <p className="text-4xl font-bold text-emerald-400">
                R$ {formatCurrency(valorLiquido.toFixed(2).replace('.', ','))}
              </p>
            </div>
          </div>
        </div>

        <AdSense />
        
                    </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que são impostos retidos na fonte?","acceptedAnswer":{"@type":"Answer","text":"São tributos que a empresa contratante deve descontar do valor pago ao prestador de serviços e recolher diretamente aos cofres públicos. O prestador recebe o valor 'líquido', descontados esses impostos."}},{"@type":"Question","name":"O que é PCC (PIS, COFINS, CSLL)?","acceptedAnswer":{"@type":"Answer","text":"PCC é a sigla para a retenção conjunta de PIS (0,65%), COFINS (3,0%) e CSLL (1,0%), totalizando 4,65% aplicados sobre serviços profissionais prestados por Pessoas Jurídicas (dependendo das regras da Receita Federal)."}},{"@type":"Question","name":"Empresas do Simples Nacional sofrem retenção de IRRF e PCC?","acceptedAnswer":{"@type":"Answer","text":"Via de regra, prestadores de serviço optantes pelo Simples Nacional <strong>estão dispensados</strong> da retenção na fonte do IRRF e do PCC (PIS/COFINS/CSLL). O ISS e o INSS, no entanto, podem sofrer retenções dependendo da atividade e legislação municipal."}}]}` }} />
      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Funciona a Retenção de Impostos na Fonte?
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>A retenção na fonte é um mecanismo onde o governo antecipa o recebimento de impostos. Em vez de o prestador de serviços (autônomo ou empresa) pagar os impostos no final do mês ou do ano, a empresa que o contratou efetua o desconto já no momento do pagamento e repassa esse valor ao governo. A nossa calculadora gratuita ajuda a simular o <strong>valor líquido</strong> exato da sua Nota Fiscal ou Recibo de Pagamento Autônomo (RPA).</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                O que significa IRRF, INSS, ISS e PCC?
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <ul>
                  <li><strong>IRRF (Imposto de Renda Retido na Fonte):</strong> Retido na fonte tanto para pessoas físicas quanto jurídicas (em atividades específicas). As alíquotas variam de 1% a 1,5% para empresas.</li>
                  <li><strong>INSS:</strong> Contribuição previdenciária. No caso de serviços entre Pessoas Jurídicas (cessão de mão de obra), costuma ser de 11%. Para RPA, varia conforme as tabelas vigentes.</li>
                  <li><strong>ISS (Imposto Sobre Serviços):</strong> É o imposto municipal, com alíquotas que variam entre 2% e 5%, dependendo da cidade e do tipo de serviço. Pode ser retido pelo tomador dependendo da localidade de prestação.</li>
                  <li><strong>PCC:</strong> Refere-se à contribuição social retida unificadamente na alíquota de 4,65%, que engloba PIS, COFINS e CSLL (aplica-se a serviços profissionais).</li>
                </ul>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Calcular o Valor Líquido da Nota Fiscal
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O valor líquido a receber é calculado subtraindo o total das retenções aplicáveis do valor bruto dos serviços. Exemplo: para um serviço de R$ 10.000,00 onde há 4,65% de PCC (R$ 465,00) e 1,5% de IRRF (R$ 150,00), o valor líquido depositado será de R$ 9.385,00.</p>
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
                    question: "O que são impostos retidos na fonte?",
                    answer: "São tributos que a empresa contratante deve descontar do valor pago ao prestador de serviços e recolher diretamente aos cofres públicos. O prestador recebe o valor 'líquido', descontados esses impostos."
                  },
                  {
                    question: "O que é PCC (PIS, COFINS, CSLL)?",
                    answer: "PCC é a sigla para a retenção conjunta de PIS (0,65%), COFINS (3,0%) e CSLL (1,0%), totalizando 4,65% aplicados sobre serviços profissionais prestados por Pessoas Jurídicas (dependendo das regras da Receita Federal)."
                  },
                  {
                    question: "Empresas do Simples Nacional sofrem retenção de IRRF e PCC?",
                    answer: "Via de regra, prestadores de serviço optantes pelo Simples Nacional <strong>estão dispensados</strong> da retenção na fonte do IRRF e do PCC (PIS/COFINS/CSLL). O ISS e o INSS, no entanto, podem sofrer retenções dependendo da atividade e legislação municipal."
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