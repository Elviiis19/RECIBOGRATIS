import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function MaquininhaCartao() {
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
        title="Calculadora de Taxa da Maquininha (Repasse para Cliente)"
        description="Descubra quanto cobrar no cartão de crédito/débito para receber exatamente o valor que você deseja repassando a taxa da maquininha."
        keywords="calcular taxa maquininha, repassar juros cliente, valor a cobrar cartao, maquininha stone pagseguro mercado pago"
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
                    E irá sobrar para você: <span className="text-emerald-600 font-bold">R$ {formatCurrency(valorLiquido.toFixed(2).replace('.', ','))}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdSense />
      </div>
    </>
  );
}
