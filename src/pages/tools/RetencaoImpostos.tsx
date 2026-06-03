import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Calculator } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function RetencaoImpostos() {
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
        title="Calculadora de Retenção de Impostos (IRRF, INSS, ISS e PCC)"
        description="Calcule online as retenções de impostos na fonte (IRRF, INSS, ISS, PIS/COFINS/CSLL) para prestação de serviços. Gere o valor líquido de notas fiscais e recibos."
        keywords="calculadora retenção impostos, calcular iss inss irrf, pis cofins csll retencao, nota fiscal valor liquido, recibo pj"
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
                  <input type="checkbox" checked={includesPISCOFINS} onChange={(e) => setIncludesPISCOFINS(e.target.checked)} className="w-5 h-5 text-emerald-600 rounded" />
                  <span className="text-gray-700">PIS/COFINS/CSLL (4,65%) via CSRF</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={includesIRRF} onChange={(e) => setIncludesIRRF(e.target.checked)} className="w-5 h-5 text-emerald-600 rounded" />
                  <span className="text-gray-700">IRRF PJ (1,5%)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={includesINSS} onChange={(e) => setIncludesINSS(e.target.checked)} className="w-5 h-5 text-emerald-600 rounded" />
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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como usar a calculadora de retenção de impostos?</h2>
          <p>Nossa <strong>calculadora de retenção de impostos online</strong> permite saber exatamente o valor líquido de uma nota fiscal ou Recibo de Pagamento de Autônomo (RPA). Para usá-la, basta inserir o <strong>Valor Bruto (R$)</strong> do serviço prestado (o total da nota fiscal) no campo indicado. Em seguida, selecione a <strong>Alíquota ISS (%)</strong> do seu município (que pode variar de isento até 5%). Depois, marque as caixas de seleção que se aplicam ao perfil da sua empresa perante o tomador:</p>
          <ul>
            <li>Marque <strong>PIS/COFINS/CSLL (4,65%)</strong> se o serviço exigir retenção do CSRF.</li>
            <li>Marque <strong>IRRF PJ (1,5%)</strong> para antecipação de imposto de renda da pessoa jurídica.</li>
            <li>Marque <strong>INSS (11%)</strong> para prestação autônoma sujeita à tabela ou empresas enquadradas com cessão de mão de obra.</li>
          </ul>

          <h2>O que é a Retenção de Impostos na Fonte para PJ e Autônomos?</h2>
          <p>
            A <strong>retenção de impostos na fonte</strong> é uma obrigação tributária e um mecanismo de arrecadação onde a fonte pagadora (a empresa tomadora que contrata o serviço) torna-se legalmente responsável por realizar o desconto do imposto devido no exato momento da transferência do pagamento. O tomador irá pagar o valor líquido na sua conta e recolher as guias federais e municipais diretamente aos cofres públicos (União ou Município). Isso assegura ao governo antecipar o pagamento de tributos e blindar as contas contra sonegação fiscal.
          </p>
          
          <h3>Principais Impostos Retidos na Prestação de Serviços (PJ - Lucro Presumido/Real)</h3>
          <ul>
            <li><strong>IRRF (Imposto de Renda Retido na Fonte):</strong> A alíquota mais corriqueira para serviços de natureza profissional (consultoria corporativa, tecnologia, medicina, assistência jurídica, honorários contábeis) é fixa em <strong>1,5%</strong>. A retenção do IRRF só atinge a obrigatoriedade se o valor calculado do imposto retido for igual ou superior a R$ 10,00 (que recai em Notas Fiscais com valor bruto acima de R$ 666,66).</li>
            <li><strong>CRSF (Contribuições Retidas na Fonte) ou PIS, COFINS e CSLL:</strong> Conhecida popularmente pelo percentual aglutinado de <strong>4,65%</strong>. Incide rigorosamente em pagamentos cujo serviço envolva limpeza, conservação, segurança, bem como atividades essenciais de natureza profissional listados no Regulamento do Imposto de Renda. A retenção é aplicada para notas fiscais a partir de R$ 215,05 diários.</li>
            <li><strong>ISS (Imposto Sobre Serviços de Qualquer Natureza):</strong> Tributo direto municipal. As alíquotas de base legal flutuam de <strong>2% a 5%</strong>, a depender majoritariamente do enquadramento e codificação do serviço registrado no município de origem (prestador) ou no destino em que efetivamente ocorreu os serviços (tomador).</li>
            <li><strong>INSS (Instituto Nacional do Seguro Social):</strong> Para as obrigações que fecham serviços via Cessão de Mão de Obra e empreitadas de construção civil, a retenção patronal de praxe perfaz <strong>11%</strong> calculados sobre o valor global do documento.</li>
          </ul>

          <h3>Como calcular o valor de impostos de recibo RPA?</h3>
          <p>O <strong>RPA (Recibo de Pagamento a Autônomo)</strong> é o instrumento emitido quando uma empresa formal contrata e contrata uma Pessoa Física sem manter nenhum tipo de vínculo pela CLT. Nesse caso, incide uma alta carga de retenções. A empresa efetua os descontos baseados na tabela de faixa progressiva mensal do <strong>IRPF (de 0% a 27,5%)</strong> e o teto limite do <strong>INSS (geralmente fixado em 11% a 20%)</strong>. Usa-se a calculadora acima ativando a flag de INSS no montante combinado de boca e abater as rubricas para entregar o recibo de RPA do autônomo corretamente líquido.</p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Empresas do Simples Nacional sofrem retenção na fonte de retenções federais?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Na vasta maioria e como regra universal básica, <strong>NÃO</strong>. Empresas jurídicas (ME/EPP) optantes legítimas pelo regime simplificado do Simples Nacional são declaradamente isentas e desobrigadas da retenção do imposto originário do IRRF (1,5%) e das Retenções das Contribuições Sociais (PIS/COFINS/CSLL a 4,65%). Contudo, dependendo do Anexo e tipo de serviço, podem sofrer integralmente a retenção do <strong>ISS</strong>, caso o recolhimento deva ser no município da prestação do serviço por normativa local de onde ocorreu, além de casos severamente isolados atrelados à cessão de mão de obra (INSS).
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual o limite e valor mínimo para reter IRRF na nota fiscal de prestação de serviços?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O Governo Federal normatizou e isenta expressamente da retenção notas em que o valor do DARF apurado a ser recolhido seja estritamente inferior a R$ 10,00 reais. Com base nessa matemática fiscal simples, ao aplicar a alíquota de teto em 1,5%, entende-se que a retenção do IR só deve ocorrer se a soma na nota fiscal de serviço ultrapassar o teto bruto de <strong>R$ 666,66</strong>. Sob essa ótica se você emitir nota de R$ 500, o IRRF geraria exatos R$ 7,50, logo não deve ocorrer e nem incidir o desconto no papel, caindo o valor bruto ileso no caixa.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                A quem eu cobro os impostos retidos na fonte e porque o tomador não pagou o total?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Você não cobra esse ônus e não sofre nenhum prejuízo monetário real. O imposto retido diretamente na fonte pelo cliente não é uma penalidade, mas é legalmente tratado à luz do regime fiscal como <strong>uma antecipação tributária</strong> da sua carga tributária final a do fim do mês. O seu tomador credita religiosamente o valor líquido perante à sua conta-corrente, pega e reserva a parte do imposto deduzido por ter se apropriado da obrigação principal como substituto federal e recolhe em guia avulsa atrelando informativamente o seu CNPJ. Quando a sua assessoria processar e compensar os DARFs fechando a declaração mensal para calcular as parcelas devidas globais de IR e PIS COFINS, deve compensar todas essas notas já deduzidas pelos seus clientes; minimizando assim a conta pesada ao não gerar tributação dobrada na bitributação sistêmica.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
