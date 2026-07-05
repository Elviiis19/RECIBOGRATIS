const fs = require('fs');
let code = fs.readFileSync('src/pages/AllTools.tsx', 'utf8');

const newTools = `
    {
      title: 'Gerador de Carnê',
      description: 'Gere páginas de carnê em PDF (com canhoto e parcelas) para imprimir e entregar ao seu cliente mensalmente.',
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      link: '/gerador-carne-pagamento',
      color: 'bg-blue-50 text-blue-700 border-blue-100',
      hover: 'hover:border-blue-300 hover:shadow-md'
    },
    {
      title: 'Precificação / Markup',
      description: 'Insira o custo e a margem de lucro para descobrir exatamente por quanto deve vender seu produto para não ter prejuízo.',
      icon: <Calculator className="w-8 h-8 text-indigo-600" />,
      link: '/calculadora-precificacao-produtos',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      hover: 'hover:border-indigo-300 hover:shadow-md'
    },
    {
      title: 'Cálculo de Hora Extra',
      description: 'Calcule online o valor exato das suas horas extras (50% e 100%) e adicional noturno com base no seu salário.',
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      link: '/calculadora-hora-extra',
      color: 'bg-amber-50 text-amber-700 border-amber-100',
      hover: 'hover:border-amber-300 hover:shadow-md'
    },
    {
      title: 'Controle de Fiados',
      description: 'Caderneta virtual: Anote vendas fiado, controle quem está te devendo e gere links de cobrança PIX pelo WhatsApp.',
      icon: <Book className="w-8 h-8 text-teal-600" />,
      link: '/controle-de-fiados',
      color: 'bg-teal-50 text-teal-700 border-teal-100',
      hover: 'hover:border-teal-300 hover:shadow-md'
    },
`;

if (!code.includes("Gerador de Carnê")) {
  code = code.replace("const tools = [", "const tools = [" + newTools);
  if (!code.includes("Book")) {
    code = code.replace("import { \n  Calculator,", "import { Book, \n  Calculator,");
  }
  fs.writeFileSync('src/pages/AllTools.tsx', code);
  console.log("Updated AllTools.tsx");
}
