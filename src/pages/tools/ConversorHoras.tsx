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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como converter minutos no relógio para cálculo em Reais?</h2>
          <p>Para trabalhadores cujo modelo comercial envolve venda da produtividade e hora técnica (desenvolvedores, arquitetos de sistema, contadores e jornalistas), fechar um mês faturando a folha tem uma pequena pegadinha. O formato relógio exibe as coisas com base na escala sexagesimal <strong>(do 0 aos 60 minutos)</strong>, no entanto, para multiplicar uma hora pelo salário base (seu rate, em dinheiro decimal), os minutos precisam ser transformados para sua base da "unidade percentual de 0 a 100".</p>

          <h3>Trinta minutos são 0.50. Entendendo o fator</h3>
          <p>
             Se você trabalhou por <strong>121 horas e 30 minutos (121:30)</strong> no seu painel de controle (Jira, Trello, Toggl, Rescue Time), e seu valor hora contratado é R$ 25,00, muitas pessoas leigas abrem a calculadora física do celular e fazem na mão erradamente a conta literal <code>121,30 x 25 = R$ 3032,50</code>. Esse cálculo joga dinheiro da sua fatura no lixo!
          </p>
          <p>
             Como meia hora (30 minutos) é precisamente <strong>metade de uma hora (fração 1/2)</strong>, no modelo decimal o 30 vira um ".50" ou "50 na centena" — sendo a forma correqueira o valor correspondente a <code>121,50</code>! Nossa calculadora converte precisamente para gerar seu folha sem perder os centavos devidos.
          </p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que é o rate por hora? Como posso preencher uma promissória com isso?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                O formato e a ferramenta online em nossa página ajuda o profissional a tirar do relógio e faturar seu "RPA" da forma perfeita. Uma vez gerado qual é o dinheiro real da sua contra prestação nos balcões baseada no seu rate (custo por hr contratado da terceirização PJ B2BJ), você deve copiar o texto final em Reais e visitar a sub página do menu de Recibos para de fato emitir o PDF que documenta seu lucro.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                15 minutos de hora extra equivale a quanto na conversão?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Na matemática da calculadora de ponto para gerar seu custo hora, uma fração relógio de <strong>15 minutos</strong> corresponde estritamente a um quarto (1/4) da hora. 1 dividido por quatro gera uma fatia base proporcional de <strong>0,25 da unidade</strong> matemática no Brasil. Se seu recibo acusa uma margem de trabalho mensal extra de 52 horas inteiras e mais o quebrado numérico de quinze minutos extra, o input vai ler 52:15, contudo o valor para multíplico final da base de cálculo da CLT é 52,25.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
