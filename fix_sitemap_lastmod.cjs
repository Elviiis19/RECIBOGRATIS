const fs = require('fs');
let code = fs.readFileSync('scripts/generate-sitemap.js', 'utf-8');

// We will add a <lastmod> tag to every URL entry.
const today = new Date().toISOString().split('T')[0];

code = code.replace(/<changefreq>/g, `<lastmod>${today}</lastmod>\n    <changefreq>`);

fs.writeFileSync('scripts/generate-sitemap.js', code);
