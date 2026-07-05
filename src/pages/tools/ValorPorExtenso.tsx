import React, { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { FileText, Copy, Check } from 'lucide-react';
import { getValorExtenso } from '../../utils/currency';

export function ValorPorExtenso() {
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
        schema={`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Como se escreve R$ 1.050,00 por extenso?","acceptedAnswer":{"@type":"Answer","text":"O valor R$ 1.050,00 escreve-se por extenso como: <strong>um mil e cinquenta reais</strong>. Em cheques e recibos, essa forma garante validade e evita adulterações."}},{"@type":"Question","name":"Qual valor prevalece em caso de divergência: numérico ou por extenso?","acceptedAnswer":{"@type":"Answer","text":"De acordo com a legislação brasileira (Lei do Cheque), em caso de divergência entre o valor numérico e o valor escrito por extenso, <strong>prevalece o valor por extenso</strong>."}},{"@type":"Question","name":"Como colocar o valor por extenso entre parênteses?","acceptedAnswer":{"@type":"Answer","text":"A prática recomendada em contratos e recibos é inserir o valor numérico com o símbolo R$ e logo após o valor por extenso entre parênteses. Exemplo: R$ 5.000,00 (cinco mil reais)."}}]}`}
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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como Escrever Valores por Extenso em Reais</h2>
<p>O conversor de valor por extenso é uma ferramenta online gratuita criada para transformar instantaneamente quantias numéricas em texto escrito (reais e centavos). No Brasil, escrever o valor literal é uma obrigação formal em documentos com validade jurídica, incluindo preenchimento de recibos de pagamento, cheques, notas promissórias e contratos comerciais.</p>

<h3>Por que usar um conversor de valor por extenso?</h3>
<p>Escrever valores por extenso à mão pode gerar dúvidas gramaticais, especialmente com números longos ou quebrados. O uso da ferramenta garante a formatação correta das <strong>centenas, dezenas, milhares e centavos</strong>, evitando erros que podem anular ou gerar confusões em documentos financeiros.</p>

<h3>Regras Gramaticais para Escrever Dinheiro</h3>
<h4>Uso da Conjunção "E"</h4>
<p>A conjunção aditiva "e" deve ser usada para separar os reais dos centavos (ex: <em>dez reais e cinquenta centavos</em>) e também entre as centenas, dezenas e unidades (ex: <em>cento e vinte e cinco reais</em>). No entanto, entre os milhares e as centenas, não é obrigatório o uso do "e", exceto quando a centena terminar em zeros (ex: <em>dois mil e cem reais</em>, mas <em>dois mil trezentos e quarenta reais</em>).</p>
<h4>Cem ou Cento?</h4>
<p>Utilize "cem" apenas quando for uma centena exata e redonda. Se houver dezenas ou unidades acompanhando, deve-se usar "cento". Por exemplo: R$ 100,00 (cem reais), mas R$ 105,00 (cento e cinco reais).</p>

<h2>Importância Jurídica do Valor por Extenso em Contratos e Recibos</h2>
<p>O preenchimento adequado do valor por extenso é o seu principal mecanismo de proteção contra fraudes, rasuras e adulterações de valores. Um número arábico num recibo impresso (R$ 1.500,00) pode ser facilmente alterado (R$ 11.500,00). Ao documentar textualmente como "um mil e quinhentos reais", a divergência é eliminada e a segurança legal é garantida.</p>
          
          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4 not-prose mt-6">

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Como se escreve R$ 1.050,00 por extenso?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `O valor R$ 1.050,00 escreve-se por extenso como: <strong>um mil e cinquenta reais</strong>. Em cheques e recibos, essa forma garante validade e evita adulterações.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual valor prevalece em caso de divergência: numérico ou por extenso?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `De acordo com a legislação brasileira (Lei do Cheque), em caso de divergência entre o valor numérico e o valor escrito por extenso, <strong>prevalece o valor por extenso</strong>.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Como colocar o valor por extenso entre parênteses?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `A prática recomendada em contratos e recibos é inserir o valor numérico com o símbolo R$ e logo após o valor por extenso entre parênteses. Exemplo: R$ 5.000,00 (cinco mil reais).` }} />
            </details>
          </div>
        </div>
      </div>
    </>
  );
}