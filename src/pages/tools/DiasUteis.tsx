import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { CalendarDays } from 'lucide-react';

export function DiasUteis() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const calcularDias = () => {
    if (!dataInicio || !dataFim) return { uteis: 0, correntes: 0 };
    
    const start = new Date(dataInicio);
    const end = new Date(dataFim);
    
    // Check invalid date
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return { uteis: 0, correntes: 0 };
    }
    
    // Corrige para o meio-dia UTC para evitar problemas de fuso horário
    start.setUTCHours(12, 0, 0, 0);
    end.setUTCHours(12, 0, 0, 0);
    
    let diasCorrentes = 0;
    let diasUteis = 0;
    
    let currentDate = new Date(start);
    while (currentDate <= end) {
      diasCorrentes++;
      const diaSemana = currentDate.getUTCDay();
      // 0 = Domingo, 6 = Sábado
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasUteis++;
      }
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    
    // Subtrair 1 porque incluímos a data de início inteira. Apenas se quiser a diferença.
    // Em contagem de prazos, geralmente a diferença é diasCorrentes - 1. (ex: dia 10 a 11 = 1 dia)
    return { uteis: Math.max(0, diasUteis - 1), correntes: Math.max(0, diasCorrentes - 1) };
  };

  const { uteis, correntes } = calcularDias();

  return (
    <>
      <SEO 
        title="Calculadora de Dias Úteis e Correntes Online"
        description="Contagem precisa de dias úteis e correntes entre duas datas para cálculos de multas, juros de boletos e prazos de entrega ou licitações."
        keywords="calcular dias uteis, diferenca entre datas, dias correntes, prazo boleto"
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <CalendarDays className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Calculadora de Diferença de Datas</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Descubra a quantidade exata de dias úteis e correntes entre dois períodos para prazos legais.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Data Inicial</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Data Final</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {(dataInicio && dataFim && uteis > 0) ? (
            <div className="bg-emerald-50 rounded-2xl p-6 border flex flex-col items-center">
              <div className="w-full flex justify-around">
                <div className="text-center">
                  <p className="text-emerald-800 text-sm font-bold mb-1">Dias Correntes</p>
                  <p className="text-5xl font-extrabold text-blue-800">{correntes}</p>
                </div>
                <div className="text-center">
                  <p className="text-emerald-800 text-sm font-bold mb-1">Dias Úteis</p>
                  <p className="text-5xl font-extrabold text-emerald-600">{uteis}</p>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-center text-gray-500 p-6 border border-dashed rounded-xl">
               Preencha as duas datas corretamente.
             </div>
          )}
        </div>

        <AdSense />
      </div>
    </>
  );
}
