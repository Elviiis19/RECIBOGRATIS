const fs = require('fs');

const file = 'index.html';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('preconnect')) {
  code = code.replace(
    '<meta name="author" content="Elvis Dias" />',
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <meta name="author" content="Elvis Dias" />'
  );
  fs.writeFileSync(file, code);
}

