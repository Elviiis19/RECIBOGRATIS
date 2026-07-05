const fs = require('fs');

function fixFile(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Find where CheckCircle2 etc are wrongly injected
  code = code.replace(/import \{([^}]*?),\s*CheckCircle2,\s*ShieldCheck,\s*(Clock|Calculator)\s*\} from '\.\.\/\.\.\/components\/SEO';/, "import { $1 } from '../../components/SEO';");
  
  // Also check if they are in 'react'
  code = code.replace(/import \{([^}]*?),\s*CheckCircle2,\s*ShieldCheck,\s*(Clock|Calculator)\s*\} from 'react';/, "import { $1 } from 'react';");
  
  // Add them to lucide-react
  code = code.replace(
    /import \{([^}]*?)\} from 'lucide-react';/,
    `import {$1, CheckCircle2, ShieldCheck, Clock, Calculator} from 'lucide-react';`
  );
  
  // Clean duplicates again
  const match = code.match(/import \{([^}]*?)\} from 'lucide-react';/);
  if (match) {
    const importsStr = match[1];
    const imports = Array.from(new Set(importsStr.split(',').map(s => s.trim()).filter(Boolean)));
    code = code.replace(match[0], `import { ${imports.join(', ')} } from 'lucide-react';`);
  }
  
  fs.writeFileSync(file, code);
}

fixFile('src/pages/tools/CalculadoraPrecificacao.tsx');
fixFile('src/pages/tools/CalculadoraHoraExtra.tsx');
fixFile('src/pages/tools/ControleFiados.tsx');
