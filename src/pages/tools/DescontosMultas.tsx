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
        title="Calculadora de Desconto, Acréscimo e Multas Online"
        description="Calcule facilmente porcentagens de desconto, acréscimos, juros e multas sobre qualquer valor ou boleto."
        keywords="calculadora desconto, calcular juros boleto, porcentagem multa, acrescimo online"
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
          <h2>Como calcular descontos, acréscimos, juros e multas online?</h2>
          <p>Seja para aplicar uma promoção na venda do seu produto corporativo, ou para calcular facilmente <strong>multas por atraso</strong> no pagamento de aluguéis e boletos de condomínio, nossa calculadora resolve a matemática da porcentagem e juros simples instantaneamente sem que você precise montar fórmulas ou usar planilhas de Excel. Insira o <strong>Valor Inicial</strong>, digite a taxa da <strong>Porcentagem (%)</strong>, e escolha se deseja abater ou aumentar a quantia acionando a chave de Desconto ou Acréscimo.</p>

          <h3>Cálculo de Desconto Comercial à vista</h3>
          <p>Dar ou conceder desconto é uma prática excelente de marketing e retenção para antecipar recebíveis. Se você vende uma consultoria jurídica, ou um pacote de roupas por <strong>R$ 1.500,00</strong>, e deseja aplicar uma condição forte à vista em Pix ou Dinheiro concedendo um desconto fechado de <strong>15%</strong>. A calculadora desvendará e mostrará integralmente o valor final: a dedução será exata de R$ 225,00, formatando e gerando um pagamento líquido direto e claro para você de R$ 1.275,00.</p>

          <h3>Cálculo de Multas em Boletos ou Recibos em Atraso por dia</h3>
          <p>Por lei federal no Brasil (via Código de Defesa do Consumidor brasileiro nas premissas contratuais), a multa punitiva máxima admissível de atraso em boletos e faturas de cartão de crédito e mensalidades referentes a fornecimento regular contínuo de produtos e serviços básicos <strong>não pode exceder em tese a marca de 2% do valor original daquela prestação</strong>. O juros de mora financeiro usual estipulado pelo Banco Central costuma ser majoritariamente limitado a 1% ao mês civil de 30 dias (aplicado diariamente calculando pro-rata dependendo do acréscimo de dias decorridos no atraso do título). Ao utilizar a nossa calculadora para cômputo de Multa ou Acréscimo cumulativo, você encontra plena segurança matemática para gerar o novo boleto atualizado e corrigido e emitir o recibo para seu cliente ou inquilino sem chance alguma de cobrar errado, lesar ou ferir as rígidas leis de proteção financeira ou amargar penas de usura.</p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Qual a diferença financeira legal entre Acréscimo Fixo, Multa de Atraso e Juros de Mora?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A <strong>multa por atraso imperativa (cláusula penal de atraso)</strong> tem natureza punitiva sancionatória financeira. Geralmente é cobrada numa pancada e é uma taxa fixa estanque — incide pesadamente no topo da cabeça do título no instante exato e no primeiro dia em que a data pactuada passou em branco sem quitação. Já os <strong>juros moratórios</strong> detêm flagrante caráter indenizatório e temporal pela indisponibilidade prolongada do recurso privado e são variáveis de acordo estritamente com o tempo excedido (a taxa vai esticando e aumentando, ex: juros diários fracionados de 0,033% ao dia multiplicados). Para calcular livremente o tamanho da multa fixa pre-combinada de um boleto comercial (10% na cabeça), preencha em nossa matriz interativa o fator do valor bruto inadimplente daquele mês isolado e aplique a operação Acréscimo ditando a alíquota em "10".
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Posso cobrar e inserir em contrato uma multa por atraso acima de 2% no Brasil?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Via de regra majoritária, nos casos subordinados às diretrizes de consumo amparados pelo Código de Defesa do Consumidor puro (Art. 52, § 1º) — como nas situações de faturas de telefonia fixa ou celular, internet e até mensalidade das escolas particulares — as multas sancionatórias instituídas obrigatoriamente não poderão jamais ser estipuladas fixando valores superiores ao teto de <strong>2% (dois por cento completos)</strong>.<br/><br/>Contudo se o seu ofício recair, ou você for credor de nichos e contratos civis privados (como taxas de condomínio, regido por balizas específicas da convenção imersa no Código Civil) - e principalmente nos contratos formalizados de locações urbanas e imóveis residenciais cíveis blindados sob a robustez da Lei do Inquilinato estrita, a multa moratória pactuada em contrato (que flutua comumente nos implacáveis e tradicionais 10% cobrados na quitação do título tardio) é tida historicamente e considerada incontestável, permitida de livre pactuação judicial, fundamentalmente por não se tratar de uma relação clássica hierárquica típica de balcão de prateleira de consumo amparada no CDC.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
