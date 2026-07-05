const fs = require('fs');

const files = [
  'src/pages/tools/DiasUteis.tsx',
  'src/pages/tools/ConversorHoras.tsx'
];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  if (!code.includes("import { Link } from 'react-router-dom';")) {
    code = code.replace(
      "import { SEO } from '../../components/SEO';",
      "import { SEO } from '../../components/SEO';\nimport { Link } from 'react-router-dom';"
    );
    fs.writeFileSync(file, code);
  }
}
