import React, { useState } from 'react';
import {  SEO  } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { FileText, Copy, Check, CheckCircle2, Type, ChevronDown, ChevronUp } from 'lucide-react';
import { getValorExtenso } from '../../utils/currency';

export function ValorPorExtenso() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [value, setValue] = useState('');
  const [extenso, setExtenso] = useState('');
  const [copied, setCopied] = useState(false);

  const formatCurrencyInput = (val: string) => {
    let cleanVal = val.replace(/\D/g, '');
    if (cleanVal.length === 0) return '';
    cleanVal = cleanVal.padStart(3, '0');
    const integerPart = cleanVal.slice(0, -2);
    const decimalPart = cleanVal.slice(-2);
    const formattedInteger = parseInt(integerPart, 10).toLocaleString('pt-BR');
    return `${formattedInteger},${decimalPart}`;
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setValue(formatted);
    if (formatted && formatted !== '0,00') {
      try {
        setExtenso(getValorExtenso(formatted));
      } catch (err) {
        setExtenso('');
      }
    } else {
      setExtenso('');
    }
  };

  const handleCopy = () => {
    if (extenso) {
      navigator.clipboard.writeText(extenso);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <SEO 
        title="Escrever Valor por Extenso em Reais - Conversor Online Grátis"
        description="Escreva valores numéricos por extenso em reais de forma automática. Ferramenta online grátis para preencher recibos, contratos, cheques e notas promissórias com segurança."
        keywords="valor por extenso, escrever numero extenso, conversor valor extenso reais, como escrever dinheiro, extenso recibo"
        
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Valor por Extenso em Reais</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Gere o valor por extenso de forma rápida e sem erros para preencher recibos, contratos e procurações.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="max-w-xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Digite o valor numérico</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">R$</span>
                <input
                  type="text"
                  value={value}
                  onChange={handleValueChange}
                  placeholder="0,00"
                  className="w-full pl-12 pr-4 py-4 text-2xl font-bold text-gray-900 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                />
              </div>
            </div>

            {extenso && (
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <p className="text-sm font-semibold text-emerald-800 mb-2">Valor por Extenso:</p>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xl text-emerald-950 font-medium uppercase leading-relaxed font-serif">
                    {extenso}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="p-3 bg-white text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm shrink-0"
                    title="Copiar texto"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <AdSense />
        
                    </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Como se escreve R$ 1.050,00 por extenso?","acceptedAnswer":{"@type":"Answer","text":"O valor R$ 1.050,00 escreve-se por extenso como: <strong>um mil e cinquenta reais</strong>. Em cheques e recibos, essa forma garante validade e evita adulterações."}},{"@type":"Question","name":"Qual valor prevalece em caso de divergência: numérico ou por extenso?","acceptedAnswer":{"@type":"Answer","text":"De acordo com a legislação brasileira (Lei do Cheque), em caso de divergência entre o valor numérico e o valor escrito por extenso, <strong>prevalece o valor por extenso</strong>."}},{"@type":"Question","name":"Como colocar o valor por extenso entre parênteses?","acceptedAnswer":{"@type":"Answer","text":"A prática recomendada em contratos e recibos é inserir o valor numérico com o símbolo R$ e logo após o valor por extenso entre parênteses. Exemplo: R$ 5.000,00 (cinco mil reais)."}}]}` }} />
      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Escrever Valores por Extenso em Reais
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O conversor de valor por extenso é uma ferramenta online gratuita criada para transformar instantaneamente quantias numéricas em texto escrito (reais e centavos). No Brasil, escrever o valor literal é uma obrigação formal em documentos com validade jurídica, incluindo preenchimento de recibos de pagamento, cheques, notas promissórias e contratos comerciais.</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Type className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Regras Gramaticais para Escrever Dinheiro
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <h4>Uso da Conjunção "E"</h4>
                <p>A conjunção aditiva "e" deve ser usada para separar os reais dos centavos (ex: <em>dez reais e cinquenta centavos</em>) e também entre as centenas, dezenas e unidades (ex: <em>cento e vinte e cinco reais</em>). No entanto, entre os milhares e as centenas, não é obrigatório o uso do "e", exceto quando a centena terminar em zeros (ex: <em>dois mil e cem reais</em>, mas <em>dois mil trezentos e quarenta reais</em>).</p>
                <h4>Cem ou Cento?</h4>
                <p>Utilize "cem" apenas quando for uma centena exata e redonda. Se houver dezenas ou unidades acompanhando, deve-se usar "cento". Por exemplo: R$ 100,00 (cem reais), mas R$ 105,00 (cento e cinco reais).</p>
              </div>
            
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Importância Jurídica do Valor por Extenso
              </h3>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O preenchimento adequado do valor por extenso é o seu principal mecanismo de proteção contra fraudes, rasuras e adulterações de valores. Um número arábico num recibo impresso (R$ 1.500,00) pode ser facilmente alterado (R$ 11.500,00). Ao documentar textualmente como "um mil e quinhentos reais", a divergência é eliminada e a segurança legal é garantida.</p>
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
                    question: "Como se escreve R$ 1.050,00 por extenso?",
                    answer: "O valor R$ 1.050,00 escreve-se por extenso como: <strong>um mil e cinquenta reais</strong>. Em cheques e recibos, essa forma garante validade e evita adulterações."
                  },
                  {
                    question: "Qual valor prevalece em caso de divergência: numérico ou por extenso?",
                    answer: "De acordo com a legislação brasileira (Lei do Cheque), em caso de divergência entre o valor numérico e o valor escrito por extenso, <strong>prevalece o valor por extenso</strong>."
                  },
                  {
                    question: "Como colocar o valor por extenso entre parênteses?",
                    answer: "A prática recomendada em contratos e recibos é inserir o valor numérico com o símbolo R$ e logo após o valor por extenso entre parênteses. Exemplo: R$ 5.000,00 (cinco mil reais)."
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