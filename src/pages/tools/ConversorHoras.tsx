import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function ConversorHoras() {
  const [horasPraticadas, setHorasPraticadas] = useState('');
  const [valorHora, setValorHora] = useState('');

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

  // Convert "HH:MM" para número decimal de horas
  const parseHoras = (timeStr: string) => {
    const [h, m] = timeStr.split(':');
    const hours = parseInt(h || '0', 10);
    const minutes = parseInt(m || '0', 10);
    return hours + (minutes / 60);
  };

  const horasNum = horasPraticadas.includes(':') ? parseHoras(horasPraticadas) : parseFloat(horasPraticadas || '0');
  const valorUnitNum = parseCurrency(valorHora);
  const valorTotal = horasNum * valorUnitNum;

  return (
    <>
      <SEO 
        title="Conversor de Horas Trabalhadas para Valor Online (Recibo)"
        description="Converter horas reais e minutos fechados no formato HH:MM para valor financeiro R$ (BRL). Facilita na hora de fechar a nota ou recibo mensal do freelancer."
        keywords="converter horas em reais, calculo horas trabalhadas, valor da hora freelancer, calculo hora pro rata"
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Conversor de Horas Trabalhadas</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Transforme cargas de horas mensais "HH:MM" e R$/hr no valor financeiro fechado para sua cobrança ou fechamento de folha.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Horas Trabalhadas (HH:MM ou Decimal)</label>
                <input
                  type="text"
                  value={horasPraticadas}
                  onChange={(e) => setHorasPraticadas(e.target.value)}
                  placeholder="Ex: 140:30 ou 140.5"
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Valor da Hora (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">R$</span>
                  <input
                    type="text"
                    value={valorHora}
                    onChange={(e) => setValorHora(formatCurrencyInput(e.target.value))}
                    placeholder="0,00"
                    className="w-full pl-10 pr-3 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border flex flex-col justify-center text-center">
               <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Salário Bruto / RPA</p>
               <p className="text-4xl font-extrabold text-emerald-700">
                  R$ {formatCurrency(valorTotal.toFixed(2).replace('.', ','))}
               </p>
               <p className="text-sm text-gray-500 mt-2">Corresponde a {horasNum.toFixed(2)} horas decimais.</p>
            </div>
          </div>
        </div>

        <AdSense />
      </div>
    </>
  );
}
