const fs = require('fs');
let code = fs.readFileSync('package.json', 'utf-8');
code = code.replace(
  /"build": "node scripts\/generate-sitemap.js && vite build && node scripts\/prerender.js"/,
  '"build": "node scripts/generate-sitemap.js && node scripts/generate-rss.js && vite build && node scripts/prerender.js"'
);
fs.writeFileSync('package.json', code);
