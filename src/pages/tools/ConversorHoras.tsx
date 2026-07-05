import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Clock, ChevronDown, ChevronUp, CheckCircle2, Calculator, FileText } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function ConversorHoras() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        title="Calculadora e Conversor de Horas Trabalhadas em Decimal - Grátis"
        description="Converta horas trabalhadas (HH:MM) para formato decimal ou vice-versa. Calcule automaticamente o valor financeiro do trabalho autônomo, freelancer e horas extras."
        keywords="conversor de horas decimais, calcular valor horas trabalhadas, hora extra, transformar hora em decimal, calculadora freelancer hora, converter hh:mm para decimal"
        
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que são horas centesimais ou decimais?","acceptedAnswer":{"@type":"Answer","text":"O formato padrão relógio usa 60 minutos (HH:MM). O formato decimal/centesimal converte os minutos numa fração baseada em 100, permitindo realizar cálculos de pagamento. Exemplo: 1h30 (relógio) equivale a 1,5 horas (decimal)."}},{"@type":"Question","name":"Como converter minutos em decimais na calculadora à mão?","acceptedAnswer":{"@type":"Answer","text":"A regra matemática é simples: pegue os minutos trabalhados e divida por 60. Exemplo: se você trabalhou 45 minutos. 45 ÷ 60 = 0,75. Então, 2 horas e 45 minutos viram 2,75 horas decimais."}},{"@type":"Question","name":"Como calcular o valor total de uma diária ou hora extra?","acceptedAnswer":{"@type":"Answer","text":"Primeiro, converta as horas do relógio em horas decimais. Em seguida, multiplique o resultado pela sua tarifa horária (R$/hora). É assim que os contadores e os relógios de ponto calculam as folhas de pagamento exatas."}}]}` }} />
      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Converter e Calcular Horas Trabalhadas
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O <strong>Conversor de Horas em Decimal</strong> é fundamental para freelancers, prestadores de serviços, RH e autônomos que cobram pelos serviços baseados no tempo gasto (tarifa por hora). O formato de relógio (horas e minutos) não funciona corretamente em calculadoras convencionais de dinheiro.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Por que converter de HH:MM para Decimais?
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O sistema temporal é sexagesimal (base de 60 minutos), enquanto o nosso sistema financeiro e monetário é decimal (base de 100 centavos). Se você cobrar R$ 50,00 por hora e trabalhou 2 horas e 30 minutos (2:30), multiplicando diretamente na calculadora (50 x 2,30), o resultado seria R$ 115,00. <strong>Isso está errado!</strong> O cálculo correto exige que as 2h30 virem 2,5 horas. Assim: 50 x 2,5 = R$ 125,00.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Uso em Folhas de Pagamento e Recibos
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Na hora de emitir um <Link to="/recibo-de-prestacao-de-servicos" className="text-emerald-600 hover:underline">Recibo de Prestação de Serviços</Link> com serviços por hora, transcreva os tempos centesimais para assegurar que a remuneração pela carga horária (incluindo quebras como 15, 20 ou 45 minutos de trabalho excedente) receba exatamente a proporção correta devida pelo contratante.</p>
              </div>
            
              </div>
            </article>

            <hr className="border-gray-100" />

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                Perguntas Frequentes (FAQ)
              </h2>
              <div className="space-y-4">
                {[
                  {
                    question: "O que são horas centesimais ou decimais?",
                    answer: "O formato padrão relógio usa 60 minutos (HH:MM). O formato decimal/centesimal converte os minutos numa fração baseada em 100, permitindo realizar cálculos de pagamento. Exemplo: 1h30 (relógio) equivale a 1,5 horas (decimal)."
                  },
                  {
                    question: "Como converter minutos em decimais na calculadora à mão?",
                    answer: "A regra matemática é simples: pegue os minutos trabalhados e divida por 60. Exemplo: se você trabalhou 45 minutos. 45 ÷ 60 = 0,75. Então, 2 horas e 45 minutos viram 2,75 horas decimais."
                  },
                  {
                    question: "Como calcular o valor total de uma diária ou hora extra?",
                    answer: "Primeiro, converta as horas do relógio em horas decimais. Em seguida, multiplique o resultado pela sua tarifa horária (R$/hora). É assim que os contadores e os relógios de ponto calculam as folhas de pagamento exatas."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-emerald-200 bg-white"
                  >
                    <button
                      type="button"
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-emerald-50/50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}