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
  
  // replace the last </div> before ); with </> if it's there
  if (code.match(/<\/section>\s*<\/div>\s*\);\s*}/)) {
    code = code.replace(/<\/section>\s*<\/div>\s*\);\s*}/, "</section>\n    </>\n  );\n}");
  } else if (code.match(/<\/section>\s*<\/div>\s*<\/div>\s*\);\s*}/)) {
    code = code.replace(/<\/section>\s*<\/div>\s*<\/div>\s*\);\s*}/, "</section>\n    </>\n  );\n}");
  }
  
  fs.writeFileSync(file, code);
}
