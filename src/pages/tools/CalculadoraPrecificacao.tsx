import React, { useState } from 'react';
import {  SEO  } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Calculator, DollarSign, Percent, ArrowRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

import { ChevronDown, ChevronUp } from 'lucide-react';

export function CalculadoraPrecificacao() {
  const faqs = [
    {
      question: "O que é Markup e por que usar?",
      answer: "Markup é um índice utilizado para encontrar o preço de venda correto de um produto ou serviço. Ele garante que o preço cobrado seja suficiente para cobrir os custos de produção, as despesas fixas/variáveis e ainda sobrar a margem de lucro líquido que você deseja, evitando prejuízos invisíveis."
    },
    {
      question: "Qual a diferença entre Margem de Lucro e Markup?",
      answer: "A margem de lucro é a porcentagem que você ganha sobre o valor final da venda. O markup é a ferramenta (índice multiplicador ou divisor) aplicada sobre o custo de compra para se chegar a esse valor de venda final."
    },
    {
      question: "Por que não posso apenas somar 50% de lucro ao custo?",
      answer: "Porque o lucro é calculado sobre o preço de venda, não sobre o custo. Se um produto custa R$ 100 e você soma 50% (R$ 50), você vende por R$ 150. Porém, R$ 50 representa apenas 33% de R$ 150. Se suas despesas forem 30%, vai sobrar apenas 3% de lucro real para você. A calculadora de markup corrige esse erro matemático."
    },
    {
      question: "O que incluir nas despesas?",
      answer: "Sume todas as porcentagens que incidem sobre a venda: impostos (Simples Nacional, ICMS), taxas da maquininha de cartão, comissões de vendedores e uma estimativa percentual de rateio das despesas fixas (aluguel, luz)."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema Inject:

  const [custo, setCusto] = useState('');
  const [despesas, setDespesas] = useState('');
  const [lucro, setLucro] = useState('');
  const [resultado, setResultado] = useState<{precoVenda: number, markup: number, valorLucro: number, margemErro: boolean} | null>(null);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const vCusto = parseFloat(custo.replace(',', '.'));
    const vDespesas = parseFloat(despesas.replace(',', '.')) || 0;
    const vLucro = parseFloat(lucro.replace(',', '.'));

    if (isNaN(vCusto) || isNaN(vLucro)) return;

    // Markup Divisor
    const divisor = 1 - ((vDespesas + vLucro) / 100);
    
    if (divisor <= 0) {
      setResultado({ precoVenda: 0, markup: 0, valorLucro: 0, margemErro: true });
      return;
    }

    const precoVenda = vCusto / divisor;
    const markup = (precoVenda / vCusto) - 1;
    const valorLucro = precoVenda * (vLucro / 100);

    setResultado({
      precoVenda,
      markup: markup * 100,
      valorLucro,
      margemErro: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <SEO 
        title="Calculadora de Precificação de Produtos (Markup) | Recibo Grátis"
        description="Calcule o preço de venda ideal para seu produto ou serviço. Descubra o markup correto e garanta a margem de lucro desejada sem prejuízos."
        keywords="calculadora de precificacao, calculadora markup, calcular preco de venda, margem de lucro, preco produto, como precificar"
        url="https://recibogratis.com.br/calculadora-precificacao-produtos"
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
          <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Calculadora de Precificação</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Descubra exatamente por quanto vender seu produto ou serviço utilizando o cálculo correto de Markup para não ter prejuízo.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          
          <form onSubmit={calcular} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Custo do Produto/Serviço (R$)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={custo}
                    onChange={(e) => setCusto(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Ex: 50.00"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Valor pago ao fornecedor ou custo de produção.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Despesas Fixas e Variáveis (%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Percent className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={despesas}
                    onChange={(e) => setDespesas(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Ex: 15"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Impostos, comissões, frete, taxa de cartão, etc.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Margem de Lucro Desejada (%)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Percent className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={lucro}
                    onChange={(e) => setLucro(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Ex: 20"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Quanto quer lucrar líquido (sobre a venda).</p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Calcular Preço de Venda
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-center">
              {resultado ? (
                resultado.margemErro ? (
                  <div className="text-center text-rose-600 p-4">
                    <p className="font-bold mb-2">Cálculo Inviável</p>
                    <p className="text-sm">A soma das despesas com o lucro não pode ser igual ou superior a 100%.</p>
                  </div>
                ) : (
                  <div className="space-y-6 text-center">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Preço de Venda Sugerido</p>
                      <p className="text-4xl font-extrabold text-emerald-600">
                        {formatCurrency(resultado.precoVenda)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Lucro Líquido</p>
                        <p className="text-lg font-bold text-gray-800">
                          {formatCurrency(resultado.valorLucro)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Índice Markup</p>
                        <p className="text-lg font-bold text-gray-800">
                          {resultado.markup.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center text-gray-400">
                  <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Preencha os dados e clique em calcular para ver o resultado.</p>
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
                Como calcular o Preço de Venda corretamente?
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Muitos empreendedores cometem um erro grave na hora de precificar: pegar o custo do produto e apenas somar a porcentagem de lucro desejada. Esse método está errado e pode causar prejuízos ocultos!</p>
                <p>O cálculo correto exige o uso de uma técnica chamada <strong>Markup Divisor</strong>, que encontra um preço de venda no qual caibam todas as despesas (impostos, taxas, comissões) e o custo do produto, sobrando exatamente a margem de lucro que você definiu na proporção correta do faturamento.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                A diferença entre Markup e Margem de Lucro
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <ul>
                  <li><strong>Margem de Lucro:</strong> É o valor que sobra para você, calculado <em>sobre o preço de venda</em>.</li>
                  <li><strong>Markup:</strong> É um índice (multiplicador ou divisor) aplicado <em>sobre o custo</em> do produto para se chegar ao preço de venda.</li>
                </ul>
              </div>
            
              </div>
            </article>

            <hr className="border-gray-100" />

            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                Dúvidas Frequentes sobre Precificação
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
