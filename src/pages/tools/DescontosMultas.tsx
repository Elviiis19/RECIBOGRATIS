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
      </div>
    </>
  );
}
