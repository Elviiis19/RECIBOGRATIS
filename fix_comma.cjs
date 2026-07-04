const fs = require('fs');
let code = fs.readFileSync('src/data/declarationModels.ts', 'utf-8');
code = code.replace(/icon: "FileX",\s*\}\s*\{/, 'icon: "FileX",\n  },\n  {');
fs.writeFileSync('src/data/declarationModels.ts', code);
