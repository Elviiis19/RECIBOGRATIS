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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como funciona a contagem de Prazos, Dias Úteis e Correntes?</h2>
          <p>Muitos serviços possuem "Acordos de Nível de Serviço" (SLAs de atendimento), prazos formais de postagem e envio no Ecommerce, bem como vencimentos e contagens processuais. É essencial entender a diferença legal e comercial entre um <strong>dia corrido (ou corrente)</strong> e um <strong>dia útil</strong> na matemática que forma a diferença de duas datas de um calendário gregoriano do ano atual e passado.</p>

          <h3>Contagem em Dias Correntes</h3>
          <p>Os <strong>dias corridos</strong> significam simplesmente a somatória absoluta em lapso temporal, o número contínuo de dias completos de calendário que existem de ontem até hoje ou entre um mês e outro. A contagem de dias correntes não para para fins de semana. Ela corre direto. Essa métrica e esse cronômetro são amplamente utilizados em aluguéis estipulados via diárias, pacotes de telefonia celular, assinaturas de apps (mensalidades padrão do dia 5 até dia 5 contam de 30 a 31 dias correntes ininterruptos, independentemente de um mês ter tido 6 finais de semana).</p>
          
          <h3>Contagem de Dias Úteis Comerciais</h3>
          <p>O <strong>dia útil</strong> compreende de <strong>Segunda-Feira até Sexta-Feira</strong>. As legislações trabalhista, fiscal e de defesas de direito estipulam contagem suspensa de prazos nos dias civis de recesso, tais como o Sábado e o Domingo (onde bancos, tribunais, portos, indústrias e a central pagadora de cheques e boletos fecham ou diminuem operação).</p>

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
              <p className="mt-4 text-gray-600 leading-relaxed">
                <strong>Para pagamentos bancários: NÃO.</strong> Operações de bolsa, encerramento de transferências tipo TED, pagamentos de fatura de boleto comercial com vencimento previso na referida data transferem automaticamente para segunda-feira e não acarretam juros. <strong>Para operações CLT (Consolidação das Leis do Trabalho): SIM.</strong> O Sábado é considerado dia útil pelo artigo 64 da mesma para a contagem de férias de um funcionário por exemplo, bem como prazo para entrega e confecção do pagamento do seu salário (quinto dia útil).
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                A calculadora considera Feriados Nacionais e locais?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Neste momento o nosso algoritmo apenas desconsidera e fatora de fora os <strong>Sábados</strong> e <strong>Domingos</strong> absolutos num intervalo matemático. O Brasil conta com feriados estaduais, pontes e municipais altamente dinâmicos (Feriado da Consciência Negra, Aniversários de Cidades no ES, BA e MG). Se ocorrer de possuir 2 feriados durante a semana estipulada, favor subtrair mentalmente 2 da casa total exibida pela nossa tela de Úteis.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
