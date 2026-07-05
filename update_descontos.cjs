const fs = require('fs');

const file = 'src/pages/tools/DescontosMultas.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, Clock, Calculator }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function DescontosMultas() {", "export function DescontosMultas() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Calcular Multa e Juros por Atraso de Pagamento
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>A calculadora de atrasos e descontos é essencial para lojistas, prestadores de serviços e locadores que precisam atualizar o valor de cobranças vencidas, recibos e notas promissórias ou conceder um abatimento em compras à vista. O sistema computa os valores seguindo as diretrizes básicas matemáticas e de consumo.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Regras do Código de Defesa do Consumidor (CDC)
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Ao emitir cobranças contra pessoas físicas em relações de consumo (mensalidades, cursos, produtos), você está restrito pela lei (Art. 52, § 1° do CDC): a multa máxima permitida para atraso é de <strong>2% (dois por cento)</strong> e os juros de mora não devem ultrapassar <strong>1% ao mês</strong>, a menos que estipulado diversamente em contratos específicos permitidos por lei.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Cálculo Pro Rata Die (Juros Diários)
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O termo <em>pro rata die</em> significa "proporcional ao dia". Quando o cliente atrasa 5 dias, você não cobra o juro cheio do mês, mas sim a fração diária. Com um juro padrão de 1% ao mês, a taxa diária é de aproximadamente 0,0333%. Ao preencher a nossa calculadora com os dias de atraso e a taxa mensal, ela converte e aplica exatamente os juros pro rata die de forma correta.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Calcular Descontos Percentuais
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Na negociação com fornecedores ou clientes, saber calcular um desconto rápido é fundamental. O percentual de desconto é transformado numa fração decimal e multiplicado pelo valor base. Por exemplo, conceder um abatimento por pagamento antecipado em um Recibo Simples de prestação de serviço garantirá rapidez e menos inadimplência.</p>
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
                    question: "Qual é o limite de multa por atraso permitido por lei?",
                    answer: "De acordo com o Código de Defesa do Consumidor (CDC), para relações de consumo, a multa de mora por atraso de pagamento não pode ser superior a <strong>2% do valor da prestação</strong>. Para contratos entre empresas (B2B) e condomínios, outras regras podem se aplicar (frequentemente 2% também)."
                  },
                  {
                    question: "O que são juros de mora 'pro rata die'?",
                    answer: "São os juros cobrados de forma proporcional aos dias de atraso. Normalmente o limite legal (sem contrato específico) é de 1% ao mês. Assim, divide-se 1% por 30 dias para encontrar a taxa diária (0,033% ao dia) e multiplica-se pelos dias corridos em atraso."
                  },
                  {
                    question: "Como funciona o cálculo do desconto?",
                    answer: "A ferramenta pega o valor percentual, divide por 100 e multiplica pelo valor base. Por exemplo: um desconto de 15% sobre R$ 200 é igual a 0,15 * 200 = R$ 30, gerando um preço final de R$ 170."
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
