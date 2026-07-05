const fs = require('fs');

const file = 'scripts/prerender.js';
let code = fs.readFileSync(file, 'utf8');

const target = "  { path: '/leitor-decodificador-qr-code', title: 'Leitor e Decodificador de QR Code Online | Recibo Grátis', description: '...' },\n";
code = code.replace(target, ""); // removes first occurrence

fs.writeFileSync(file, code);
