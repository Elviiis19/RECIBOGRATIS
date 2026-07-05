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
  
  // replace `<AdSense />\n` with `<AdSense />\n      </div>\n` if it's currently missing the div close.
  // Wait, some might have it already? No, the tag counts show they are exactly 1 short.
  // Let's just insert </div> right before the <script type="application/ld+json"
  
  if (code.includes('<script type="application/ld+json"')) {
    code = code.replace(/<script type="application\/ld\+json"/, "      </div>\n      <script type=\"application/ld+json\"");
  } else {
    // If there is no schema script, insert before <section className="py-16
    code = code.replace(/<section className="py-16/, "      </div>\n      <section className=\"py-16");
  }
  
  fs.writeFileSync(file, code);
}
