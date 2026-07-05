import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { Percent } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function DescontosMultas() {
  const [valorAntigo, setValorAntigo] = useState('');
  const [percentual, setPercentual] = useState('');
  const [isDesconto, setIsDesconto] = useState(true);

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

  const valorNum = parseCurrency(valorAntigo);
  const percentNum = parseCurrency(percentual);
  
  const diferenca = (valorNum * percentNum) / 100;
  const valorFinal = isDesconto ? valorNum - diferenca : valorNum + diferenca;

  return (
    <>
      <SEO 
        title="Calculadora de Desconto e Multa por Atraso - Online e Grátis"
        description="Calcule facilmente juros diários, multas por atraso de pagamento ou descontos percentuais em boletos, recibos e parcelas. Ferramenta online gratuita."
        keywords="calculadora de desconto, calcular multa por atraso, calcular juros de mora, juros diario boleto, calcular porcentagem desconto"
        schema={`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Qual é o limite de multa por atraso permitido por lei?","acceptedAnswer":{"@type":"Answer","text":"De acordo com o Código de Defesa do Consumidor (CDC), para relações de consumo, a multa de mora por atraso de pagamento não pode ser superior a <strong>2% do valor da prestação</strong>. Para contratos entre empresas (B2B) e condomínios, outras regras podem se aplicar (frequentemente 2% também)."}},{"@type":"Question","name":"O que são juros de mora 'pro rata die'?","acceptedAnswer":{"@type":"Answer","text":"São os juros cobrados de forma proporcional aos dias de atraso. Normalmente o limite legal (sem contrato específico) é de 1% ao mês. Assim, divide-se 1% por 30 dias para encontrar a taxa diária (0,033% ao dia) e multiplica-se pelos dias corridos em atraso."}},{"@type":"Question","name":"Como funciona o cálculo do desconto?","acceptedAnswer":{"@type":"Answer","text":"O cálculo do desconto subtrai um percentual sobre o valor total. Exemplo: um produto de R$ 100,00 com 15% de desconto. O valor do desconto é R$ 15,00, resultando num valor final a pagar de R$ 85,00."}}]}`}
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Percent className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Descontos e Multas</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Descubra o valor final após descontos promocionais ou acréscimos de juros.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="flex gap-4 mb-8 justify-center">
            <button 
              onClick={() => setIsDesconto(true)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${isDesconto ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Calcular Desconto
            </button>
            <button 
              onClick={() => setIsDesconto(false)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${!isDesconto ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Acréscimo/Multa
            </button>
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Valor Inicial (R$)</label>
              <input
                type="text"
                value={valorAntigo}
                onChange={(e) => setValorAntigo(formatCurrencyInput(e.target.value))}
                placeholder="0,00"
                className="w-full px-4 py-4 text-xl border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Porcentagem (%)</label>
              <input
                type="text"
                value={percentual}
                onChange={(e) => setPercentual(formatCurrencyInput(e.target.value))}
                placeholder="0,00"
                className="w-full px-4 py-4 text-xl border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-center font-bold"
              />
            </div>

            <div className="pt-6 border-t mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Valor Inicial:</span>
                <span className="font-semibold text-lg">R$ {formatCurrency(valorNum.toFixed(2).replace('.', ','))}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">{isDesconto ? 'Desconto Aplicado:' : 'Acréscimo Adicionado:'}</span>
                <span className={`font-semibold text-lg ${isDesconto ? 'text-green-600' : 'text-red-600'}`}>
                  {isDesconto ? '-' : '+'} R$ {formatCurrency(diferenca.toFixed(2).replace('.', ','))}
                </span>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 text-center shadow-inner">
                <p className="text-emerald-800 text-sm font-bold mb-1">Valor Final Acordado</p>
                <p className="text-4xl font-extrabold text-emerald-700">
                  R$ {formatCurrency(Math.max(0, valorFinal).toFixed(2).replace('.', ','))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSense />
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como Calcular Multa e Juros por Atraso de Pagamento</h2>
<p>A calculadora de atrasos e descontos é essencial para lojistas, prestadores de serviços e locadores que precisam atualizar o valor de cobranças vencidas, recibos e notas promissórias ou conceder um abatimento em compras à vista. O sistema computa os valores seguindo as diretrizes básicas matemáticas e de consumo.</p>

<h3>Regras do Código de Defesa do Consumidor (CDC)</h3>
<p>Ao emitir cobranças contra pessoas físicas em relações de consumo (mensalidades, cursos, produtos), você está restrito pela lei (Art. 52, § 1° do CDC): a multa máxima permitida para atraso é de <strong>2% (dois por cento)</strong> e os juros de mora não devem ultrapassar <strong>1% ao mês</strong>, a menos que estipulado diversamente em contratos específicos permitidos por lei.</p>

<h3>Cálculo Pro Rata Die (Juros Diários)</h3>
<p>O termo <em>pro rata die</em> significa "proporcional ao dia". Quando o cliente atrasa 5 dias, você não cobra o juro cheio do mês, mas sim a fração diária. Com um juro padrão de 1% ao mês, a taxa diária é de aproximadamente 0,0333%. Ao preencher a nossa calculadora com os dias de atraso e a taxa mensal, ela converte e aplica exatamente os juros pro rata die de forma correta.</p>

<h2>Como Calcular Descontos Percentuais</h2>
<p>Na negociação com fornecedores ou clientes, saber calcular um desconto rápido é fundamental. O percentual de desconto é transformado numa fração decimal e multiplicado pelo valor base. Por exemplo, conceder um abatimento por pagamento antecipado em um Recibo Simples de prestação de serviço garantirá rapidez e menos inadimplência.</p>
          
          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-4 not-prose mt-6">

            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual é o limite de multa por atraso permitido por lei?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `De acordo com o Código de Defesa do Consumidor (CDC), para relações de consumo, a multa de mora por atraso de pagamento não pode ser superior a <strong>2% do valor da prestação</strong>. Para contratos entre empresas (B2B) e condomínios, outras regras podem se aplicar (frequentemente 2% também).` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                O que são juros de mora 'pro rata die'?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `São os juros cobrados de forma proporcional aos dias de atraso. Normalmente o limite legal (sem contrato específico) é de 1% ao mês. Assim, divide-se 1% por 30 dias para encontrar a taxa diária (0,033% ao dia) e multiplica-se pelos dias corridos em atraso.` }} />
            </details>
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Como funciona o cálculo do desconto?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: `O cálculo do desconto subtrai um percentual sobre o valor total. Exemplo: um produto de R$ 100,00 com 15% de desconto. O valor do desconto é R$ 15,00, resultando num valor final a pagar de R$ 85,00.` }} />
            </details>
          </div>
        </div>
      </div>
    </>
  );
}