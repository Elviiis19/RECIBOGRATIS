const fs = require('fs');

const file = 'src/pages/tools/ControleFiados.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("CheckCircle2")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", CheckCircle2, ShieldCheck, Wallet }");
  });
}

const seoReplacement = `        {/* SEO Content Section */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12 rounded-3xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              <article>
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Por que aposentar a caderneta de papel?
                </h2>
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>Anotar as dívidas e os "fiados" dos clientes num caderno de papel é uma prática centenária, mas extremamente vulnerável. Cadernos molham, são perdidos ou têm páginas rasgadas, gerando prejuízos incalculáveis para padarias, mercearias, autônomos e pequenas lojas.</p>
                  <p>Com o <strong>Controle de Fiados Digital</strong>, você mantém um registro seguro no seu próprio aparelho e nunca mais perde a conta de quem te deve.</p>
                </div>
              </article>

              <article>
                <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Privacidade Total: Sem Nuvem
                </h3>
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>A privacidade financeira dos seus clientes é coisa séria. Nós não enviamos nenhum dado preenchido no nosso painel para servidores na internet (nuvem). Toda a sua carteira de clientes devedores e valores ficam guardados na memória local do seu navegador e só você tem acesso.</p>
                </div>
              </article>

              <article>
                <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Wallet className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                  Cobrança Inteligente via WhatsApp
                </h3>
                <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                  <p>Cobrar um cliente pessoalmente pode gerar constrangimento. Nosso sistema de controle de fiados tem um botão dedicado ao WhatsApp que formata automaticamente uma mensagem cordial, amigável, com o valor exato da dívida, agilizando o seu recebimento e mantendo a relação boa com o freguês.</p>
                </div>
              </article>

              <hr className="border-gray-100" />

              <article>
                <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-8">
                  Dúvidas Frequentes sobre Fiado
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

const searchStringStart = '{/* FAQs */}';
if (code.includes(searchStringStart)) {
  const startIndex = code.indexOf(searchStringStart);
  const endIndex = code.lastIndexOf('  );');
  code = code.substring(0, startIndex) + seoReplacement + "\n      </div>\n" + code.substring(endIndex);
}

fs.writeFileSync(file, code);
