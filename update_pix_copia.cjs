const fs = require('fs');

const file = 'src/pages/tools/GeradorPixCopiaECola.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, QrCode }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function GeradorPixCopiaECola() {", "export function GeradorPixCopiaECola() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Funciona o Gerador de PIX Copia e Cola?
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O nosso gerador de <strong>PIX Copia e Cola</strong> é uma ferramenta online e gratuita que converte a sua Chave PIX e os dados de cobrança num código de texto longo padrão do Banco Central, conhecido como BR Code. Com ele, você envia cobranças exatas, evitando erros de digitação e facilitando o pagamento.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Vantagens de usar o PIX Copia e Cola nas suas cobranças
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Diferente de enviar apenas a sua chave PIX solta para o cliente, o código Copia e Cola embute dados fundamentais para a sua gestão financeira:</p>
                <ul>
                  <li><strong>Valor Fixo Embutido:</strong> Você já define o valor exato a ser pago, e o aplicativo bancário bloqueia a edição, garantindo o recebimento correto.</li>
                  <li><strong>Identificador da Compra:</strong> Permite adicionar uma descrição ou número de pedido que aparecerá no seu extrato bancário, agilizando a conciliação.</li>
                  <li><strong>Facilidade de Pagamento:</strong> O cliente não precisa digitar números, valores ou conferir chaves complexas; basta copiar e colar.</li>
                </ul>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <QrCode className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como criar o link PIX para enviar pelo WhatsApp?
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Para facilitar ainda mais a rotina de autônomos e empreendedores, a ferramenta permite enviar o PIX Copia e Cola diretamente via WhatsApp. Após gerar o código preenchendo sua chave e o valor, basta clicar no botão de copiar ou enviar diretamente pelo link gerado. Esse link PIX pode ser colado em mensagens, e-mails de cobrança, recibos de pagamento ou notas fiscais.</p>
                <h4>Onde usar o PIX Copia e Cola gerado?</h4>
                <p><strong>No Preenchimento de Recibos:</strong> Você pode colar o código gerado no rodapé dos recibos emitidos em nossa plataforma, incentivando o pagamento rápido e direto.</p>
                <p><strong>Em Faturas e Carnês:</strong> Se você gera faturas mensais (como serviços de contabilidade, aluguel, ou mensalidades escolares), o código Copia e Cola serve como um boleto moderno e sem taxas.</p>
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
                    question: "O que é PIX Copia e Cola?",
                    answer: "O PIX Copia e Cola é um código de texto (BR Code) que contém todas as informações de pagamento (Chave PIX, valor, nome e descrição). O pagador apenas copia esse texto, abre o aplicativo do banco e utiliza a opção 'PIX Copia e Cola' para efetuar o pagamento."
                  },
                  {
                    question: "É seguro gerar o código PIX Copia e Cola online?",
                    answer: "Sim, é totalmente seguro. A ferramenta apenas organiza as informações públicas da sua chave PIX no formato padrão do Banco Central (BR Code) e roda diretamente no seu navegador. Nenhuma informação pessoal ou bancária sensível é armazenada."
                  },
                  {
                    question: "Posso gerar PIX Copia e Cola com valor definido?",
                    answer: "Sim! Ao preencher o campo de valor no gerador, o código PIX Copia e Cola já incluirá a quantia exata. O pagador não precisará (nem poderá) alterar o valor na hora de transferir."
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

const searchStringStart = '<div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">';
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
