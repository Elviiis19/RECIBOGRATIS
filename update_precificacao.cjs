const fs = require('fs');

let code = fs.readFileSync('src/pages/tools/CalculadoraPrecificacao.tsx', 'utf8');

const faqSchemaAndSection = `  const faqs = [
    {
      question: "O que é Markup e por que usar?",
      answer: "Markup é um índice utilizado para encontrar o preço de venda correto de um produto ou serviço. Ele garante que o preço cobrado seja suficiente para cobrir os custos de produção, as despesas fixas/variáveis e ainda sobrar a margem de lucro líquido que você deseja, evitando prejuízos invisíveis."
    },
    {
      question: "Qual a diferença entre Margem de Lucro e Markup?",
      answer: "A margem de lucro é a porcentagem que você ganha sobre o valor final da venda. O markup é a ferramenta (índice multiplicador ou divisor) aplicada sobre o custo de compra para se chegar a esse valor de venda final."
    },
    {
      question: "Por que não posso apenas somar 50% de lucro ao custo?",
      answer: "Porque o lucro é calculado sobre o preço de venda, não sobre o custo. Se um produto custa R$ 100 e você soma 50% (R$ 50), você vende por R$ 150. Porém, R$ 50 representa apenas 33% de R$ 150. Se suas despesas forem 30%, vai sobrar apenas 3% de lucro real para você. A calculadora de markup corrige esse erro matemático."
    },
    {
      question: "O que incluir nas despesas?",
      answer: "Sume todas as porcentagens que incidem sobre a venda: impostos (Simples Nacional, ICMS), taxas da maquininha de cartão, comissões de vendedores e uma estimativa percentual de rateio das despesas fixas (aluguel, luz)."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema Inject:
`;

if (!code.includes("faqs.map")) {
  code = code.replace("export function CalculadoraPrecificacao() {", "import { ChevronDown, ChevronUp } from 'lucide-react';\n\nexport function CalculadoraPrecificacao() {\n" + faqSchemaAndSection);
  
  const schemaStr = `
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>

      <div className="bg-emerald-700 text-white py-16 px-4">`;
      
  code = code.replace('<div className="bg-emerald-700 text-white py-16 px-4">', schemaStr);

  const faqHtml = `
        {/* FAQs */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dúvidas Frequentes sobre Precificação</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-emerald-200"
              >
                <button
                  type="button"
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-emerald-50/50 transition-colors"
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
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`;

  code = code.replace(/      <\/div>\n    <\/div>\n  \);\n}/g, faqHtml);
  fs.writeFileSync('src/pages/tools/CalculadoraPrecificacao.tsx', code);
  console.log("Updated CalculadoraPrecificacao");
}
