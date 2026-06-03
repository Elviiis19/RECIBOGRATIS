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
          <h2>Entendendo a Retenção de Impostos na Fonte</h2>
          <p>
            A <strong>retenção de impostos na fonte</strong> é uma obrigação tributária onde a fonte pagadora (o cliente ou tomador do serviço) é responsável por descontar o imposto devido no momento do pagamento e recolhê-lo diretamente aos cofres públicos (União ou Município). Isso garante que o governo receba o imposto antecipadamente, reduzindo a sonegação fiscal.
          </p>
          
          <h3>Principais Impostos Retidos na Prestação de Serviços (PJ)</h3>
          <ul>
            <li><strong>IRRF (Imposto de Renda Retido na Fonte):</strong> A alíquota mais comum para serviços de natureza profissional (consultoria, engenharia, medicina, jurídica, honorários) é de <strong>1,5%</strong>. A retenção só é obrigatória se o valor do imposto retido for igual ou superior a R$ 10,00 (Nota fiscal acima de R$ 666,66).</li>
            <li><strong>CRSF / PIS, COFINS e CSLL (Retenção das Contribuições):</strong> Conhecida pelo percentual aglutinado de <strong>4,65%</strong>. Incide em notas fiscais acima de R$ 215,05 quando prestadas entre pessoas jurídicas cujo serviço envolva limpeza, conservação, manutenção, segurança, entre outros serviços profissionais art. 714 do RIR/2018.</li>
            <li><strong>ISS (Imposto Sobre Serviços de Qualquer Natureza):</strong> Tributo municipal. As alíquotas variam de <strong>2% a 5%</strong> dependendo da codificação do serviço e do município onde ocorreu. Em certas regras, o tomador retém e paga à prefeitura dele.</li>
            <li><strong>INSS:</strong> Para Cessão de Mão de Obra ou empreitadas, a retenção padrão costuma ser de <strong>11%</strong> sobre o valor bruto do documento.</li>
          </ul>

          <h3>Retenção na fonte para RPA (Autônomo Pessoa Física)</h3>
          <p>Quando uma empresa contrata uma pessoa física e paga através do <strong>RPA (Recibo de Pagamento a Autônomo)</strong>, ela também deve realizar as retenções federais (INSS e IRPF) baseado nas tabelas progressivas vigentes, e do ISS. Nosso sistema fornece uma estimativa de cálculo para fins de projeção do pagamento bruto ao tomador.</p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Empresas do Simples Nacional sofrem retenção na fonte?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Na maioria dos casos, <strong>NÃO</strong>. Empresas optantes pelo regime do Simples Nacional são isentas da retenção na fonte do IRRF (1,5%) e das Contribuições (PIS/COFINS/CSLL 4,65%). Contudo, dependendo do tipo de serviço, podem sofrer a retenção do <strong>ISS</strong> de acordo com a legislação do município e algumas retenções pontuais de INSS em cessão de mão de obra.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual o valor mínimo para reter IRRF na nota fiscal de serviços?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O Governo Federal isenta retenções cujo DARF a ser pago seja inferior a R$ 10,00. Assim, aplicando a alíquota de 1,5%, a retenção só deve ocorrer em valores de serviço acima de R$ 666,66. Se a nota for de R$ 500, o IRRF de R$ 7,50 não deve ser retido.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                A quem eu cobro os impostos retidos na fonte?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O imposto retido na fonte é tratado como <strong>antecipação tributária</strong>. O tomador do serviço credita na sua conta o valor líquido, e recolhe os DARFs em nome da sua empresa (CPF/CNPJ). Ao final do mês ou trimestre, na hora em que sua contabilidade apurar o imposto total devido pela sua empresa, aqueles valores retidos devem ser compensados para que você não pague duas vezes.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
