const fs = require('fs');

const file = 'src/pages/tools/ValidadorCpfCnpj.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function ValidadorCpfCnpj() {", "export function ValidadorCpfCnpj() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como funciona a Validação de CPF e CNPJ?
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O <strong>Validador de CPF e CNPJ</strong> verifica matematicamente a estrutura dos números inseridos. No Brasil, todo documento oficial conta com uma sequência lógica terminada com um ou dois dígitos de verificação, desenhados para mitigar erros comuns de digitação por seres humanos e identificar adulterações primárias.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                O papel do Dígito Verificador
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Os dois últimos números de um CPF ou de um CNPJ servem exclusivamente como trava de segurança. Um algoritmo padrão pega todos os números anteriores, multiplica-os por pesos diferentes e encontra o que devem ser os números finais. Se você inserir um CPF falso como <em>111.111.111-11</em>, a ferramenta logo avisará que é inválido.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Formatador e Removedor de Máscaras (Pontuação)
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Frequentemente, plataformas de governo ou notas fiscais (NF-e, NFS-e) exigem que o cadastro da pessoa jurídica vá apenas com números limpos (sem os pontos, traços e barras). Com a funcionalidade de nosso painel de formatar ou limpar, você transita da máscara legível <em>00.000.000/0001-00</em> para a leitura estrita de máquina <em>00000000000100</em> num simples clique, otimizando o envio e integração nas ferramentas burocráticas e emissão de recibos e carnês.</p>
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
                    question: "O que é um CPF ou CNPJ inválido?",
                    answer: "Um documento é considerado matematicamente inválido quando seus dois últimos dígitos (Dígitos Verificadores) não correspondem à conta matemática atrelada aos primeiros números. Ele é pego em formulários e no site da Receita."
                  },
                  {
                    question: "Esse validador consulta o nome e situação na Receita Federal?",
                    answer: "Não. Esta ferramenta não realiza consultas na base de dados da Receita Federal (como status 'Regular' ou 'Cancelado'). Ela apenas executa o <strong>algoritmo de validação matemática</strong> universal de geração de dígitos verificadores para atestar que o CPF/CNPJ estruturalmente faz sentido e pode existir."
                  },
                  {
                    question: "Por que devo validar o documento antes de emitir o recibo?",
                    answer: "Erros de digitação são comuns. Validar a máscara e o algoritmo do documento impede que você preencha e assine um contrato, nota promissória ou recibo comercial com um CPF incorreto do seu cliente."
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
