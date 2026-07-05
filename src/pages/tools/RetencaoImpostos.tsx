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
        title="Calculadora de Retenção de Impostos (IRRF, INSS, ISS, PCC) - Grátis"
        description="Calcule impostos retidos na fonte (IRRF, INSS, ISS e PCC) de notas fiscais e RPA de forma automática. Simule o valor líquido exato para emissão de recibos."
        keywords="calculadora retencao de impostos, calcular iss inss irrf, pis cofins csll retencao, calcular rpa, nota fiscal valor liquido, recibo pj, nota fiscal de servico"
        schema={`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que são impostos retidos na fonte?","acceptedAnswer":{"@type":"Answer","text":"São tributos que a empresa contratante deve descontar do valor pago ao prestador de serviços e recolher diretamente aos cofres públicos. O prestador recebe o valor 'líquido', descontados esses impostos."}},{"@type":"Question","name":"O que é PCC (PIS, COFINS, CSLL)?","acceptedAnswer":{"@type":"Answer","text":"PCC é a sigla para a retenção conjunta de PIS (0,65%), COFINS (3,0%) e CSLL (1,0%), totalizando 4,65% aplicados sobre serviços profissionais prestados por Pessoas Jurídicas (dependendo das regras da Receita Federal)."}},{"@type":"Question","name":"Empresas do Simples Nacional sofrem retenção de IRRF e PCC?","acceptedAnswer":{"@type":"Answer","text":"Via de regra, prestadores de serviço optantes pelo Simples Nacional <strong>estão dispensados</strong> da retenção na fonte do IRRF e do PCC (PIS/COFINS/CSLL). O ISS e o INSS, no entanto, podem sofrer retenções dependendo da atividade e legislação municipal."}}]}`}
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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como Funciona a Retenção de Impostos na Fonte?</h2>
<p>A retenção na fonte é um mecanismo onde o governo antecipa o recebimento de impostos. Em vez de o prestador de serviços (autônomo ou empresa) pagar os impostos no final do mês ou do ano, a empresa que o contratou efetua o desconto já no momento do pagamento e repassa esse valor ao governo. A nossa calculadora gratuita ajuda a simular o <strong>valor líquido</strong> exato da sua Nota Fiscal ou Recibo de Pagamento Autônomo (RPA).</p>

<h3>O que significa IRRF, INSS, ISS e PCC?</h3>
<ul>
<li><strong>IRRF (Imposto de Renda Retido na Fonte):</strong> Retido na fonte tanto para pessoas físicas quanto jurídicas (em atividades específicas). As alíquotas variam de 1% a 1,5% para empresas.</li>
<li><strong>INSS:</strong> Contribuição previdenciária. No caso de serviços entre Pessoas Jurídicas (cessão de mão de obra), costuma ser de 11%. Para RPA, varia conforme as tabelas vigentes.</li>
<li><strong>ISS (Imposto Sobre Serviços):</strong> É o imposto municipal, com alíquotas que variam entre 2% e 5%, dependendo da cidade e do tipo de serviço. Pode ser retido pelo tomador dependendo da localidade de prestação.</li>
<li><strong>PCC:</strong> Refere-se à contribuição social retida unificadamente na alíquota de 4,65%, que engloba PIS, COFINS e CSLL (aplica-se a serviços profissionais).</li>
</ul>

<h2>Como Calcular o Valor Líquido da Nota Fiscal</h2>
<p>O valor líquido a receber é calculado subtraindo o total das retenções aplicáveis do valor bruto dos serviços. Exemplo: para um serviço de R$ 10.000,00 onde há 4,65% de PCC (R$ 465,00) e 1,5% de IRRF (R$ 150,00), o valor líquido depositado será de R$ 9.385,00.</p>
          
          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4 not-prose mt-6">

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que são impostos retidos na fonte?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `São tributos que a empresa contratante deve descontar do valor pago ao prestador de serviços e recolher diretamente aos cofres públicos. O prestador recebe o valor 'líquido', descontados esses impostos.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que é PCC (PIS, COFINS, CSLL)?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `PCC é a sigla para a retenção conjunta de PIS (0,65%), COFINS (3,0%) e CSLL (1,0%), totalizando 4,65% aplicados sobre serviços profissionais prestados por Pessoas Jurídicas (dependendo das regras da Receita Federal).` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Empresas do Simples Nacional sofrem retenção de IRRF e PCC?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Via de regra, prestadores de serviço optantes pelo Simples Nacional <strong>estão dispensados</strong> da retenção na fonte do IRRF e do PCC (PIS/COFINS/CSLL). O ISS e o INSS, no entanto, podem sofrer retenções dependendo da atividade e legislação municipal.` }} />
            </details>
          </div>
        </div>
      </div>
    </>
  );
}