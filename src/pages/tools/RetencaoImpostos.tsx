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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como funcionam as retenções na fonte?</h2>
          <p>
            A retenção de impostos na fonte ocorre quando a legislação determina que o tomador de um serviço (quem paga)
            é o responsável por descontar o imposto do prestador (quem recebe) e recolher diretamente ao Governo.
          </p>
          <p>
            Para pagamentos entre Pessoas Jurídicas (PJ), serviços como engenharia, limpeza, manutenção, consultoria,
            softwares ou assemelhados costumam sofrer retenção das Contribuições Sociais (PIS/COFINS/CSLL), IRRF, INSS e ISS.
          </p>
          <p className="text-sm text-gray-500 italic mt-4">* As alíquotas simuladas são as comumente praticadas para serviços em geral no Brasil. Recomendamos validação com seu contador.</p>
        </div>
      </div>
    </>
  );
}
