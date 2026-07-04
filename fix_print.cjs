const fs = require('fs');
let generator = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');
generator = generator.replace(/content: \(\) => componentRef\.current as any,/, 'contentRef: componentRef,');
fs.writeFileSync('src/components/DeclarationGenerator.tsx', generator);
