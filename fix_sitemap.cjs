const fs = require('fs');

const file = 'scripts/generate-sitemap.js';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('/leitor-decodificador-qr-code')) {
  code = code.replace(
    '"/gerador-qr-code-pix"',
    '"/gerador-qr-code-pix",\n  "/leitor-decodificador-qr-code"'
  );
  fs.writeFileSync(file, code);
}
