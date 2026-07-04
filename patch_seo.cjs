const fs = require('fs');
let code = fs.readFileSync('src/data/declarationSeoContent.ts', 'utf-8');

// Combine the two objects
code = code.replace(/};\s*export const extraSeoData: Record<string, any> = \{/g, ',');
fs.writeFileSync('src/data/declarationSeoContent.ts', code);
