import { useState } from 'react';
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
        title="Escrever Valor por Extenso em Reais - Conversor Online"
        description="Converta valores numéricos para texto escrito por extenso em reais (R$) automaticamente. Ideal para preencher cheques, recibos e contratos."
        keywords="valor por extenso, escrever numero extenso, conversor valor extenso reais, preencher cheque, extenso recibo"
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
                    className="p-3 bg-white text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm shrink-0"
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
          <h2>Como funciona o conversor de Valor por Extenso?</h2>
          <p>O conversor de valor por extenso é uma ferramenta online e gratuita desenvolvida para transformar automaticamente quantias numéricas (em Reais) na sua forma escrita por extenso. No Brasil, redigir o valor por extenso é uma exigência formal na emissão de documentos com valor legal, como cheques, recibos, contratos, procurações e promissórias.</p>

          <h3>Por que escrever o valor por extenso em documentos?</h3>
          <p>O preenchimento do valor por extenso é a principal garantia contra rasuras, fraudes e adulterações. Num cheque ou recibo, o valor numérico (ex: R$ 1.500,00) pode ser facilmente adulterado com a adição de um número extra (ex: R$ 11.500,00). Ao descrever o valor como "<strong>um mil e quinhentos reais</strong>", elimina-se a ambiguidade. A legislação brasileira prevê que, em caso de divergência entre o valor em números e o valor por extenso, <strong>o valor por extenso é aquele que tem validade jurídica</strong>.</p>

          <h3>Regras gramaticais e boas práticas para Reais e Centavos</h3>
          <ul>
            <li><strong>Reais e Centavos:</strong> Sempre una os valores com a conjunção "e". Exemplo: <em>cento e vinte reais e cinquenta centavos</em>.</li>
            <li><strong>Milhares e Centenas:</strong> Não é obrigatório usar "e" entre os milhares e as centenas, mas usa-se entre centenas, dezenas e unidades. Exemplo: <em>dois mil, trezentos e quarenta reais</em>.</li>
            <li><strong>Cem ou Cento?</strong> Usa-se "cem" quando o valor for exato (ex: cem reais). Usa-se "cento" quando acompanhado de dezenas ou unidades (ex: cento e dez reais).</li>
          </ul>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual valor prevalece no cheque: o número ou o extenso?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                De acordo com a Lei do Cheque (Lei nº 7.357/1985), sempre que houver divergência entre a quantia grafada em algarismos numéricos e a escrita por extenso, <strong>prevalecerá a quantia escrita por extenso</strong>. A regra visa evitar fraudes de falsificação no número.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Pode colocar parenteses no valor por extenso?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Sim. Em contratos e recibos judiciais, é uma praxe jurídica colocar o número em algarismos seguido pelo valor escrito por extenso entre parênteses para trazer segurança em dobro. Exemplo: R$ 5.000,00 (cinco mil reais).
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Essa ferramenta funciona offline?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Sim, nosso gerador funciona integralmente no seu navegador utilizando tecnologia client-side, entregando um cálculo rápido, sem limites de uso e de forma totalmente segura.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
