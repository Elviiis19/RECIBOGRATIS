const fs = require('fs');

let code = fs.readFileSync('src/pages/tools/ControleFiados.tsx', 'utf8');

const faqSchemaAndSection = `  const faqs = [
    {
      question: "O que é o Controle de Fiados?",
      answer: "O Controle de Fiados (caderneta digital) é uma ferramenta para registrar vendas a prazo na confiança para seus clientes. Ele substitui o tradicional caderno de papel, permitindo que você acompanhe quem deve, quanto deve e registre os pagamentos parciais ou totais."
    },
    {
      question: "Os dados ficam salvos onde?",
      answer: "Os dados ficam salvos no seu próprio navegador (Local Storage). Se você limpar o histórico do navegador ou acessar de outro celular, as informações não estarão lá. Para maior segurança, exporte seus dados para PDF ou imprima com frequência."
    },
    {
      question: "Posso cobrar juros sobre vendas fiadas?",
      answer: "Sim, porém é importante que o cliente esteja ciente disso no momento da compra. Recomendamos emitir notas promissórias ou carnês para formalizar a dívida se os valores forem altos."
    },
    {
      question: "A ferramenta é gratuita?",
      answer: "Sim! Nosso controle de caderneta de clientes é 100% gratuito e não possui limite de clientes ou registros."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema Inject:
`;

if (!code.includes("faqs.map")) {
  code = code.replace("export function ControleFiados() {", "import { ChevronDown, ChevronUp } from 'lucide-react';\n\nexport function ControleFiados() {\n" + faqSchemaAndSection);
  
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dúvidas Frequentes sobre Fiado</h2>
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
  fs.writeFileSync('src/pages/tools/ControleFiados.tsx', code);
  console.log("Updated ControleFiados");
}
