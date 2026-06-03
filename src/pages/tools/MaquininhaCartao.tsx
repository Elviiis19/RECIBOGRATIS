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
          <h2>Como calcular o repasse da taxa da maquininha?</h2>
          <p>Comerciantes que utilizam maquininhas de cartão (Stone, PagSeguro, Cielo, Mercado Pago, Ton, InfinPay, Rede, etc.) para vender perdem uma pequena parcela por cada transação, conhecida como MDC (Merchant Discount Rate) ou simplesmente <strong>taxa do cartão</strong>. Para pequenos autônomos, prestadores de serviços e oficinas que trabalham com margens de lucro apertadas, repassar esse custo de comodidade diretamente para o cliente se tornou uma saída vitalícia.</p>

          <h3>A fórmula do repasse de taxas na matemática financeira</h3>
          <p>Um erro comum que os vendedores cometem é simplesmente adicionar a taxa da máquina sobre o valor total. Exemplo errado: se a taxa é 5% e seu serviço é 100 reais, somar os 5% vira 105 reais. No entanto, quando você passar R$ 105 na máquina, ela tirará 5% sobre 105, que dá 5,25. Você acaba recebendo R$ 99,75 (você teve um prejuízo e não recebeu o valor cheio).</p>
          
          <p><strong>A fórmula exata e correta de Markup Financeiro:</strong><br/>
          <code>Valor a ser Cobrado = Valor Líquido / ((100 - Taxa%) / 100)</code><br/>
          Nossa calculadora utiliza o divisor inverso para descobrir exatamente de quantos reais deve ser o aumento no visor da maquininha para que, quando ela roubar a margem combinada por ela mesma, o que respingue no seu extrato seja cirurgico do zero da direita à esquerda: o seu lucro puro.</p>

          <hr className="my-8" />
          
          <h2>Perguntas Frequentes (FAQ)</h2>
          
          <div className="space-y-4 not-prose mt-6">
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                É legal (permitido por lei) repassar a taxa da maquininha para o cliente final?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                <strong>Sim.</strong> Desde que a Lei 13.455/2017 entrou em vigor em nosso país, comerciantes e prestadores de serviços estão autorizados formalmente a cobrar preços diferenciados dependendo do meio de pagamento e do prazo ou parcelamento (como crédito, débito, boleto, ou dinheiro/PIX). O lojista contudo, deve informar essa flutuação de forma transparente, geralmente via cartaz sobre o balcão do caixa.
              </p>
            </details>
            
            <details className="group bg-gray-50 rounded-xl p-6 border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                Essa calculadora funciona para vendas parceladas no crédito?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Sim, você basta que você saiba do portal da sua adquirente qual a taxa cumulativa exata total (a taxa da modalidade do crédito parcelado em X vezes somada ao CDI da parcela se por ventura antecipada). Insira o juros total consolidado no campo "%" da nossa calculadora e veja quanto passar na maquineta.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
