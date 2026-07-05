const fs = require('fs');

const file = 'src/pages/tools/DiasUteis.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, Clock, FileText }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function DiasUteis() {", "export function DiasUteis() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Por que Calcular Diferenças de Dias Úteis?
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>A <strong>Calculadora de Dias Úteis</strong> é muito utilizada nas operações corporativas, logística, contabilidade e rotinas bancárias para definir prazos exatos que desconsideram sábados e domingos. Com ela, você não perderá a contagem ao prometer uma entrega de serviço para "dez dias úteis" ou programar vencimentos nos recibos e promissórias.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Contagem de Prazos Bancários e Comerciais
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Nas negociações em que se usa recibos (como na emissão de um <Link to="/nota-promissoria" className="text-emerald-600 hover:underline">Recibo de Sinal e Arras</Link>), o prazo para integralização muitas vezes é atrelado a <strong>dias úteis</strong>. Quando boletos caem em finais de semana, a legislação brasileira garante a postergação para o primeiro dia de expediente bancário seguinte.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Prazos Corridos x Prazos Úteis
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Seja transparente com seus clientes: diferencie o termo "dias corridos" (onde a contagem não para no final de semana) e "dias úteis". Contratos longos (30, 60, 90 dias) costumam usar dias corridos. Já entregas de e-commerce e processamentos de transferência financeira (TED/DOC, liquidação de boletos) operam restritamente sobre os dias úteis.</p>
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
                    question: "Sábado conta como dia útil?",
                    answer: "Depende. Para questões bancárias e prazos processuais e de entrega da maioria das transportadoras, sábado <strong>não</strong> é considerado dia útil. Contudo, para fins trabalhistas e pagamento de salário de algumas categorias, o sábado pode ser considerado dia útil."
                  },
                  {
                    question: "O que acontece quando o prazo de pagamento cai no final de semana?",
                    answer: "Geralmente, quando o vencimento de um boleto ou fatura cai num sábado, domingo ou feriado bancário, o pagamento pode ser efetuado no <strong>primeiro dia útil subsequente</strong>, sem acréscimo de juros ou multas (Lei 7.089/1983)."
                  },
                  {
                    question: "Como funciona o cálculo de adição de prazos?",
                    answer: "Se um contrato prevê entrega em '15 dias úteis', a calculadora começa na data inicial e avança 15 dias, pulando automaticamente todos os sábados e domingos para encontrar a data exata da entrega ou vencimento final."
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
