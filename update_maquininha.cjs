const fs = require('fs');

const file = 'src/pages/tools/MaquininhaCartao.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, CreditCard, Calculator }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function MaquininhaCartao() {", "export function MaquininhaCartao() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Calcular as Taxas da Maquininha de Cartão
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>A <strong>Calculadora de Maquininha de Cartão</strong> é a ferramenta ideal para autônomos, MEIs e empreendedores simularem o impacto das tarifas cobradas por operadoras de cartão de crédito e débito (como PagSeguro, Stone, Mercado Pago, Cielo, SumUp, Ton) no seu fluxo de caixa.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Descontar da Venda vs Repassar a Taxa
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <ul>
                  <li><strong>Descontar (Assumir a Taxa):</strong> O cliente vê apenas o valor de etiqueta. Essa estratégia atrai o consumidor e evita atritos na hora da cobrança, mas reduz sua margem de lucro final. O empreendedor inteligente já inclui a taxa da maquininha no preço base (precificação embutida).</li>
                  <li><strong>Repassar (Cobrar do Cliente):</strong> Você garante que receberá a quantia exata que orçou, enquanto o cliente paga a tarifa financeira. É muito comum no comércio de veículos, materiais de construção e atacadistas, onde a margem é estreita.</li>
                </ul>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como a matemática de repasse funciona?
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Muitos empreendedores cometem o erro de apenas somar a taxa da operadora ao preço do produto. Exemplo errado: Produto de R$ 1.000 + 10% da maquininha = Cobrar R$ 1.100. Contudo, a operadora vai cobrar 10% sobre os R$ 1.100 (ou seja, R$ 110). Você acabará recebendo R$ 990 (prejuízo de R$ 10,00). O correto é usar o <strong>cálculo de markup (preço reverso)</strong> que nossa ferramenta faz automaticamente, informando que você precisa cobrar R$ 1.111,11.</p>
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
                    question: "É legal repassar a taxa da maquininha para o cliente?",
                    answer: "Sim. A Lei 13.455/2017 autorizou a diferenciação de preços de bens e serviços oferecidos ao público em função do prazo ou do instrumento de pagamento utilizado. Ou seja, você pode cobrar um valor diferente no PIX/dinheiro e no Cartão de Crédito."
                  },
                  {
                    question: "O que significa 'Descontar da Venda'?",
                    answer: "Significa que o lojista vai absorver o custo da tarifa. Se a venda for R$ 100,00 com taxa de 5%, você recebe R$ 95,00 e a operadora do cartão fica com R$ 5,00. O cliente paga apenas R$ 100,00."
                  },
                  {
                    question: "Como repassar a taxa da maquininha garantindo que receberei o valor cheio?",
                    answer: "Use o recurso 'Repassar ao cliente' em nossa calculadora. A fórmula matemática divide o valor desejado pelo fator multiplicador da taxa (ex: se a taxa é 5%, o fator é 0,95). Receber R$ 100 / 0,95 = Cobrar R$ 105,26. Assim, 5% de R$ 105,26 dá R$ 5,26 para a operadora, sobrando exatos R$ 100,00 para você."
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
                      className={\`px-6 overflow-hidden transition-all duration-300 ease-in-out \${
                        openFaq === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                      }\`}
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
`;

const searchStringStart = '<div className="prose prose-emerald max-w-none mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">';
if (code.includes(searchStringStart)) {
  const startIndex = code.indexOf(searchStringStart);
  const endIndex = code.lastIndexOf('  );');
  code = code.substring(0, startIndex) + seoReplacement + "\n    </div>\n" + code.substring(endIndex);
}

const schemaRegex = /schema=\{`(\{.*?\})`\}/s;
const match = code.match(schemaRegex);
if (match) {
   const schema = match[1];
   code = code.replace(schemaRegex, "");
   code = code.replace('{/* SEO Content Section */}', `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${schema}\` }} />\n      {/* SEO Content Section */}`);
}

fs.writeFileSync(file, code);
