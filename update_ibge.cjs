const fs = require('fs');

const file = 'src/pages/tools/ConsultadorIbge.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes("ChevronDown")) {
  code = code.replace(/import \{.*?\} from 'lucide-react';/s, (match) => {
    return match.replace("}", ", ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, FileText, MapPin }");
  });
}

if (!code.includes("const [openFaq, setOpenFaq] = useState")) {
  code = code.replace("export function ConsultadorIbge() {", "export function ConsultadorIbge() {\n  const [openFaq, setOpenFaq] = useState<number | null>(null);\n");
}

const seoReplacement = `      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <article>
              <h2 className="text-3xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Por que consultar o Código IBGE de Municípios?
              </h2>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O <strong>Consultador de Código IBGE</strong> é uma ferramenta imprescindível para profissionais de logística, tecnologia da informação, contadores e empreendedores em fase de parametrização de seus sistemas de emissão de faturamento ERP (como NF-e e CT-e) no ambiente da SEFAZ nacional.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Evitando problemas com municípios homônimos
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>O Brasil possui uma grande complexidade e muitas cidades com o mesmo exato nome espalhadas por estados diferentes (ex: "Bom Jesus", "São Domingos"). Para o banco de dados do governo não correr riscos de taxar e atribuir ISS ou ICMS ao cofre da prefeitura/estado errado, a burocracia brasileira não usa textos abertos, e sim uma referência absoluta irrevogável: os <strong>7 dígitos da tabela IBGE</strong>.</p>
              </div>
            </article>

            <article>
              <h3 className="text-2xl tracking-tight font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                Integração Tributária e Emissão de Notas Fiscais
              </h3>
              <div className="prose prose-lg prose-emerald max-w-none text-gray-600 leading-relaxed">
                <p>Quando uma empresa prestadora de serviços, autônoma ou LTDA é configurada num portal da prefeitura local, tanto o local da prestação do serviço, quanto o endereço das partes envolvidas exigirão que o código numérico (a famigerada tag <em>&lt;cMun&gt;</em> do XML) represente as posições únicas geográficas sem erros ou falhas de formatação sistêmica e pontual.</p>
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
                    question: "O que é o Código de Município IBGE?",
                    answer: "É uma sequência numérica única de 7 dígitos que identifica, sem margem a ambiguidades, cada um dos 5.570 municípios brasileiros e os 27 estados. É a chave primária geográfica do país."
                  },
                  {
                    question: "Onde o Código IBGE de 7 dígitos é utilizado?",
                    answer: "O uso principal ocorre nas secretarias estaduais da fazenda (SEFAZ). Em toda emissão de conhecimento e documento fiscal brasileiro eletrônico (NF-e, NFS-e, NFC-e, CT-e), você não pode usar o nome da cidade no XML, sendo obrigatório preencher a tag &lt;cMun&gt; com o código de 7 dígitos."
                  },
                  {
                    question: "O que significa cada parte do código IBGE do Município?",
                    answer: "Os dois primeiros dígitos referem-se à Unidade da Federação (UF/Estado). Os cinco dígitos seguintes determinam unicamente a cidade dentro desse estado. Por exemplo, em '3550308' (São Paulo-SP), o '35' representa o Estado de São Paulo."
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
