const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');
if (!code.includes('application/rss+xml')) {
  code = code.replace(
    /<\/head>/,
    '  <link rel="alternate" type="application/rss+xml" title="Blog - Recibo Grátis RSS Feed" href="/rss.xml" />\n  </head>'
  );
  fs.writeFileSync('index.html', code);
}
