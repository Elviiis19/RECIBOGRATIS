import { useState } from 'react';
import { SEO } from '../../components/SEO';
import { AdSense } from '../../components/AdSense';
import { CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

export function MaquininhaCartao() {
  const [valorDesejado, setValorDesejado] = useState('');
  const [taxa, setTaxa] = useState('');

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

  const valorLiquido = parseCurrency(valorDesejado);
  const taxaNum = parseCurrency(taxa) / 100;
  
  // Fórmula de Repasse: Valor a Cobrar = Valor Desejado / (1 - taxa)
  const cobrarDoCliente = 1 - taxaNum > 0 ? valorLiquido / (1 - taxaNum) : 0;
  const diferencaTx = cobrarDoCliente - valorLiquido;

  return (
    <>
      <SEO 
        title="Calculadora de Taxa da Maquininha (Repasse para Cliente)"
        description="Descubra quanto cobrar no cartão de crédito/débito para receber exatamente o valor que você deseja repassando a taxa da maquininha."
        keywords="calcular taxa maquininha, repassar juros cliente, valor a cobrar cartao, maquininha stone pagseguro mercado pago"
      />
      <div className="bg-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <CreditCard className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl font-extrabold mb-4">Taxas da Maquininha</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Descubra quanto cobrar do seu cliente para não sair no prejuízo e receber o valor exato.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AdSense />
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Valor Líquido Desejado (R$)</label>
                <input
                  type="text"
                  value={valorDesejado}
                  onChange={(e) => setValorDesejado(formatCurrencyInput(e.target.value))}
                  placeholder="Ex: 100,00"
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Taxa da Maquininha (%)</label>
                <input
                  type="text"
                  value={taxa}
                  onChange={(e) => setTaxa(formatCurrencyInput(e.target.value))}
                  placeholder="Ex: 4,99"
                  className="w-full px-4 py-3 text-lg border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border flex flex-col justify-center">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-4">Solução</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Você deve cobrar na maquininha:</p>
                  <p className="text-3xl font-extrabold text-blue-700">R$ {formatCurrency(cobrarDoCliente.toFixed(2).replace('.', ','))}</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700">
                    A maquininha vai descontar: <span className="text-red-500 font-bold">R$ {formatCurrency(diferencaTx.toFixed(2).replace('.', ','))}</span>
                  </p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    E irá sobrar para você: <span className="text-emerald-600 font-bold">R$ {formatCurrency(valorLiquido.toFixed(2).replace('.', ','))}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdSense />
        
        <div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h2>Como usar a Calculadora da Taxa da Maquininha para Repasse?</h2>
          <p>Se você precisa garantir um valor líquido na sua conta após a venda e quer repassar os custos da maquininha para o cliente final, nossa <strong>calculadora de repasse de taxas online</strong> realiza a engenharia reversa instantaneamente. Insira primeiramente o <strong>Valor Líquido Desejado (R$)</strong> (ou seja, quanto você quer que efetivamente caia no seu extrato). Logo abaixo, insira a <strong>Taxa da Maquininha (%)</strong> aplicável àquela transação (débito, crédito à vista ou a soma do parcelamento embutido do seu equipamento Mercado Pago, PagSeguro, Stone, Ton, etc).</p>

          <h2>Como calcular corretamente o repasse da taxa da maquininha?</h2>
          <p>Saber calcular as taxas de juros de pagamento não é uma mera questão de somar o percentual. Comerciantes que utilizam maquininhas de cartão de crédito e débito (Cielo, InfinityPay, SumUp, Rede, SafraPay, etc.) para vender perdem uma pequena parcela por cada transação, conhecida no jargão técnico como MDR (Merchant Discount Rate) ou simplesmente a <strong>taxa fixa do cartão</strong>. Para pequenos autônomos, prestadores de serviços, pintores e oficinas que trabalham cravados com apertadas margens de lucro restritas, repassar pontualmente esse custo invisível de comodidade do dinheiro de plástico diretamente embutido para o cliente final se tornou uma saída vitalícia de sobrevivência.</p>

          <h3>Qual a fórmula correta do repasse de taxas na matemática financeira pura?</h3>
          <p>Muitos empreendedores quebram quando erram a lógica aqui e acham que um erro é simples adição básica. Exemplo errado cruelmente comum: se a taxa acordada do seu POS é 5% e seu serviço vale na tabela exatos 100 reais, muitos vendedores decidem somar diretamente os 5% que vira R$ 105,00 que são cobrados visualmente na tela da maquineta. No entanto, o sistema opera retirando a taxa por dentro: quando você passar R$ 105 ali, ela tirará 5% sobre 105 (e não sobre 100), o que desconta na tela dela R$ 5,25. Desse modo enviesado, você acaba recebendo R$ 99,75 (você teve um prejuízo residual oculto de R$ 0,25 e não recebeu o valor cheio).</p>
          
          <p><strong>A fórmula exata e indestrutível de Markup Financeiro Inverso (Markup-Divisor):</strong><br/>
          <code>Valor Idealizado a ser Cobrado no Visor = Valor Líquido / ((100 - Taxa%) / 100)</code><br/>
          Nossa calculadora utiliza silenciosamente nos bastidores esse divisor matemático inverso para descobrir com extrema precisão cibernética de quantos centavos extras o alvo deve subir o preço exposto na máquina para que, quando a credenciadora deduzir, arrancar e abocanhar a margem percentual comissionada por ela mesma, o restolho que respingue glorioso no seu extrato seja absoluto do zero: apenas o seu lucro íntegro combinado de balcão.</p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                É estritamente legal (permitido por lei) repassar escancaradamente a taxa da maquininha para o cliente final pagador?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                <strong>Sim, é perfeitamente lícito e ancorado em robusta regulamentação federal.</strong> Desde que a polêmica Lei Federal nº 13.455 entrou definitivamente em pleno vigor no Brasil no longínquo 2017, comerciantes gigantes ou nano prestadores de serviços de rua estão expressamente autorizados a cobrar deliberadamente e livremente preços diferenciados flutuando a precificação baseada dependendo do meio ou da roupagem do trâmite de pagamento exigido e amparado do eventual prazo ou alongamento de parcelamento (como crédito crivado, débito líquido, boleto rotineiro, vale-alimentação subsidiado ou Pix/Dinheiro vivo). O lojista contudo, por respeito basilar ao Código de Defesa das massas do Consumidor, deve apenas garantir informar e pregar essa alteração flutuante de forma didática e transparente prévia (nunca de emboscada), divulgando geralmente via placa, adesivo ou cartaz vistoso pendurado sobreposto a estrutura frontal do balcão de negociação do caixa.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Essa calculadora aqui funciona ou serve para as robustas vendas faturadas que são muito parceladas em carnê pelo cartão de crédito (Ex: de 10x ou 12x)?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A matemática dela aceita rigorosamente qualquer teto fracionado, logo essa suíte atua na resolução em bloco sim! No entanto preste uma máxima e dupla atenção em um enorme detalhe prático: você tem que procurar ou entrar antecipadamente no seu portal painel virtual dentro da sua adquirente/processadora e enxergar cirurgicamente com lupa "Qual a tabela de taxa cumulativa percentual cheia, absoluta total deduzida no apanhado dos doze meses" (essa seria a mescla agressiva combinando o MDR tradicional flat da simples modalidade do cartão crédito daquele banco emissor somada aos corrosivos juros da linha de crédito para antecipar a rodagem diária via D+1 e receber amanhã à vista o valor daquelas 12 esticadas parcelas que vão pingar distantes). Ao encontrar que esse pacotão maciço lhe corrói por exemplo 19,5% engloabado de tudo, basta cravar de primeira esse duro numeral aglutinado 19,5 cru no campo neutro '%' solitário da nossa calculadora para arrancar com maestria o seu veredito isolado.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
