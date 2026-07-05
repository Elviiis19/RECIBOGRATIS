const fs = require('fs');

const file = 'src/pages/tools/ConversorHoras.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp, CheckCircle2, Clock, Calculator, FileText }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function ConversorHoras() {", "export function ConversorHoras() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Converter e Calcular Horas Trabalhadas
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O <strong>Conversor de Horas em Decimal</strong> é fundamental para freelancers, prestadores de serviços, RH e autônomos que cobram pelos serviços baseados no tempo gasto (tarifa por hora). O formato de relógio (horas e minutos) não funciona corretamente em calculadoras convencionais de dinheiro.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Por que converter de HH:MM para Decimais?
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O sistema temporal é sexagesimal (base de 60 minutos), enquanto o nosso sistema financeiro e monetário é decimal (base de 100 centavos). Se você cobrar R$ 50,00 por hora e trabalhou 2 horas e 30 minutos (2:30), multiplicando diretamente na calculadora (50 x 2,30), o resultado seria R$ 115,00. <strong>Isso está errado!</strong> O cálculo correto exige que as 2h30 virem 2,5 horas. Assim: 50 x 2,5 = R$ 125,00.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Uso em Folhas de Pagamento e Recibos
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Na hora de emitir um <Link to="/recibo-de-prestacao-de-servicos" className="text-emerald-600 hover:underline">Recibo de Prestação de Serviços</Link> com serviços por hora, transcreva os tempos centesimais para assegurar que a remuneração pela carga horária (incluindo quebras como 15, 20 ou 45 minutos de trabalho excedente) receba exatamente a proporção correta devida pelo contratante.</p>
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
                    question: "O que são horas centesimais ou decimais?",
                    answer: "O formato padrão relógio usa 60 minutos (HH:MM). O formato decimal/centesimal converte os minutos numa fração baseada em 100, permitindo realizar cálculos de pagamento. Exemplo: 1h30 (relógio) equivale a 1,5 horas (decimal)."
                  },
                  {
                    question: "Como converter minutos em decimais na calculadora à mão?",
                    answer: "A regra matemática é simples: pegue os minutos trabalhados e divida por 60. Exemplo: se você trabalhou 45 minutos. 45 ÷ 60 = 0,75. Então, 2 horas e 45 minutos viram 2,75 horas decimais."
                  },
                  {
                    question: "Como calcular o valor total de uma diária ou hora extra?",
                    answer: "Primeiro, converta as horas do relógio em horas decimais. Em seguida, multiplique o resultado pela sua tarifa horária (R$/hora). É assim que os contadores e os relógios de ponto calculam as folhas de pagamento exatas."
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
