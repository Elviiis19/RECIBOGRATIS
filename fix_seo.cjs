const fs = require('fs');
let code = fs.readFileSync('src/pages/declarations/DeclarationPage.tsx', 'utf-8');
code = code.replace(/canonicalUrl=\{currentUrl\}/, 'url={currentUrl}');
fs.writeFileSync('src/pages/declarations/DeclarationPage.tsx', code);
