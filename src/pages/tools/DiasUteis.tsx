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
        title="Calculadora de Dias Úteis, Feriados e Prazos de Entrega"
        description="Calcule a diferença de dias úteis entre datas ou some prazos a uma data inicial. Ferramenta online grátis que considera finais de semana (sábados e domingos)."
        keywords="calculadora de dias uteis, somar dias uteis, prazo de entrega, calcular diferenca em dias uteis, calendario dias uteis, dias corridos"
        schema={`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Sábado conta como dia útil?","acceptedAnswer":{"@type":"Answer","text":"Depende. Para questões bancárias e prazos processuais e de entrega da maioria das transportadoras, sábado <strong>não</strong> é considerado dia útil. Contudo, para fins trabalhistas e pagamento de salário de algumas categorias, o sábado pode ser considerado dia útil."}},{"@type":"Question","name":"O que acontece quando o prazo de pagamento cai no final de semana?","acceptedAnswer":{"@type":"Answer","text":"Geralmente, quando o vencimento de um boleto ou fatura cai num sábado, domingo ou feriado bancário, o pagamento pode ser efetuado no <strong>primeiro dia útil subsequente</strong>, sem acréscimo de juros ou multas (Lei 7.089/1983)."}},{"@type":"Question","name":"Como funciona o cálculo de adição de prazos?","acceptedAnswer":{"@type":"Answer","text":"Se um contrato prevê entrega em '15 dias úteis', a calculadora começa na data inicial e avança 15 dias, pulando automaticamente todos os sábados e domingos para encontrar a data exata da entrega ou vencimento final."}}]}`}
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
                  <p className="text-5xl font-extrabold text-emerald-700">{uteis}</p>
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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Por que Calcular Diferenças de Dias Úteis?</h2>
<p>A <strong>Calculadora de Dias Úteis</strong> é muito utilizada nas operações corporativas, logística, contabilidade e rotinas bancárias para definir prazos exatos que desconsideram sábados e domingos. Com ela, você não perderá a contagem ao prometer uma entrega de serviço para "dez dias úteis" ou programar vencimentos nos recibos e promissórias.</p>

<h3>Contagem de Prazos Bancários e Comerciais</h3>
<p>Nas negociações em que se usa recibos (como na emissão de um <a href="/nota-promissoria">Recibo de Sinal e Arras</a>), o prazo para integralização muitas vezes é atrelado a <strong>dias úteis</strong>. Quando boletos caem em finais de semana, a legislação brasileira garante a postergação para o primeiro dia de expediente bancário seguinte.</p>

<h3>Prazos Corridos x Prazos Úteis</h3>
<p>Seja transparente com seus clientes: diferencie o termo "dias corridos" (onde a contagem não para no final de semana) e "dias úteis". Contratos longos (30, 60, 90 dias) costumam usar dias corridos. Já entregas de e-commerce e processamentos de transferência financeira (TED/DOC, liquidação de boletos) operam restritamente sobre os dias úteis.</p>
          
          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4 not-prose mt-6">

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Sábado conta como dia útil?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Depende. Para questões bancárias e prazos processuais e de entrega da maioria das transportadoras, sábado <strong>não</strong> é considerado dia útil. Contudo, para fins trabalhistas e pagamento de salário de algumas categorias, o sábado pode ser considerado dia útil.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que acontece quando o prazo de pagamento cai no final de semana?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Geralmente, quando o vencimento de um boleto ou fatura cai num sábado, domingo ou feriado bancário, o pagamento pode ser efetuado no <strong>primeiro dia útil subsequente</strong>, sem acréscimo de juros ou multas (Lei 7.089/1983).` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Como funciona o cálculo de adição de prazos?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `Se um contrato prevê entrega em '15 dias úteis', a calculadora começa na data inicial e avança 15 dias, pulando automaticamente todos os sábados e domingos para encontrar a data exata da entrega ou vencimento final.` }} />
            </details>
          </div>
        </div>
      </div>
    </>
  );
}