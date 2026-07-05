const fs = require('fs');

function fixFile(file, wrongSource, originalImport, appendedImports) {
  let code = fs.readFileSync(file, 'utf8');
  // 1. Remove the appended imports from the wrong source
  code = code.replace(
    new RegExp(`import \\{([^}]*?), ${appendedImports} \\} from '${wrongSource}';`), 
    `import { $1 } from '${wrongSource}';`
  );
  
  // 2. Add the appended imports to lucide-react
  code = code.replace(
    /import \{([^}]*?)\} from 'lucide-react';/,
    `import {$1, ${appendedImports} } from 'lucide-react';`
  );
  
  fs.writeFileSync(file, code);
}

fixFile('src/pages/tools/ConsultadorIbge.tsx', 'react', 'useState, useEffect', 'ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, FileText, MapPin');
fixFile('src/pages/tools/ConversorHoras.tsx', 'react', 'useState', 'ChevronDown, ChevronUp, CheckCircle2, Clock, Calculator, FileText');
fixFile('src/pages/tools/DescontosMultas.tsx', 'react', 'useState', 'ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, Clock, Calculator');
fixFile('src/pages/tools/DiasUteis.tsx', 'react', 'useState', 'ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, Clock, FileText');
fixFile('src/pages/tools/GeradorPixCopiaECola.tsx', 'react-router-dom', 'Link', 'ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, QrCode');
fixFile('src/pages/tools/MaquininhaCartao.tsx', 'react', 'useState', 'ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, CreditCard, Calculator');
fixFile('src/pages/tools/RetencaoImpostos.tsx', 'react', 'useState', 'ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, FileText');
fixFile('src/pages/tools/ValidadorCpfCnpj.tsx', '../../components/SEO', 'SEO', 'ChevronDown, ChevronUp');
fixFile('src/pages/tools/ValorPorExtenso.tsx', '../../components/SEO', 'SEO', 'ChevronDown, ChevronUp, FileText');

