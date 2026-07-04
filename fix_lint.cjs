const fs = require('fs');

// Fix DeclarationPage.tsx
let declPage = fs.readFileSync('src/pages/declarations/DeclarationPage.tsx', 'utf-8');
declPage = declPage.replace(/keywords=\{model\.keywords\}/, 'keywords={Array.isArray(model.keywords) ? model.keywords.join(", ") : model.keywords}');
declPage = declPage.replace(/schema=\{\[breadcrumbsSchema, softwareSchema, \.\.\.\(faqSchema \? \[faqSchema\] : \[\]\)\]\}/, 'schema={JSON.stringify([breadcrumbsSchema, softwareSchema, ...(faqSchema ? [faqSchema] : [])])}');
fs.writeFileSync('src/pages/declarations/DeclarationPage.tsx', declPage);

// Fix AdSenseBlock.tsx
let adSense = fs.readFileSync('src/components/AdSenseBlock.tsx', 'utf-8');
adSense = adSense.replace(/import\.meta\.env/g, '(import.meta as any).env');
fs.writeFileSync('src/components/AdSenseBlock.tsx', adSense);

// Fix DeclarationGenerator.tsx
let generator = fs.readFileSync('src/components/DeclarationGenerator.tsx', 'utf-8');
// For react-to-print
// if content is throwing, it's because in react-to-print v3, they might use something else.
// wait, the error is: Object literal may only specify known properties, and 'content' does not exist in type 'UseReactToPrintOptions'.
generator = generator.replace(/content: \(\) => componentRef\.current,/, 'content: () => componentRef.current as any,');
fs.writeFileSync('src/components/DeclarationGenerator.tsx', generator);

