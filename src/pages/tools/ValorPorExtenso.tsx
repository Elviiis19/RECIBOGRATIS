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
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como funciona o conversor de Valor por Extenso?</h2>
          <p>O conversor de valor por extenso é uma ferramenta gratuita que transforma automaticamente números financeiros em palavras escritas. Isso é essencial no Brasil, onde documentos que envolvem transações de dinheiro precisam do valor em formato de texto para evitar fraudes ou adulterações numéricas.</p>
          <h3>Onde devo usar os valores por extenso?</h3>
          <ul>
            <li><strong>Recibos e Notas Promissórias:</strong> Traz segurança e validação jurídica de que o valor é idôneo.</li>
            <li><strong>Contratos:</strong> Imprescindível para estipular multas, rescisões e pagamentos em geral.</li>
            <li><strong>Cheques:</strong> Um cheque no Brasil deve ser sacado prioritariamente respeitando o que foi redigido à mão ou impresso por extenso.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
