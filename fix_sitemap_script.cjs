const fs = require('fs');
let code = fs.readFileSync('scripts/generate-sitemap.js', 'utf-8');

const injectCode = `
// Read declaration models
const declModelsFilePath = path.join(__dirname, '../src/data/declarationModels.ts');
const declModelsContent = fs.readFileSync(declModelsFilePath, 'utf-8');
const declSlugRegex = /slug:\\s*['"]([^'"]+)['"]/g;
const declSlugs = [];
while ((match = declSlugRegex.exec(declModelsContent)) !== null) {
  declSlugs.push(match[1]);
}
`;

const insertIndex = code.indexOf("const baseUrl =");
code = code.slice(0, insertIndex) + injectCode + code.slice(insertIndex);

// Now inject the XML part
const xmlInject = `
  <url>
    <loc>\${baseUrl}/modelos</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
\${declSlugs.map(slug => \`  <url>
    <loc>\${baseUrl}/declaracoes/\${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\`).join('\\n')}
`;

code = code.replace(/<\/urlset>/, xmlInject + '\n</urlset>');

fs.writeFileSync('scripts/generate-sitemap.js', code);
