const fs = require('fs');

const file = 'src/pages/PixGenerator.tsx';
let code = fs.readFileSync(file, 'utf8');

// Inject imports if not present
if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp }");
  });
}

// Add state for FAQ
if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function PixGenerator() {", "export function PixGenerator() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Funciona o Gerador de QR Code PIX
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O <strong>Gerador de QR Code PIX</strong> é a solução online definitiva para você, lojista, vendedor autônomo, MEI ou prestador de serviços. Com esta ferramenta simples, você não precisa ditar sua chave verbalmente ou anotá-la num papel sujeito a erros. Basta criar um QR Code que o cliente aponta a câmera para pagar. Ele segue o padrão do Banco Central e gera também o link Pix Copia e Cola associado.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <QrCode className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Por que criar uma Plaquinha PIX com Valor Fixo ou Aberto?
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <ul>
                  <li><strong>Agilidade e Experiência do Cliente:</strong> O processo elimina digitação equivocada. O app de banco do consumidor lê a imagem instantaneamente e as chaves destinatárias são puxadas via BACEN.</li>
                  <li><strong>Controle e Segurança:</strong> Embutir o valor fixo garante que ninguém deposite um centavo a menos sem querer e facilita conferência e auditoria contábil.</li>
                  <li><strong>Flexibilidade de Vendas:</strong> Se o valor ficar aberto, você pode pregar a plaquinha no balcão e cada cliente insere o preço final após o acerto comercial (como numa padaria, consultório ou barbearia).</li>
                </ul>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Como Enviar a Cobrança por WhatsApp?
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Ao emitir a imagem na tela, nossa ferramenta permite baixar instantaneamente ou até mesmo copiar o código estático <em>"PIX Copia e Cola"</em>. Assim, além de você ter o QR Code impresso no balcão físico, você pode copiar esse texto e disparar em mensagens de texto para clientes remotos. Combine essa tática com o envio do nosso <Link to="/recibo-simples" className="text-emerald-600 hover:underline">Recibo Simples</Link>, facilitando a liquidação total de dívidas e boletos digitais.</p>
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
                    question: "O Gerador de QR Code PIX é seguro?",
                    answer: "Sim, é 100% seguro. Nossa ferramenta não pede senha, e-mail ou dados bancários de acesso, não armazena nenhuma transação, nem acessa seu dinheiro. Todo processo ocorre localmente no seu dispositivo transformando dados públicos numa codificação de imagem."
                  },
                  {
                    question: "Posso gerar o QR Code com o valor já definido?",
                    answer: "Sim. Você pode definir o valor exato no formulário. Se deixar o campo em branco, o pagador é quem digitará o valor no aplicativo do banco."
                  },
                  {
                    question: "Como imprimo a plaquinha PIX para meu negócio?",
                    answer: "Ao gerar o QR Code, você tem a opção de baixar a imagem diretamente. Você pode salvá-la no celular ou computador e imprimir em qualquer impressora, criando sua placa física ou adicionando num modelo PDF de cobrança ou recibo."
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

// replace the old prose block
code = code.replace(/<div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/s, seoReplacement + "\n    </div>\n  );\n}");
// wait, the regex for replacing the prose block might be tricky because of nested divs.
// let's do a substring replace.

const searchStringStart = '<div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 prose prose-emerald max-w-none">';
if (code.includes(searchStringStart)) {
  const startIndex = code.indexOf(searchStringStart);
  // find the final return ); }
  const endIndex = code.lastIndexOf('  );');
  code = code.substring(0, startIndex) + seoReplacement + "\n" + code.substring(endIndex);
}

// Extract Schema string to the top
const schemaRegex = /schema=\{`(\{.*?\})`\}/s;
const match = code.match(schemaRegex);
if (match) {
   const schema = match[1];
   code = code.replace(schemaRegex, "");
   // Add schema tag before SEO section
   code = code.replace('{/* SEO Content Section */}', `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: \`${schema}\` }} />\n      {/* SEO Content Section */}`);
}


fs.writeFileSync(file, code);
