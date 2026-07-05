const fs = require('fs');

const files = [
  'src/pages/tools/ConsultadorIbge.tsx',
  'src/pages/tools/ConversorHoras.tsx',
  'src/pages/tools/DescontosMultas.tsx',
  'src/pages/tools/DiasUteis.tsx',
  'src/pages/tools/GeradorPixCopiaECola.tsx',
  'src/pages/tools/MaquininhaCartao.tsx',
  'src/pages/tools/RetencaoImpostos.tsx',
  'src/pages/tools/ValidadorCpfCnpj.tsx',
  'src/pages/tools/ValorPorExtenso.tsx',
];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Find the lucide-react import
  const match = code.match(/import \{([^}]*?)\} from 'lucide-react';/);
  if (match) {
    const importsStr = match[1];
    // Split, trim, remove empty, and unique
    const imports = Array.from(new Set(importsStr.split(',').map(s => s.trim()).filter(Boolean)));
    code = code.replace(match[0], `import { ${imports.join(', ')} } from 'lucide-react';`);
    fs.writeFileSync(file, code);
  }
}
