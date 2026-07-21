const fs = require('fs');

// 1. Fix prerender.js
const prerenderFile = 'scripts/prerender.js';
let prerenderCode = fs.readFileSync(prerenderFile, 'utf8');

if (!prerenderCode.includes("path: '/ferramentas'")) {
  prerenderCode = prerenderCode.replace(
    "const routes = [",
    "const routes = [\n  { path: '/ferramentas', title: 'Ferramentas Online | Recibo Grátis', description: 'Diversas ferramentas úteis.' },"
  );
  fs.writeFileSync(prerenderFile, prerenderCode);
}

// 2. Fix generate-sitemap.js
const sitemapFile = 'scripts/generate-sitemap.js';
let sitemapCode = fs.readFileSync(sitemapFile, 'utf8');

if (!sitemapCode.includes('<loc>${baseUrl}/ferramentas</loc>')) {
  sitemapCode = sitemapCode.replace(
    "<url>\n    <loc>${baseUrl}/gerador-qr-code-pix</loc>",
    "<url>\n    <loc>${baseUrl}/ferramentas</loc>\n    <lastmod>2026-07-04</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n  <url>\n    <loc>${baseUrl}/gerador-qr-code-pix</loc>"
  );
  fs.writeFileSync(sitemapFile, sitemapCode);
}

