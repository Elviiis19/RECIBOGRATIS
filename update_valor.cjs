const fs = require('fs');

const file = 'src/pages/tools/ValorPorExtenso.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp, FileText }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function ValorPorExtenso() {", "export function ValorPorExtenso() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Escrever Valores por Extenso em Reais
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O conversor de valor por extenso é uma ferramenta online gratuita criada para transformar instantaneamente quantias numéricas em texto escrito (reais e centavos). No Brasil, escrever o valor literal é uma obrigação formal em documentos com validade jurídica, incluindo preenchimento de recibos de pagamento, cheques, notas promissórias e contratos comerciais.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Type className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Regras Gramaticais para Escrever Dinheiro
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <h4>Uso da Conjunção "E"</h4>
                <p>A conjunção aditiva "e" deve ser usada para separar os reais dos centavos (ex: <em>dez reais e cinquenta centavos</em>) e também entre as centenas, dezenas e unidades (ex: <em>cento e vinte e cinco reais</em>). No entanto, entre os milhares e as centenas, não é obrigatório o uso do "e", exceto quando a centena terminar em zeros (ex: <em>dois mil e cem reais</em>, mas <em>dois mil trezentos e quarenta reais</em>).</p>
                <h4>Cem ou Cento?</h4>
                <p>Utilize "cem" apenas quando for uma centena exata e redonda. Se houver dezenas ou unidades acompanhando, deve-se usar "cento". Por exemplo: R$ 100,00 (cem reais), mas R$ 105,00 (cento e cinco reais).</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Importância Jurídica do Valor por Extenso
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O preenchimento adequado do valor por extenso é o seu principal mecanismo de proteção contra fraudes, rasuras e adulterações de valores. Um número arábico num recibo impresso (R$ 1.500,00) pode ser facilmente alterado (R$ 11.500,00). Ao documentar textualmente como "um mil e quinhentos reais", a divergência é eliminada e a segurança legal é garantida.</p>
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
