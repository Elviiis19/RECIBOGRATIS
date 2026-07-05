const fs = require('fs');

const file = 'src/pages/tools/RetencaoImpostos.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, FileText }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function RetencaoImpostos() {", "export function RetencaoImpostos() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Funciona a Retenção de Impostos na Fonte?
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>A retenção na fonte é um mecanismo onde o governo antecipa o recebimento de impostos. Em vez de o prestador de serviços (autônomo ou empresa) pagar os impostos no final do mês ou do ano, a empresa que o contratou efetua o desconto já no momento do pagamento e repassa esse valor ao governo. A nossa calculadora gratuita ajuda a simular o <strong>valor líquido</strong> exato da sua Nota Fiscal ou Recibo de Pagamento Autônomo (RPA).</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                O que significa IRRF, INSS, ISS e PCC?
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <ul>
                  <li><strong>IRRF (Imposto de Renda Retido na Fonte):</strong> Retido na fonte tanto para pessoas físicas quanto jurídicas (em atividades específicas). As alíquotas variam de 1% a 1,5% para empresas.</li>
                  <li><strong>INSS:</strong> Contribuição previdenciária. No caso de serviços entre Pessoas Jurídicas (cessão de mão de obra), costuma ser de 11%. Para RPA, varia conforme as tabelas vigentes.</li>
                  <li><strong>ISS (Imposto Sobre Serviços):</strong> É o imposto municipal, com alíquotas que variam entre 2% e 5%, dependendo da cidade e do tipo de serviço. Pode ser retido pelo tomador dependendo da localidade de prestação.</li>
                  <li><strong>PCC:</strong> Refere-se à contribuição social retida unificadamente na alíquota de 4,65%, que engloba PIS, COFINS e CSLL (aplica-se a serviços profissionais).</li>
                </ul>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Calcular o Valor Líquido da Nota Fiscal
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O valor líquido a receber é calculado subtraindo o total das retenções aplicáveis do valor bruto dos serviços. Exemplo: para um serviço de R$ 10.000,00 onde há 4,65% de PCC (R$ 465,00) e 1,5% de IRRF (R$ 150,00), o valor líquido depositado será de R$ 9.385,00.</p>
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
                    question: "O que são impostos retidos na fonte?",
                    answer: "São tributos que a empresa contratante deve descontar do valor pago ao prestador de serviços e recolher diretamente aos cofres públicos. O prestador recebe o valor 'líquido', descontados esses impostos."
                  },
                  {
                    question: "O que é PCC (PIS, COFINS, CSLL)?",
                    answer: "PCC é a sigla para a retenção conjunta de PIS (0,65%), COFINS (3,0%) e CSLL (1,0%), totalizando 4,65% aplicados sobre serviços profissionais prestados por Pessoas Jurídicas (dependendo das regras da Receita Federal)."
                  },
                  {
                    question: "Empresas do Simples Nacional sofrem retenção de IRRF e PCC?",
                    answer: "Via de regra, prestadores de serviço optantes pelo Simples Nacional <strong>estão dispensados</strong> da retenção na fonte do IRRF e do PCC (PIS/COFINS/CSLL). O ISS e o INSS, no entanto, podem sofrer retenções dependendo da atividade e legislação municipal."
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
