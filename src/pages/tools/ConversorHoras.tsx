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
          <h2>Como calcular horas trabalhadas para Reais online?</h2>
          <p>Para profissionais e freelancers cujo modelo comercial envolve venda da produtividade baseada na carga de <strong>hora técnica</strong> (desenvolvedores de software, profissionais de TI PJ, arquitetos, contadores, redatores e designers), fechar o final de um mês de expediente e gerar e faturar a nota da folha de pagamento exige uma correção matemática para não operar fora e perder os quebra-cabeças da conta. O formato relógio exibe e entrega o balanço baseada fidedignamente na mecânica da escala sexagesimal <strong>(fechada rígida do 0 aos 60 minutos de vida)</strong>, no entanto, para multiplicar financeiramente essa "hora gasta de vida" pelo salário base hora acordado (o seu "rate" monetário contratual ou valor hora, fixado sempre em dinheiro base decimal e real fiduciário da grade), os resíduos em minutos de relógio precisam ser perfeitamente emparelhados e transformados e desdobrados de fração para sua base financeira correspondente pura da "unidade percentual de 0 a 100". Ao utilizar o nosso <strong>conversor de horas trabalhadas no formato simples e enxuto</strong>, você ganha rapidez cravando apenas o <strong>tempo bruto e o Valor da Hora (R$)</strong>.</p>

          <h3>Trinta minutos no relógio são iguais a 0.50 (meio porcento). Entendendo o fator</h3>
          <p>
             Se você logou e labutou a exata porção e métrica de <strong>121 horas cheias e mais 30 minutos pendurados (121:30)</strong> atreladas no seu relógio ou no sumário do painel de controle (ferramentas como Jira, Trello, Toggl Track relatórios, Rescue Time ou Clockify), e o seu polpudo valor de margem de hora contratado negociado bate fechado exatos R$ 25,00, muitas pessoas desesperadas, apressadas e até empresários de longo tempo abrem a tradicional calculadora de bolso ou do próprio menu do celular e operam na mão crua e de forma erradamente imperdoável a conta contábil literal montando <code>121,30 vezes x 25 = Faturamento Gerando de R$ 3.032,50</code>. Esse erro infantil amador contábil de soma base, joga literalmente fatia do suor do seu rico dinheiro oriundo da sua fatura no lixo de forma invisível mês a mês!
          </p>
          <p>
             Na matemática real da fração, como meia hora gasta (esses 30 minutos de relógio rodando cronômetro) são precisamente no mundo físico e palpável a <strong>metade de uma hora redonda viva na Terra (fração pura 1/2)</strong>, então no modelo do arranjo matemático real decimal o balanço do número 30 vira imperativamente e sobe encorpando a carga de rate no extrato final para ser um ".50" ou então dito "50 partes quebradas na imensa centena percentual cravada" — sendo nesse caso a forma correqueira o valor efetivo e real financeiro o correspondente estrito e puro atrelado montado numericamente em <code>121,50</code> (onde multiplicando gera limpos R$ 3.037,50 de caixa para o seu bolso, ganho de de exatos R$ 5 reais resgatados num único fardo simples varrido em questão de mero crivo). Nossa <strong>calculadora de conversor de hora relógio para hora centesimal comercial</strong> reverte fidedignamente esse fator embutindo precisamente o conversor para gerar a pré-visualização real do extrato bruto e holerite da sua suada folha na tela central sem comer ou que você perder a poeira os valiosos centavos devidos atrelados aos seus parcos minutos trabalhados fora da curva redonda.
          </p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que significa horas In Itinere?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                As conhecidas horas "in itinere" referem-se ao tempo gasto pelo trabalhador no deslocamento entre sua residência e o local de trabalho. Com a Reforma Trabalhista (Lei nº 13.467/2017), o tempo de deslocamento não é mais computado na jornada de trabalho, por não ser mais considerado tempo à disposição do empregador.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Como 15 minutos de hora extra equivalem a quanto na conversão matemática?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Na matemática da calculadora corporativa, uma fração de <strong>15 minutos</strong> corresponde estritamente a um quarto (1/4) de hora. Simplificando: a fração relógio 15 equivale, financeiramente, à base 0,25. Se o seu holerite indica 52 horas e 15 minutos extras (52:15 relógio), o input a ser utilizado pelo RH ou no seu multiplicador contábil para gerar reais será 52,25 horas.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
