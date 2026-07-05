const fs = require('fs');

const file = 'src/App.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('import { LeitorQrCode }')) {
  code = code.replace(
    "import { GeradorPixCopiaECola } from './pages/tools/GeradorPixCopiaECola';",
    "import { GeradorPixCopiaECola } from './pages/tools/GeradorPixCopiaECola';\nimport { LeitorQrCode } from './pages/tools/LeitorQrCode';"
  );
}

if (!code.includes('path="leitor-decodificador-qr-code"')) {
  code = code.replace(
    '<Route path="gerador-pix-copia-e-cola" element={<GeradorPixCopiaECola />} />',
    '<Route path="gerador-pix-copia-e-cola" element={<GeradorPixCopiaECola />} />\n        <Route path="leitor-decodificador-qr-code" element={<LeitorQrCode />} />'
  );
}

fs.writeFileSync(file, code);
