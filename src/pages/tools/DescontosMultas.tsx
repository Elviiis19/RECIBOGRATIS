import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Percent } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function DescontosMultas() {
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
        title="Calculadora de Desconto, Acréscimo e Multas Online"
        description="Calcule facilmente porcentagens de desconto, acréscimos, juros e multas sobre qualquer valor ou boleto."
        keywords="calculadora desconto, calcular juros boleto, porcentagem multa, acrescimo online"
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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como calcular Descontos, Acréscimos e Multas?</h2>
          <p>Seja para aplicar uma promoção na venda do seu produto corporativo, ou para aplicar <strong>multas por atraso</strong> no pagamento de aluguéis e boletos, nossa calculadora resolve a matemática da porcentagem de forma instantânea sem precisar de fórmulas em planilhas do Excel.</p>

          <h3>Cálculo de Desconto Comercial</h3>
          <p>Dar desconto é uma prática excelente de marketing e retenção. Se você vende uma consultoria ou produto por <strong>R$ 1.500,00</strong>, e deseja aplicar uma condição à vista concedendo um desconto de <strong>15%</strong>. A calculadora mostrará exatamente o valor final: a dedução será de R$ 225,00, gerando um pagamento líquido para você de R$ 1.275,00.</p>

          <h3>Cálculo de Multas em Boletos ou Recibos em Atraso</h3>
          <p>Por lei (Código de Defesa do Consumidor brasileiro), a multa máxima por atraso em boletos e faturas de cartão de crédito e mensalidades escolares, referentes a fornecimento regular de produtos e serviços <strong>não pode exceder a marca de 2% do valor da prestação</strong>. O juros de mora usual costuma ser limitado a 1% ao mês (aplicado pro-rata dependendo dos dias de atraso). Ao utilizar a calculadora para Multa (Acréscimo), você tem plena segurança de gerar o boleto corrigido correto para seu cliente sem ferir leis de proteção e combate a usura.</p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual a diferença entre Acréscimo e Juros?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Um <strong>acréscimo</strong> ou <strong>multa</strong> geralmente é fixo – incide assim que a data passou. Já os <strong>juros moratórios</strong> são variáveis de acordo com o tempo (a taxa vai aumentando, ex: juros diários). Para calcular a multa fixa de um boleto de aluguel por exemplo (10%), basta na nossa calculadora digitar o valor daquele mês e aplicar acréscimo "10".
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Posso cobrar multa acima de 2% no Brasil?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Segundo o Código de Defesa do Consumidor (Art. 52, § 1º), nas relações de consumo gerais (escola, internet, plano de saúde), as multas de mora não poderão ser superiores a <strong>2% (dois por cento)</strong>. Excetuam-se contratos específicos (como taxa condominial que tem regra própria no Código Civil onde a multa pode ser estipulada diferentemente) e locações de imóveis, que se regem pela Lei do Inquilinato (onde a multa moratória pactuada em contrato – como os comuns 10% – prevalece e é permitida, já que não é relação de consumo).
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
