const fs = require('fs');

const file = 'src/pages/tools/CalculadoraPrecificacao.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("CheckCircle2")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", CheckCircle2, ShieldCheck, Calculator }");
  });
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como calcular o Preço de Venda corretamente?
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Muitos empreendedores cometem um erro grave na hora de precificar: pegar o custo do produto e apenas somar a porcentagem de lucro desejada. Esse método está errado e pode causar prejuízos ocultos!</p>
                <p>O cálculo correto exige o uso de uma técnica chamada <strong>Markup Divisor</strong>, que encontra um preço de venda no qual caibam todas as despesas (impostos, taxas, comissões) e o custo do produto, sobrando exatamente a margem de lucro que você definiu na proporção correta do faturamento.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                A diferença entre Markup e Margem de Lucro
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <ul>
                  <li><strong>Margem de Lucro:</strong> É o valor que sobra para você, calculado <em>sobre o preço de venda</em>.</li>
                  <li><strong>Markup:</strong> É um índice (multiplicador ou divisor) aplicado <em>sobre o custo</em> do produto para se chegar ao preço de venda.</li>
                </ul>
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

fs.writeFileSync(file, code);
