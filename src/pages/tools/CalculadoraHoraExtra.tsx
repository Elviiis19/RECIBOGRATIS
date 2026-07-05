import React, { useState } from 'react';
import { SEO  } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Calculator, Clock, DollarSign, Moon, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

import { ChevronDown, ChevronUp } from 'lucide-react';

export function CalculadoraHoraExtra() {
  const faqs = [
    {
      question: "Qual o adicional mínimo para horas extras?",
      answer: "Pela legislação trabalhista brasileira (CLT), a hora extra em dias normais (segunda a sábado) deve ter um adicional de no mínimo 50% sobre o valor da hora normal."
    },
    {
      question: "Qual o valor da hora extra no domingo e feriado?",
      answer: "O trabalho prestado em domingos (que não seja escala de revezamento) e feriados deve ser pago em dobro, ou seja, com adicional de 100% sobre o valor da hora normal."
    },
    {
      question: "O que é divisor 220?",
      answer: "É o divisor padrão para quem trabalha 44 horas semanais (8 horas por dia + 4h no sábado). Para encontrar o valor da sua hora normal, o salário bruto é dividido por 220."
    },
    {
      question: "As horas extras refletem em outros benefícios?",
      answer: "Sim! Se você faz horas extras com frequência, elas geram o chamado DSR (Descanso Semanal Remunerado) e também refletem no cálculo de férias, 13º salário e FGTS."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema Inject:

  const [salario, setSalario] = useState('');
  const [jornada, setJornada] = useState('220');
  const [horas50, setHoras50] = useState('');
  const [horas100, setHoras100] = useState('');
  const [horasNoturnas, setHorasNoturnas] = useState('');
  
  const [resultado, setResultado] = useState<{
    valorHoraBase: number,
    total50: number,
    total100: number,
    totalNoturno: number,
    totalGeral: number
  } | null>(null);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const vSalario = parseFloat(salario.replace(',', '.'));
    const vJornada = parseInt(jornada);
    
    if (isNaN(vSalario) || isNaN(vJornada)) return;

    const valorHora = vSalario / vJornada;
    
    const h50 = parseFloat(horas50.replace(',', '.')) || 0;
    const h100 = parseFloat(horas100.replace(',', '.')) || 0;
    const hNoturna = parseFloat(horasNoturnas.replace(',', '.')) || 0;

    const valor50 = h50 * (valorHora * 1.5);
    const valor100 = h100 * (valorHora * 2.0);
    // Adicional noturno é 20% a mais na hora base (aqui não combinamos hora extra + noturno de forma complexa, apenas o adicional de 20%)
    const valorNoturno = hNoturna * (valorHora * 0.2); 

    setResultado({
      valorHoraBase: valorHora,
      total50: valor50,
      total100: valor100,
      totalNoturno: valorNoturno,
      totalGeral: valor50 + valor100 + valorNoturno
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Calculadora de Hora Extra e Adicional Noturno | Recibo Grátis"
        description="Calcule o valor exato das suas horas extras (50% e 100%) e do adicional noturno (20%). Saiba quanto deve receber a mais no seu holerite."
        keywords="calculadora hora extra, calcular adicional noturno, valor hora extra, 50 por cento, 100 por cento, calculo trabalhista"
        url="https://recibogratis.com.br/calculadora-hora-extra"
      />

      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>

      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Calculadora de Hora Extra</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Descubra o valor exato que você deve receber de horas extras (50% e 100%) e adicional noturno no mês.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          
          <form onSubmit={calcular} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salário Bruto Mensal (R$)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Ex: 3500.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jornada Mensal (Horas)
                </label>
                <select
                  value={jornada}
                  onChange={(e) => setJornada(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="220">220h (Padrão 44h semanais)</option>
                  <option value="200">200h (40h semanais)</option>
                  <option value="180">180h (36h semanais - 6h dia)</option>
                  <option value="150">150h (30h semanais)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Horas Extras 50%
                  </label>
                  <input
                    type="text"
                    value={horas50}
                    onChange={(e) => setHoras50(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Qtd."
                  />
                  <p className="text-xs text-gray-500 mt-1">Dias úteis e sábados.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Horas Extras 100%
                  </label>
                  <input
                    type="text"
                    value={horas100}
                    onChange={(e) => setHoras100(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Qtd."
                  />
                  <p className="text-xs text-gray-500 mt-1">Domingos e feriados.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-gray-500" />
                  Horas de Adicional Noturno (20%)
                </label>
                <input
                  type="text"
                  value={horasNoturnas}
                  onChange={(e) => setHorasNoturnas(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Quantidade de horas noturnas"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Calcular Valores
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-center">
              {resultado ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 font-medium mb-1">Total a Receber Adicional</p>
                    <p className="text-4xl font-extrabold text-emerald-600">
                      {formatCurrency(resultado.totalGeral)}
                    </p>
                  </div>
                  
                  <div className="space-y-3 border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Valor da sua hora normal:</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(resultado.valorHoraBase)}</span>
                    </div>
                    {resultado.total50 > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Total em Extras (50%):</span>
                        <span className="font-semibold text-gray-800">{formatCurrency(resultado.total50)}</span>
                      </div>
                    )}
                    {resultado.total100 > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Total em Extras (100%):</span>
                        <span className="font-semibold text-gray-800">{formatCurrency(resultado.total100)}</span>
                      </div>
                    )}
                    {resultado.totalNoturno > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Total em Ad. Noturno (20%):</span>
                        <span className="font-semibold text-gray-800">{formatCurrency(resultado.totalNoturno)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Preencha os dados da sua jornada para calcular o valor a receber.</p>
                </div>
              )}
            </div>
          </form>

        </div>

        <AdSense />

              {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como é feito o cálculo da Hora Extra?
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>A Constituição Federal garante aos trabalhadores o direito ao recebimento de horas extras com acréscimo de no mínimo 50% sobre o valor da hora normal de trabalho.</p>
                <ul>
                  <li><strong>Hora Extra 50%:</strong> Paga para horas trabalhadas além do expediente em dias úteis ou sábados (quando o sábado é considerado dia útil na jornada).</li>
                  <li><strong>Hora Extra 100%:</strong> Paga quando o trabalho extraordinário ocorre aos domingos ou feriados (quando não há folga compensatória).</li>
                </ul>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Adicional Noturno
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O adicional noturno urbano é um acréscimo de 20% sobre o valor da hora diurna para o trabalho realizado entre as 22h de um dia e as 5h do dia seguinte. Além disso, a hora noturna é computada como 52 minutos e 30 segundos (hora ficta), não 60 minutos, o que aumenta a quantidade final de horas no holerite.</p>
              </div>
            
              </div>
            </article>

            <hr className="border-gray-100" />

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                Dúvidas Frequentes sobre Hora Extra
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
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

    </div>
    </div>
  );
}
