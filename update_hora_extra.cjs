const fs = require('fs');

let code = fs.readFileSync('src/pages/tools/CalculadoraHoraExtra.tsx', 'utf8');

const faqSchemaAndSection = `  const faqs = [
    {
      question: "Qual o adicional mínimo para horas extras?",
      answer: "Pela legislação trabalhista brasileira (CLT), a hora extra em dias normais (segunda a sábado) deve ter um adicional de no mínimo 50% sobre o valor da hora normal."
    },
    {
      question: "Qual o valor da hora extra no domingo e feriado?",
      answer: "O trabalho prestado em domingos (que não seja escala de revezamento) e feriados deve ser pago em dobro, ou seja, com adicional de 100% sobre o valor da hora normal."
    },
    {
      question: "O que é divisor 220?",
      answer: "É o divisor padrão para quem trabalha 44 horas semanais (8 horas por dia + 4h no sábado). Para encontrar o valor da sua hora normal, o salário bruto é dividido por 220."
    },
    {
      question: "As horas extras refletem em outros benefícios?",
      answer: "Sim! Se você faz horas extras com frequência, elas geram o chamado DSR (Descanso Semanal Remunerado) e também refletem no cálculo de férias, 13º salário e FGTS."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema Inject:
`;

if (!code.includes("faqs.map")) {
  code = code.replace("export function CalculadoraHoraExtra() {", "import { ChevronDown, ChevronUp } from 'lucide-react';\n\nexport function CalculadoraHoraExtra() {\n" + faqSchemaAndSection);
  
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dúvidas Frequentes sobre Hora Extra</h2>
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
  fs.writeFileSync('src/pages/tools/CalculadoraHoraExtra.tsx', code);
  console.log("Updated CalculadoraHoraExtra");
}
